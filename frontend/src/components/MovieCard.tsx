import React from 'react';
import { Calendar, Star, ExternalLink, Heart, Play } from 'lucide-react';
import { Movie } from '../types/Movie';
import { mockGenres } from '../data/mockData';
import { useWatchlist } from '../hooks/useWatchlist';

interface MovieCardProps {
  movie: Movie;
  onMoreInfo?: (movie: Movie) => void;
  showSimilarityScore?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMoreInfo, showSimilarityScore = false }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map(id => mockGenres.find(genre => genre.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Movie Poster */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-700">
        <img
          src={movie.poster_path ? (movie.poster_path.startsWith('http') ? movie.poster_path : TMDB_IMAGE_BASE + movie.poster_path) : 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        
        {/* Similarity Score Badge */}
        {showSimilarityScore && movie.similarity_score && (
          <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
            {movie.similarity_score}% match
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-yellow-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleWatchlistToggle}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    inWatchlist 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                  aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  <Heart className={`h-4 w-4 ${inWatchlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Future: Play trailer
                  }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                  aria-label="Play trailer"
                >
                  <Play className="h-4 w-4 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-3">
        {/* Title and Year */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-200 line-clamp-2 flex-1">
            {movie.title}
          </h3>
          <div className="flex items-center space-x-1 text-gray-400 text-sm ml-2 flex-shrink-0">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>

        {/* Genres */}
        {movie.genre_ids.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {getGenreNames(movie.genre_ids).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Overview */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {truncateText(movie.overview)}
        </p>

        {/* More Info Button */}
        <button
          onClick={() => onMoreInfo?.(movie)}
          className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          <span>More Info</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;