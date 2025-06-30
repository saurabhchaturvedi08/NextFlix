import { Movie, Genre, User } from '../types/Movie';

export const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export const moodTags = [
  'Dark', 'Uplifting', 'Slow Burn', 'Fast-Paced', 'Mind-Bending',
  'Heartwarming', 'Intense', 'Quirky', 'Epic', 'Intimate'
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  preferences: {
    favoriteGenres: [28, 878, 53],
    watchlist: [1, 3, 5],
    searchHistory: ['inception', 'interstellar', 'the matrix'],
    darkMode: true
  }
};

export const trendingMovies: Movie[] = [
  {
    id: 101,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    poster_path: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=500",
    backdrop_path: "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1200",
    release_date: "2024-02-29",
    genre_ids: [878, 12, 18],
    vote_average: 8.4,
    vote_count: 5420,
    popularity: 2847.3,
    adult: false,
    original_language: "en",
    original_title: "Dune: Part Two",
    video: false,
    similarity_score: 95
  },
  {
    id: 102,
    title: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster_path: "https://images.pexels.com/photos/73873/nuclear-weapons-test-nuclear-weapon-weapons-test-73873.jpeg?auto=compress&cs=tinysrgb&w=500",
    backdrop_path: "https://images.pexels.com/photos/73873/nuclear-weapons-test-nuclear-weapon-weapons-test-73873.jpeg?auto=compress&cs=tinysrgb&w=1200",
    release_date: "2023-07-21",
    genre_ids: [18, 36],
    vote_average: 8.3,
    vote_count: 7890,
    popularity: 2156.8,
    adult: false,
    original_language: "en",
    original_title: "Oppenheimer",
    video: false,
    similarity_score: 92
  },
  {
    id: 103,
    title: "Spider-Man: Across the Spider-Verse",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.",
    poster_path: "https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=500",
    backdrop_path: "https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=1200",
    release_date: "2023-06-02",
    genre_ids: [16, 28, 12],
    vote_average: 8.7,
    vote_count: 6234,
    popularity: 1987.4,
    adult: false,
    original_language: "en",
    original_title: "Spider-Man: Across the Spider-Verse",
    video: false,
    similarity_score: 89
  }
];

export const mockMovieRecommendations: Record<string, Movie[]> = {
  inception: [
    {
      id: 1,
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      poster_path: "https://images.pexels.com/photos/33129/space-universe-astronaut-spaceman.jpg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/33129/space-universe-astronaut-spaceman.jpg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "2014-11-07",
      genre_ids: [878, 18, 12],
      vote_average: 8.6,
      vote_count: 28450,
      popularity: 1847.3,
      adult: false,
      original_language: "en",
      original_title: "Interstellar",
      video: false,
      similarity_score: 94
    },
    {
      id: 2,
      title: "The Matrix",
      overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines.",
      poster_path: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "1999-03-31",
      genre_ids: [28, 878],
      vote_average: 8.7,
      vote_count: 23456,
      popularity: 1654.8,
      adult: false,
      original_language: "en",
      original_title: "The Matrix",
      video: false,
      similarity_score: 91
    },
    {
      id: 3,
      title: "Shutter Island",
      overview: "A U.S. Marshal investigates the disappearance of a patient from a hospital for the criminally insane.",
      poster_path: "https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "2010-02-19",
      genre_ids: [9648, 53, 18],
      vote_average: 8.2,
      vote_count: 19876,
      popularity: 1234.5,
      adult: false,
      original_language: "en",
      original_title: "Shutter Island",
      video: false,
      similarity_score: 88
    },
    {
      id: 4,
      title: "Memento",
      overview: "A man with short-term memory loss attempts to track down his wife's murderer.",
      poster_path: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "2000-10-11",
      genre_ids: [9648, 53],
      vote_average: 8.4,
      vote_count: 17654,
      popularity: 987.2,
      adult: false,
      original_language: "en",
      original_title: "Memento",
      video: false,
      similarity_score: 86
    },
    {
      id: 5,
      title: "Tenet",
      overview: "A secret agent embarks on a dangerous, time-bending mission to prevent the start of World War III.",
      poster_path: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "2020-08-26",
      genre_ids: [28, 878, 53],
      vote_average: 7.4,
      vote_count: 15432,
      popularity: 1456.7,
      adult: false,
      original_language: "en",
      original_title: "Tenet",
      video: false,
      similarity_score: 83
    }
  ],
  default: [
    {
      id: 6,
      title: "The Dark Knight",
      overview: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
      poster_path: "https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "2008-07-18",
      genre_ids: [28, 80, 18],
      vote_average: 9.0,
      vote_count: 32145,
      popularity: 2345.6,
      adult: false,
      original_language: "en",
      original_title: "The Dark Knight",
      video: false,
      similarity_score: 96
    },
    {
      id: 7,
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence.",
      poster_path: "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "1994-10-14",
      genre_ids: [80, 18],
      vote_average: 8.9,
      vote_count: 28976,
      popularity: 1876.4,
      adult: false,
      original_language: "en",
      original_title: "Pulp Fiction",
      video: false,
      similarity_score: 93
    },
    {
      id: 8,
      title: "The Godfather",
      overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
      poster_path: "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=500",
      backdrop_path: "https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&w=1200",
      release_date: "1972-03-24",
      genre_ids: [80, 18],
      vote_average: 9.2,
      vote_count: 19876,
      popularity: 1654.3,
      adult: false,
      original_language: "en",
      original_title: "The Godfather",
      video: false,
      similarity_score: 91
    }
  ]
};