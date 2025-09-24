import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMovieDetailsData = async () => {
      try {
        const data = await fetchMovieDetails(id!);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      }
    };

    fetchMovieDetailsData();
  }, [id]);

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const textColorGrayClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textColorLightGrayClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className={textColorClass}>Loading...</div>
      </div>
    );
  }

  if (!movie || movie.Response === 'False') {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className={textColorClass}>
          <p>Movie not found</p>
          <Link to="/" className="text-netflix-red hover:underline mt-4 block">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Function to generate a search link for trailers on YouTube
  const getTrailerLink = () => {
    const searchQuery = `${movie.Title} trailer`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="relative h-96 md:h-[500px]">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className={textColorLightGrayClass}>No poster available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className={`${textColorClass} text-3xl md:text-5xl font-bold`}>{movie.Title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            {movie.imdbRating && (
              <span className="text-green-500 font-semibold">
                {movie.imdbRating}/10 IMDB
              </span>
            )}
            <span className={textColorClass}>{movie.Year}</span>
            {movie.Rated && <span className={textColorClass}>{movie.Rated}</span>}
            {movie.Runtime && <span className={textColorClass}>{movie.Runtime}</span>}
          </div>
          <div className="flex space-x-4 mt-4">
            <button className="bg-white text-black px-6 py-2 rounded flex items-center space-x-2 hover:bg-opacity-80 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Play</span>
            </button>
            <a 
              href={getTrailerLink()} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${theme === 'dark' ? 'bg-gray-600 bg-opacity-70 text-white' : 'bg-gray-300 text-black'} px-6 py-2 rounded flex items-center space-x-2 hover:bg-opacity-50 transition`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <span>Trailer</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className={`${textColorClass} text-2xl font-bold mb-4`}>Overview</h2>
            <p className={textColorGrayClass}>{movie.Plot}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {movie.Released && (
                <div>
                  <h4 className={textColorLightGrayClass}>Release Date</h4>
                  <p className={textColorClass}>{movie.Released}</p>
                </div>
              )}
              {movie.Runtime && (
                <div>
                  <h4 className={textColorLightGrayClass}>Runtime</h4>
                  <p className={textColorClass}>{movie.Runtime}</p>
                </div>
              )}
              {movie.Genre && (
                <div>
                  <h4 className={textColorLightGrayClass}>Genre</h4>
                  <p className={textColorClass}>{movie.Genre}</p>
                </div>
              )}
              {movie.Director && (
                <div>
                  <h4 className={textColorLightGrayClass}>Director</h4>
                  <p className={textColorClass}>{movie.Director}</p>
                </div>
              )}
              {movie.Writer && (
                <div>
                  <h4 className={textColorLightGrayClass}>Writer</h4>
                  <p className={textColorClass}>{movie.Writer}</p>
                </div>
              )}
              {movie.Language && (
                <div>
                  <h4 className={textColorLightGrayClass}>Language</h4>
                  <p className={textColorClass}>{movie.Language}</p>
                </div>
              )}
              {movie.Country && (
                <div>
                  <h4 className={textColorLightGrayClass}>Country</h4>
                  <p className={textColorClass}>{movie.Country}</p>
                </div>
              )}
              {movie.imdbRating && (
                <div>
                  <h4 className={textColorLightGrayClass}>IMDB Rating</h4>
                  <p className={textColorClass}>{movie.imdbRating}/10</p>
                </div>
              )}
            </div>
          </div>

          <div>
            {movie.Actors && (
              <>
                <h2 className={`${textColorClass} text-2xl font-bold mb-4`}>Cast</h2>
                <div className="space-y-4">
                  {movie.Actors.split(', ').map((actor: string, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} w-12 h-12 rounded-full flex items-center justify-center`}>
                        <span className={textColorClass}>
                          {actor.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className={textColorClass}>{actor}</p>
                        <p className={textColorLightGrayClass}>Actor</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {movie.Genre && (
              <>
                <h2 className={`${textColorClass} text-2xl font-bold mt-8 mb-4`}>Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre: string, index: number) => (
                    <span key={index} className={`${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'} px-3 py-1 rounded-full text-sm`}>
                      {genre}
                    </span>
                  ))}
                </div>
              </>
            )}

            {movie.BoxOffice && (
              <>
                <h2 className={`${textColorClass} text-2xl font-bold mt-8 mb-4`}>Box Office</h2>
                <p className={textColorGrayClass}>{movie.BoxOffice}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;