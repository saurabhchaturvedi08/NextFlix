from flask import Flask, request, jsonify
from services.ai_recommender import interpret_query
from services.tmdb import get_latest_movies, get_trending_movies, get_upcoming_movies
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/recommend/query', methods=['POST'])
def recommend_from_query():
    data = request.get_json()
    user_query = data.get("query")
    if not user_query:
        return jsonify({"error": "Missing query"}), 400

    try:
        suggestion = interpret_query(user_query)
        return jsonify({"suggested": suggestion})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/latest', methods=['GET'])
def latest_movies():
    try:
        movies = get_latest_movies()
        return jsonify({"results": movies})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/trending', methods=['GET'])
def trending_movies():
    try:
        movies = get_trending_movies()
        return jsonify({"results": movies})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/movies/upcoming', methods=['GET'])
def upcoming_movies():
    try:
        movies = get_upcoming_movies()
        return jsonify({"results": movies})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
