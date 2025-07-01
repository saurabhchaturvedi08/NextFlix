from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["nextflix"]
collection = db["watchlist"]

def add_to_watchlist(movie):
    if not collection.find_one({"id": movie["id"]}):
        collection.insert_one(movie)

def get_watchlist():
    return list(collection.find({}, {"_id": 0}))

def remove_from_watchlist(movie_id):
    collection.delete_one({"id": movie_id})
