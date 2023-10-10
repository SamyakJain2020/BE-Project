import pymongo
from flask import request
import model1
import json

client = pymongo.MongoClient('mongodb://127.0.0.1:27017/')
userdb = client['userdb']
users = userdb.customers

class Document:
    def __init__(self, page_content, metadata):
        self.page_content = page_content
        self.metadata = metadata

def insert_data():
	if request.method == 'POST':
		name = request.form['name']
		email = request.form['email']
		password = request.form['pass']

		reg_user = {}
		reg_user['name'] = name
		reg_user['email'] = email
		reg_user['password'] = password

		if users.find_one({"email":email}) == None:
			users.insert_one(reg_user)
			return True
		else:
			return False


def check_user():

	if request.method == 'POST':
		email = request.form['email']
		password = request.form['pass']

		user = {
			"email": email,
			"password": password
		}

		user_data = users.find_one(user)
		if user_data == None:
			return False, ""
		else:
			return True, user_data["name"]
		
def query():
	if request.method == 'POST':
		query = request.form['query']
		response = model1.final_result(query)
		# print(response['result'])
		documents = response["source_documents"]
		extracted_data = []

	for document in documents:
		doc_content = document.page_content
		doc_source = document.metadata['source']
		doc_page = document.metadata['page']
		
		extracted_data.append({
			'content': doc_content,
			'source': doc_source,
			'page': doc_page
		})
	# Convert the extracted data to JSON
	json_data = json.dumps(extracted_data, indent=4)
	ans ={
			"query": query,
			"result": response['result'],
			# "source_documents": response['source_documents']['page_content'],
			"metadata":json_data
			# "page":status["page"],
		}
	# save ans in db match it with email ?
	return ans