from elasticsearch import Elasticsearch
from app.config import ELASTIC_ENDPOINT, ELASTIC_API_KEY

es = Elasticsearch(
    ELASTIC_ENDPOINT,
    api_key=ELASTIC_API_KEY
)


def check_connection():
    return es.info()