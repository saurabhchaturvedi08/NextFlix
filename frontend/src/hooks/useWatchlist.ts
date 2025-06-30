import { useState, useCallback, useEffect } from 'react';
import { Movie } from '../types/Movie';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('nextflix_watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    setIsLoading(false);
  }, []);

  const addToWatchlist = useCallback((movie: Movie) => {
    setWatchlist(prev => {
      const isAlreadyInWatchlist = prev.some(item => item.id === movie.id);
      if (isAlreadyInWatchlist) return prev;
      
      const newWatchlist = [...prev, movie];
      localStorage.setItem('nextflix_watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist(prev => {
      const newWatchlist = prev.filter(movie => movie.id !== movieId);
      localStorage.setItem('nextflix_watchlist', JSON.stringify(newWatchlist));
      return newWatchlist;
    });
  }, []);

  const isInWatchlist = useCallback((movieId: number) => {
    return watchlist.some(movie => movie.id === movieId);
  }, [watchlist]);

  const clearWatchlist = useCallback(() => {
    setWatchlist([]);
    localStorage.removeItem('nextflix_watchlist');
  }, []);

  return {
    watchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist
  };
};