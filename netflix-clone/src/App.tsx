import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Row from './components/Row';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';
// Fixed import path for SearchResults component
import { SearchProvider } from './contexts/SearchContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner fetchUrl="/trending/all/week" />
              <main className="pb-24">
                <Row title="Trending Now" searchQuery="trending" />
                <Row title="Top Rated" searchQuery="top rated" />
                <Row title="Action Movies" searchQuery="action" />
                <Row title="Comedy Movies" searchQuery="comedy" />
                <Row title="Drama Movies" searchQuery="drama" />
                <Row title="Horror Movies" searchQuery="horror" />
                <Row title="Sci-Fi Movies" searchQuery="sci-fi" />
                <Row title="Romance Movies" searchQuery="romance" />
                <Row title="Thriller Movies" searchQuery="thriller" />
              </main>
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-netflix-black">
        <ThemeProvider>
          <SearchProvider>
            <AppContent />
          </SearchProvider>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;