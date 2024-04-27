from flask import Flask, request, jsonify
from langchain.vectorstores import FAISS
from langchain.document_loaders import DirectoryLoader
from langchain.llms import OpenAI 
from langchain.chains.question_answering import VectorDBQA




print("ollama")

