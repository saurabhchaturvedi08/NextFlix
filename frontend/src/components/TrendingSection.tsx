import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import { fetchTrendingMovies } from '../services/movieService';

interface TrendingSectionProps {
  onMovieSelect?: (movie: Movie) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrending = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTrendingMovies();
      console.log('data',data);
      setMovies(data.results || []);
    } catch (error) {
      setMovies([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const handleRefresh = () => {
    fetchTrending();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Top Picks</h1>
              <p className="text-gray-400 text-lg mt-2">
                Trending movies everyone's talking about
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner message="Loading trending movies..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <MovieCard
                  movie={movie}
                  onMoreInfo={onMovieSelect}
                  showSimilarityScore={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSection;