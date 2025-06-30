import React, { useState } from 'react';
import { Search, Target, AlertCircle, Sparkles } from 'lucide-react';
import SearchFilters from './SearchFilters';
import { useMovieSearch } from '../hooks/useMovieSearch';

interface HeroProps {
  onSearch: (query: string) => void;
  onNaturalLanguageSearch: (description: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  onSearch, 
  onNaturalLanguageSearch, 
  isLoading, 
  error, 
  onClearError 
}) => {
  const [query, setQuery] = useState('');
  const [isNaturalLanguage, setIsNaturalLanguage] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { searchState, updateFilters } = useMovieSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (isNaturalLanguage) {
        onNaturalLanguageSearch(query.trim());
      } else {
        onSearch(query.trim());
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (error) {
      onClearError();
    }
  };

  const exampleQueries = [
    "Inception",
    "Movies like The Matrix",
    "I want something dark and mind-bending",
    "Sci-fi with time travel"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your Next
          <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Favorite Movie
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Let AI help you discover movies you'll love
        </p>

        {/* Search Mode Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setIsNaturalLanguage(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                !isNaturalLanguage
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Movie Title
            </button>
            <button
              onClick={() => setIsNaturalLanguage(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isNaturalLanguage
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Sparkles className="h-4 w-4 inline mr-1" />
              AI Description
            </button>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <div className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder={
                    isNaturalLanguage
                      ? "e.g., I want something dark and mind-bending like Inception..."
                      : "e.g., Inception, The Dark Knight, Interstellar..."
                  }
                  className="w-full pl-12 pr-4 py-4 text-lg bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-r-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Target className="h-5 w-5" />
                <span className="hidden sm:inline">Get Recommendations</span>
                <span className="sm:hidden">Search</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <SearchFilters
            filters={searchState.filters}
            onFiltersChange={updateFilters}
            isVisible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          />
        </div>

        {/* Example Queries */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">Try these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(example);
                  setIsNaturalLanguage(example.includes('want') || example.includes('like'));
                }}
                className="px-3 py-1 text-sm bg-gray-800/50 text-gray-300 rounded-full border border-gray-600 hover:border-purple-500 hover:text-white transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;