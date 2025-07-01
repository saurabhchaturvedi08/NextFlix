import requests
import os

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

def get_similar_movies(title):
    search_url = f"{BASE_URL}/search/movie"
    search_params = {"api_key": TMDB_API_KEY, "query": title}
    res = requests.get(search_url, params=search_params)
    res.raise_for_status()

    results = res.json().get("results", [])
    if not results:
        raise Exception("Movie not found")

    movie_id = results[0]["id"]
    sim_url = f"{BASE_URL}/movie/{movie_id}/similar"
    sim_res = requests.get(sim_url, params={"api_key": TMDB_API_KEY})
    sim_res.raise_for_status()
    return sim_res.json().get("results", [])

def get_movie_details(movie_id):
    movie_url = f"{BASE_URL}/movie/{movie_id}"
    credits_url = f"{BASE_URL}/movie/{movie_id}/credits"
    video_url = f"{BASE_URL}/movie/{movie_id}/videos"

    movie_res = requests.get(movie_url, params={"api_key": TMDB_API_KEY})
    credits_res = requests.get(credits_url, params={"api_key": TMDB_API_KEY})
    video_res = requests.get(video_url, params={"api_key": TMDB_API_KEY})

    movie_res.raise_for_status()
    credits_res.raise_for_status()
    video_res.raise_for_status()

    movie_data = movie_res.json()
    credits = credits_res.json()
    videos = video_res.json()

    cast = credits.get("cast", [])[:5]
    director = next((c for c in credits.get("crew", []) if c.get("job") == "Director"), None)
    trailer = next((v for v in videos.get("results", []) if v.get("type") == "Trailer"), None)

    return {
        **movie_data,
        "cast": cast,
        "director": director,
        "trailer": trailer
    }
