import db
import json
from flask import Flask, request, render_template
from flask import jsonify


from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


@app.route('/', methods = ['GET', 'POST'])
def home():
    return render_template("signin.html")


@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    return render_template("signup.html")



@app.route('/signin', methods = ['GET', 'POST'])
def signin():
    status, username = db.check_user()

    data = {
        "username": username,
        "status": status
    }

    return json.dumps(data)

@app.route('/register', methods = ['GET', 'POST'])
def register():
    status = db.insert_data()
    return json.dumps(status)

# TODO: STILL INCOLMPLETE 
def query():
	if request.method == 'POST':
		# query = request.form['query']
		request_data = request.get_json()
		print("QUERY")
		print(request_data['query'])

# TODO: STILL INCOLMPLETE 
@app.route('/ask', methods = ['GET', 'POST'])
def ask():
    status = query()
    print(status)
    return jsonify(status)

if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True)