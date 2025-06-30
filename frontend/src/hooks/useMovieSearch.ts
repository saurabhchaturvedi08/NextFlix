import { useState, useCallback } from 'react';
import { SearchState, Movie } from '../types/Movie';
import { mockMovieRecommendations } from '../data/mockData';

export const useMovieSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    isLoading: false,
    movies: [],
    error: null,
    hasSearched: false,
    filters: {
      genres: [],
      mood: [],
      yearRange: [1900, 2024],
      rating: [0, 10]
    }
  });

  const searchMovies = useCallback(async (movieName: string) => {
    if (!movieName.trim()) {
      setSearchState(prev => ({
        ...prev,
        error: 'Please enter a movie name'
      }));
      return;
    }

    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      query: movieName.trim()
    }));

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Mock API call - in real app, this would be:
      // const response = await fetch(`/api/recommend?movie=${encodeURIComponent(movieName)}`);
      // const data = await response.json();
      
      const normalizedQuery = movieName.toLowerCase().trim();
      const recommendations = mockMovieRecommendations[normalizedQuery] || mockMovieRecommendations.default;
      
      // Add similarity scores
      const moviesWithScores = recommendations.map((movie, index) => ({
        ...movie,
        similarity_score: Math.max(95 - index * 3, 75)
      }));
      
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        movies: moviesWithScores,
        hasSearched: true,
        error: null
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch recommendations. Please try again.',
        movies: [],
        hasSearched: true
      }));
    }
  }, []);

  const searchByNaturalLanguage = useCallback(async (description: string) => {
    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      query: `AI: "${description}"`
    }));

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    try {
      // Mock AI interpretation
      const recommendations = mockMovieRecommendations.default;
      
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        movies: recommendations,
        hasSearched: true,
        error: null
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to process your request. Please try again.',
        movies: [],
        hasSearched: true
      }));
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState({
      query: '',
      isLoading: false,
      movies: [],
      error: null,
      hasSearched: false,
      filters: {
        genres: [],
        mood: [],
        yearRange: [1900, 2024],
        rating: [0, 10]
      }
    });
  }, []);

  const clearError = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      error: null
    }));
  }, []);

  const updateFilters = useCallback((filters: Partial<SearchState['filters']>) => {
    setSearchState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...filters }
    }));
  }, []);

  return {
    searchState,
    searchMovies,
    searchByNaturalLanguage,
    clearSearch,
    clearError,
    updateFilters
  };
};