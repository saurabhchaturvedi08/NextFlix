// movieService.ts
import { getTrendingMovies, getLatestMovies, getUpcomingMovies } from '../api/moviesApi';

export async function fetchTrendingMovies() {
  // Add business logic here if needed
  return getTrendingMovies();
}

export async function fetchLatestMovies() {
  return getLatestMovies();
}

export async function fetchUpcomingMovies() {
  return getUpcomingMovies();
} 