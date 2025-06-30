import React from 'react';
import { Heart, Trash2, Play, ExternalLink, Film } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';
import { useToast } from '../hooks/useToast';
import { Movie } from '../types/Movie';
import { mockGenres } from '../data/mockData';
import LoadingSpinner from './LoadingSpinner';

interface WatchlistPageProps {
  onMovieSelect?: (movie: Movie) => void;
}

const WatchlistPage: React.FC<WatchlistPageProps> = ({ onMovieSelect }) => {
  const { watchlist, isLoading, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const { addToast } = useToast();

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map(id => mockGenres.find(genre => genre.id === id)?.name)
      .filter(Boolean)
      .slice(0, 3);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const handleRemoveFromWatchlist = (movie: Movie) => {
    removeFromWatchlist(movie.id);
    addToast({
      type: 'success',
      message: `Removed "${movie.title}" from your watchlist`
    });
  };

  const handleClearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      clearWatchlist();
      addToast({
        type: 'info',
        message: 'Watchlist cleared successfully'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <LoadingSpinner message="Loading your watchlist..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold">My Watchlist</h1>
          </div>
          <p className="text-gray-400 text-lg">
            {watchlist.length > 0 
              ? `${watchlist.length} movie${watchlist.length === 1 ? '' : 's'} saved for later`
              : 'No movies in your watchlist yet'
            }
          </p>
        </div>

        {watchlist.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <Film className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">
              Your watchlist is empty
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start adding movies to your watchlist by clicking the heart icon on any movie card.
            </p>
          </div>
        ) : (
          <>
            {/* Clear All Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={handleClearWatchlist}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Watchlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlist.map((movie, index) => (
                <div
                  key={movie.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Movie Poster and Info */}
                  <div className="flex">
                    <div className="w-32 h-48 flex-shrink-0">
                      <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 p-4 flex flex-col">
                      {/* Title and Year */}
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
                          {movie.title}
                        </h3>
                        <p className="text-gray-400 text-sm">{formatDate(movie.release_date)}</p>
                      </div>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {getGenreNames(movie.genre_ids).map((genre, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <span className="text-sm font-medium">★ {movie.vote_average.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Overview */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {movie.overview}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onMovieSelect?.(movie)}
                          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => handleRemoveFromWatchlist(movie)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                          aria-label="Remove from watchlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;