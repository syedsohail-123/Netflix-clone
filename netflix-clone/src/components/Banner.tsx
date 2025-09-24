import React, { useState, useEffect } from 'react';
import { fetchRandomMovie } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

interface BannerProps {
  fetchUrl: string;
}

const Banner: React.FC<BannerProps> = ({ fetchUrl }) => {
  const [movie, setMovie] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await fetchRandomMovie();
        
        if (data.Search && data.Search.length > 0) {
          // Get a random movie from the search results
          const randomIndex = Math.floor(Math.random() * data.Search.length);
          setMovie(data.Search[randomIndex]);
        }
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      }
    };

    fetchMovie();
  }, [fetchUrl]);

  const truncate = (str: string | undefined, n: number) => {
    if (!str) return '';
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!movie) return null;

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className="relative h-[448px] md:h-[720px] lg:h-[80vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black to-transparent z-10" />
      {movie.Poster && movie.Poster !== 'N/A' && (
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20 px-4 md:px-16 max-w-2xl">
        <h1 className={`${textColorClass} text-3xl md:text-5xl lg:text-6xl font-bold mb-4`}>
          {movie.Title}
        </h1>
        <div className="flex space-x-4 mb-4">
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-opacity-80 transition">
            ▶ Play
          </button>
          <button className={`${theme === 'dark' ? 'bg-gray-600 bg-opacity-70 text-white' : 'bg-gray-300 text-black'} px-4 py-2 rounded hover:bg-opacity-50 transition`}>
            More Info
          </button>
        </div>
        <p className={`${textColorClass} text-sm md:text-base max-w-lg`}>
          {truncate(movie.Plot, 150)}
        </p>
      </div>
    </div>
  );
};

export default Banner;