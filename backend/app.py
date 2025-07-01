from services.watchlist import add_to_watchlist, get_watchlist, remove_from_watchlist

@app.route('/api/watchlist', methods=['GET'])
def get_list():
    return jsonify(get_watchlist())

@app.route('/api/watchlist/add', methods=['POST'])
def add_movie():
    movie = request.get_json()
    if not movie or 'id' not in movie:
        return jsonify({'error': 'Invalid movie object'}), 400
    add_to_watchlist(movie)
    return jsonify({'message': 'Added to watchlist'})

@app.route('/api/watchlist/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    remove_from_watchlist(movie_id)
    return jsonify({'message': 'Removed from watchlist'})
