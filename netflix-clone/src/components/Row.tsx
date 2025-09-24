import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

interface RowProps {
  title: string;
  searchQuery: string;
  isLargeRow?: boolean;
}

const Row: React.FC<RowProps> = ({ title, searchQuery, isLargeRow = false }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const data = await fetchMovies(searchQuery);
        
        if (data.Search) {
          setMovies(data.Search);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      }
    };

    fetchMoviesData();
  }, [searchQuery]);

  const truncate = (str: string | undefined, n: number) => {
    if (!str) return '';
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const textColorGrayClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textColorLightGrayClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className="m-4">
      <h2 className={`${textColorClass} font-semibold text-lg md:text-xl px-4 md:px-8 mb-2`}>
        {title}
      </h2>
      <div className="relative">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-8">
          {isLoading ? (
            <div className="flex space-x-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg animate-pulse`}>
                  <div className="w-44 h-24 md:w-64 md:h-36" />
                </div>
              ))}
            </div>
          ) : (
            movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                className={`flex-shrink-0 relative group transition duration-200 ease-in-out transform hover:scale-110 hover:z-50 ${
                  isLargeRow ? 'w-44 md:w-64' : 'w-32 md:w-44'
                }`}
              >
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className={`rounded-lg object-cover ${
                      isLargeRow ? 'h-24 md:h-36' : 'h-20 md:h-28'
                    }`}
                  />
                ) : (
                  <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg flex items-center justify-center w-full h-full`}>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>No Image</span>
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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className={`${textColorClass} text-xs md:text-sm font-semibold truncate`}>
                    {movie.Title}
                  </h3>
                  <p className={`${textColorGrayClass} text-xs hidden md:block`}>
                    {truncate(movie.Plot, 100)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Row;