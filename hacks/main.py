import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # <--- The Magic Key
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize App
app = Flask(__name__)
# This allows your Markdown frontend (likely on localhost:4000) to talk to this backend
CORS(app, supports_credentials=True) 

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'caramel_secret_key'

# Setup DB and Login Manager
db = SQLAlchemy(app)
login_manager = LoginManager(app)

# --- DATABASE MODEL ---
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- API ROUTES ---

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username taken"}), 400

    hashed_pw = generate_password_hash(password, method='scrypt')
    new_user = User(username=username, email=email, password=hashed_pw)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Login successful", "username": user.username}), 200
    
    return jsonify({"error": "Invalid creds"}), 401

# --- RUN SERVER ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Creates the SQLite file if it doesn't exist
    # We run on port 8086 to avoid clashing with your Jekyll frontend
    app.run(debug=True, port=8086)