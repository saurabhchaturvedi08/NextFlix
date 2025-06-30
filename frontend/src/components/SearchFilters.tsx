import React from 'react';
import { Filter, X } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../types/Movie';
import { mockGenres, moodTags } from '../data/mockData';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: Partial<SearchFiltersType>) => void;
  isVisible: boolean;
  onToggle: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  isVisible,
  onToggle
}) => {
  const handleGenreToggle = (genreId: number) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    onFiltersChange({ genres: newGenres });
  };

  const handleMoodToggle = (mood: string) => {
    const newMoods = filters.mood.includes(mood)
      ? filters.mood.filter(m => m !== mood)
      : [...filters.mood, mood];
    onFiltersChange({ mood: newMoods });
  };

  const clearFilters = () => {
    onFiltersChange({
      genres: [],
      mood: [],
      yearRange: [1900, 2024],
      rating: [0, 10]
    });
  };

  const hasActiveFilters = filters.genres.length > 0 || filters.mood.length > 0;

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          hasActiveFilters
            ? 'bg-purple-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-purple-800 text-xs px-2 py-1 rounded-full">
            {filters.genres.length + filters.mood.length}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isVisible && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onToggle}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {mockGenres.slice(0, 12).map(genre => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    filters.genres.includes(genre.id)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Tags */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Mood</h4>
            <div className="flex flex-wrap gap-2">
              {moodTags.map(mood => (
                <button
                  key={mood}
                  onClick={() => handleMoodToggle(mood)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    filters.mood.includes(mood)
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Range */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={filters.rating[0]}
                onChange={(e) => onFiltersChange({ 
                  rating: [parseFloat(e.target.value), filters.rating[1]] 
                })}
                className="flex-1 accent-purple-600"
              />
              <span className="text-white font-medium w-8">
                {filters.rating[0]}+
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;