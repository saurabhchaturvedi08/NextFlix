import React from 'react';
import { RefreshCw, Film } from 'lucide-react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

interface RecommendationsProps {
  movies: Movie[];
  isLoading: boolean;
  query: string;
  hasSearched: boolean;
  onNewSearch: () => void;
  onMovieSelect?: (movie: Movie) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  movies,
  isLoading,
  query,
  hasSearched,
  onNewSearch,
  onMovieSelect
}) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <LoadingSpinner message="Finding great movies for you..." />
        </div>
      </section>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (movies.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              No similar movies found
            </h3>
            <p className="text-gray-400">
              Try searching for another movie. Popular titles work best!
            </p>
          </div>
          <button
            onClick={onNewSearch}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Try Another Search</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Movies like{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              "{query}"
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Based on your taste, here are {movies.length} movies we think you'll love
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-12">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-fadeInUp"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <MovieCard
                movie={movie}
                onMoreInfo={onMovieSelect}
                showSimilarityScore={true}
              />
            </div>
          ))}
        </div>

        {/* New Search Button */}
        <div className="text-center">
          <button
            onClick={onNewSearch}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 border border-gray-600 hover:border-purple-500"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Search for Another Movie</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;