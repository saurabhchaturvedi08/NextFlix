import React from 'react';
import { X, Calendar, Star, Clock, Globe, Play, Heart, ExternalLink } from 'lucide-react';
import { Movie } from '../types/Movie';
import { mockGenres } from '../data/mockData';
import { useWatchlist } from '../hooks/useWatchlist';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map(id => mockGenres.find(genre => genre.id === id)?.name)
      .filter(Boolean);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  // Mock data for detailed view
  const mockCast = [
    'Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Ellen Page'
  ];
  const mockDirector = 'Christopher Nolan';
  const mockRuntime = 148;

  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w780';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header with backdrop */}
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-xl">
          <img
            src={movie.backdrop_path ? (movie.backdrop_path.startsWith('http') ? movie.backdrop_path : TMDB_IMAGE_BASE + movie.backdrop_path) : (movie.poster_path ? (movie.poster_path.startsWith('http') ? movie.poster_path : TMDB_IMAGE_BASE + movie.poster_path) : 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500')}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = movie.poster_path ? (movie.poster_path.startsWith('http') ? movie.poster_path : TMDB_IMAGE_BASE + movie.poster_path) : 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Movie info overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{mockRuntime} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
              <Play className="h-5 w-5 fill-current" />
              <span>Watch Trailer</span>
            </button>
            <button
              onClick={handleWatchlistToggle}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                inWatchlist
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <Heart className={`h-5 w-5 ${inWatchlist ? 'fill-current' : ''}`} />
              <span>{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200">
              <ExternalLink className="h-5 w-5" />
              <span>TMDb</span>
            </button>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {getGenreNames(movie.genre_ids).map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {/* Cast and Crew */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Cast</h3>
              <div className="space-y-2">
                {mockCast.map((actor, index) => (
                  <div key={index} className="text-gray-300">
                    {actor}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Crew</h3>
              <div className="space-y-2">
                <div className="text-gray-300">
                  <span className="font-medium">Director:</span> {mockDirector}
                </div>
                <div className="text-gray-300">
                  <span className="font-medium">Language:</span> {movie.original_language.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{movie.vote_average.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{movie.popularity.toFixed(0)}</div>
              <div className="text-gray-400 text-sm">Popularity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{mockRuntime}</div>
              <div className="text-gray-400 text-sm">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{new Date(movie.release_date).getFullYear()}</div>
              <div className="text-gray-400 text-sm">Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;