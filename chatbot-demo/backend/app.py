from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import marqo
from ai_chat import converse
from typing import List
from knowledge_store import MarqoKnowledgeStore

app = Flask(__name__)
CORS(app)

INDEX_NAME = "knowledge-management"
CLIENT = marqo.Client("http://localhost:8882")
KNOWLEDGE_ATTR = "knowledge"
CHUNK_SIZE = 1024


def chunker(document: str):
    return [
        {"text": document[i : i + CHUNK_SIZE]}
        for i in range(0, len(document), CHUNK_SIZE)
    ]


MKS = MarqoKnowledgeStore(CLIENT, INDEX_NAME, document_chunker=chunker)
MKS.reset_index()


def get_document_text(url: str) -> str:
    # Get the HTML content of the webpage
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    # Extract the text from the HTML
    text = soup.get_text()
    return text


@app.route("/getKnowledge", methods=["POST"])
def get_knowledge():
    data = request.get_json()

    q: str = data.get("q")
    conversation: List[str] = data.get("conversation")
    limit = data.get("limit")

    return Response(
        stream_with_context(converse(q, conversation, MKS, limit)),
        mimetype="text/plain",
    )


@app.route("/addKnowledge", methods=["POST"])
def add_knowledge():
    data = request.get_json()

    # Add the document to the knowledge index
    document = data.get("document")
    MKS.add_document(document)

    return {"message": "Knowledge added successfully"}


@app.route("/addWebpage", methods=["POST"])
def add_webpage():
    data = request.get_json()
    url = data["URL"]

    # Extract the text from the webpage and add it to the knowledge index
    document = get_document_text(url)
    MKS.add_document(document)

    return {"message": "Knowledge added successfully"}
