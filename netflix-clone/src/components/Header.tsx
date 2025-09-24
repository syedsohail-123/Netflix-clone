import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setShowSearch(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchInput('');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  // Dynamic class names based on theme
  const headerBgClass = isScrolled 
    ? 'bg-netflix-black'
    : (theme === 'dark' 
        ? 'bg-gradient-to-b from-black to-transparent' 
        : 'bg-gradient-to-b from-white to-transparent');

  const textColorClass = theme === 'dark' ? 'text-white' : 'text-black';
  const hoverTextColorClass = theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600';
  const inputBgClass = theme === 'dark' ? 'bg-black bg-opacity-70 text-white' : 'bg-white text-black';
  const inputBorderClass = theme === 'dark' ? 'focus:ring-white' : 'focus:ring-black';
  const inputBorderStyle = theme === 'dark' ? '' : 'border border-gray-300';

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="flex items-center justify-between px-4 py-4 md:px-16">
        <div className="flex items-center space-x-8">
          <button 
            onClick={handleLogoClick}
            className={`${textColorClass} text-4xl font-bold ${hoverTextColorClass} transition`}
          >
            NETFLIX
          </button>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`${textColorClass} ${hoverTextColorClass} transition`}>
              Home
            </Link>
            <Link to="/tv" className={`${textColorClass} ${hoverTextColorClass} transition`}>
              TV Shows
            </Link>
            <Link to="/movies" className={`${textColorClass} ${hoverTextColorClass} transition`}>
              Movies
            </Link>
            <Link to="/new" className={`${textColorClass} ${hoverTextColorClass} transition`}>
              New & Popular
            </Link>
            <Link to="/mylist" className={`${textColorClass} ${hoverTextColorClass} transition`}>
              My List
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Search movies..."
                className={`${inputBgClass} ${inputBorderStyle} px-4 py-2 rounded-l focus:outline-none focus:ring-2 ${inputBorderClass}`}
                autoFocus
              />
              <button 
                type="submit"
                className="bg-netflix-red text-white px-4 py-2 rounded-r hover:bg-opacity-80 transition"
              >
                Search
              </button>
            </form>
          ) : (
            <button 
              onClick={toggleSearch}
              className={`${textColorClass} ${hoverTextColorClass} transition`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
          <button 
            onClick={toggleTheme}
            className={`${textColorClass} ${hoverTextColorClass} transition`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button className={`${textColorClass} ${hoverTextColorClass} transition`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className={`w-8 h-8 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
            <span className="text-sm font-semibold">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;