from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import marqo
from ai_chat import converse
from typing import List

app = Flask(__name__)
CORS(app)

@app.route("/getKnowledge", methods=["POST"])
def get_knowledge():
    data = request.get_json()

    q: str = data.get("q")
    conversation: List[str] = data.get("conversation")
    limit = data.get("limit")

    return Response(
        stream_with_context(converse(q, conversation, limit)),
        mimetype="text/plain",
    )

if __name__ == "__main__":
    app.run(debug=True)