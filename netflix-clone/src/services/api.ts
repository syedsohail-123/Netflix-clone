// Get API key from environment variable, with fallback
const API_KEY = import.meta.env.VITE_APP_OMDB_API_KEY || '2e6caf68';
console.log('API Key loaded:', API_KEY); // Debug log to see what API key is loaded

// Fixed: Removed extra space at the end of the URL
export const OMDB_API_BASE = 'https://www.omdbapi.com'; // No space here
export const API_KEY_VALUE = API_KEY;

// Function to check if API key is valid
export const validateApiKey = () => {
  console.log('Validating API key:', API_KEY); // Debug log
  if (!API_KEY || API_KEY === 'undefined') {
    console.error('API key is not properly configured. Please add a valid OMDB API key to your .env file.');
    return false;
  }
  return true;
};

export const fetchMovies = async (searchQuery: string) => {
  // Use fallback key if validation fails, but allow it to work
  const apiKey = validateApiKey() ? API_KEY_VALUE : '2e6caf68';
  
  try {
    const response = await fetch(
      `${OMDB_API_BASE}/?s=${searchQuery}&page=1&apikey=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: string) => {
  // Use fallback key if validation fails, but allow it to work
  const apiKey = validateApiKey() ? API_KEY_VALUE : '2e6caf68';
  
  try {
    const response = await fetch(
      `${OMDB_API_BASE}/?i=${id}&apikey=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchRandomMovie = async () => {
  // Use fallback key if validation fails, but allow it to work
  const apiKey = validateApiKey() ? API_KEY_VALUE : '2e6caf68';
  
  try {
    const response = await fetch(
      `${OMDB_API_BASE}/?s=movie&page=1&apikey=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random movie:', error);
    throw error;
  }
};