import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import { fetchUpcomingMovies } from '../services/movieService';

interface UpcomingSectionProps {
  onMovieSelect?: (movie: Movie) => void;
}

const UpcomingSection: React.FC<UpcomingSectionProps> = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpcoming = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUpcomingMovies();
      setMovies(data.results || []);
    } catch (error) {
      setMovies([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return (
    <section className="min-h-[60vh] bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Upcoming Movies</h2>
        {isLoading ? (
          <LoadingSpinner message="Loading upcoming movies..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  showSimilarityScore={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingSection; 