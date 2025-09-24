import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;
      
      try {
        setIsLoading(true);
        const data = await fetchMovies(searchQuery);
        
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || 'No movies found');
        }
      } catch (err) {
        setError('Error fetching search results: ' + (err instanceof Error ? err.message : 'Unknown error'));
        console.error('Error fetching search results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const textColorGrayClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textColorLightGrayClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black pt-24 flex items-center justify-center">
        <div className={textColorClass}>Searching...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className={`${textColorClass} text-3xl font-bold mb-8`}>Search Results for "{searchQuery}"</h1>
        
        {error ? (
          <div className={`${textColorClass} text-center py-12`}>
            <p className="text-xl mb-4">{error}</p>
            <Link to="/" className="text-netflix-red hover:underline">
              Go back to home
            </Link>
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                className="group"
              >
                <div className="relative">
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full aspect-[2/3] object-cover rounded-lg"
                    />
                  ) : (
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} w-full aspect-[2/3] rounded-lg flex items-center justify-center`}>
                      <span className={textColorLightGrayClass}>No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition duration-300 rounded-lg flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2">
                    <h3 className={`${textColorClass} text-sm font-semibold truncate`}>{movie.Title}</h3>
                    <p className={textColorLightGrayClass}>{movie.Year}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`${textColorClass} text-center py-12`}>
            <p className="text-xl">No movies found for "{searchQuery}"</p>
            <p className={textColorGrayClass}>Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;