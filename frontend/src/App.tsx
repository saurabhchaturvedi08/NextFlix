import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Recommendations from './components/Recommendations';
import WatchlistPage from './components/WatchlistPage';
import TrendingSection from './components/TrendingSection';
import ContactPage from './components/ContactPage';
import MovieModal from './components/MovieModal';
import { ToastContainer } from './components/Toast';
import { useMovieSearch } from './hooks/useMovieSearch';
import { useToast } from './hooks/useToast';
import { Movie } from './types/Movie';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const { searchState, searchMovies, searchByNaturalLanguage, clearSearch, clearError } = useMovieSearch();
  const { toasts, removeToast } = useToast();

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nextflix_darkmode');
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const handleToggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('nextflix_darkmode', JSON.stringify(newDarkMode));
  };

  const handleNewSearch = () => {
    clearSearch();
    setCurrentPage('home');
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'watchlist':
        return <WatchlistPage onMovieSelect={handleMovieSelect} />;
      case 'trending':
        return <TrendingSection onMovieSelect={handleMovieSelect} />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            {/* Hero Section - Always visible on home */}
            <Hero
              onSearch={searchMovies}
              onNaturalLanguageSearch={searchByNaturalLanguage}
              isLoading={searchState.isLoading}
              error={searchState.error}
              onClearError={clearError}
            />

            {/* Recommendations Section - Conditional */}
            <Recommendations
              movies={searchState.movies}
              isLoading={searchState.isLoading}
              query={searchState.query}
              hasSearched={searchState.hasSearched}
              onNewSearch={handleNewSearch}
              onMovieSelect={handleMovieSelect}
            />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Main Content */}
        <main>
          {renderCurrentPage()}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">NextFlix</h3>
                <p className="text-gray-400">
                  AI-powered movie recommendations to help you discover your next favorite film.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setCurrentPage('trending')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Top Picks
                  </button>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
                <p className="text-gray-400 mb-4">
                  Follow us for updates and movie recommendations
                </p>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    Built with ❤️ using React & Tailwind CSS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Movie Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </div>
  );
}

export default App;