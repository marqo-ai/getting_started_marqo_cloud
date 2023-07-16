from typing import Union, Dict, List, Callable

import marqo

def default_chunker(document: str):
    return [{"text": document}]


class MarqoKnowledgeStore:
    def __init__(
        self,
        client: marqo.Client,
        index_name: str,
        document_chunker: Callable[[str], List[str]] = default_chunker,
    ) -> None:
        self._client = client
        self._index_name = index_name
        self._document_chunker = document_chunker

        self._index_settings = {
            "index_defaults": {
                "model": "hf/all_datasets_v4_MiniLM-L6",
                "text_preprocessing": {
                    "split_length": 2,
                    "split_overlap": 0,
                    "split_method": "sentence",
                },
            }
        }

        try:
            self._client.create_index(
                self._index_name, settings_dict=self._index_settings
            )
        except:
            print("Index exists")

    def query_for_content(self, query: Union[str, Dict[str, float]], limit: int = 5):
        resp = self._client.index(self._index_name).search(q=query, limit=limit)

        data = {"search_results": []}
        for hit in resp["hits"]:
            del hit["_highlights"]
            del hit["_id"]
            data["search_results"].append(hit)
        return resp

    def add_document(self, document):
        self._client.index(self._index_name).add_documents(
            self._document_chunker(document)
        )

    def reset_index(self):
        self._client.delete_index(self._index_name)
        self._client.create_index(self._index_name, settings_dict=self._index_settings)
