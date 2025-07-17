// moviesApi.ts
const BASE_URL = 'http://127.0.0.1:5000/api/movies'; // Replace with actual backend URL if needed

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending`);
  console.log('res',res);
  if (!res.ok) throw new Error('Failed to fetch trending movies');
  return res.json();
}

export async function getLatestMovies() {
  const res = await fetch(`${BASE_URL}/latest`);
  if (!res.ok) throw new Error('Failed to fetch latest movies');
  return res.json();
}

export async function getUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/upcoming`);
  if (!res.ok) throw new Error('Failed to fetch upcoming movies');
  return res.json();
} 