from flask import Flask, jsonify, request
from search import search
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/health", methods=["GET"])
def health():
    response = {"status": "Backend is healthy."}
    return jsonify(response), 200


@app.route("/search_marqo", methods=["POST"])
def search_marqo():
    data = request.get_json()
    query = data.get("query")
    more_of = data.get("moreOf")
    less_of = data.get("lessOf")
    limit = data.get("limit")
    results = search(query, more_of, less_of, limit)

    response = {"results": [dict(r) for r in results]}
    return response, 200


if __name__ == "__main__":
    app.run()
