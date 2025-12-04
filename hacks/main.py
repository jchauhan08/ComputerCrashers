import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize App
app = Flask(__name__)

# --- CONFIGURATION ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'caramel_secret_key'

# Cookie Configuration (Helps with the 401 error)
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False 

# CORS Configuration
# We explicitly list http://localhost:4000 so the backend trusts your frontend
CORS(app, supports_credentials=True, origins=["http://localhost:4500", "http://127.0.0.1:4500"])

# Setup DB and Login Manager
db = SQLAlchemy(app)
login_manager = LoginManager(app)

# --- DATABASE MODEL ---
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    # Character Data
    character_type = db.Column(db.String(50), nullable=True) 
    character_name = db.Column(db.String(100), nullable=True) 

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
        # Return character info so frontend knows what to do
        return jsonify({
            "message": "Login successful", 
            "username": user.username,
            "character_type": user.character_type,
            "character_name": user.character_name
        }), 200
    
    return jsonify({"error": "Invalid creds"}), 401

@app.route('/api/save_character', methods=['POST'])
@login_required 
def save_character():
    data = request.get_json()
    
    # Update the current user's info
    current_user.character_type = data.get('character_type')
    current_user.character_name = data.get('character_name')
    
    db.session.commit()
    
    return jsonify({"message": "Character saved!"}), 200

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out"}), 200

# --- RUN SERVER ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    # Running on 0.0.0.0 allows it to hear requests from localhost or 127.0.0.1
    app.run(debug=True, port=8086, host='0.0.0.0')