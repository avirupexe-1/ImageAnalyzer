from flask import Flask
from config import Config
from models import db
from flask_login import LoginManager
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

from models import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Register blueprints
from auth import auth as auth_blueprint
from main import main as main_blueprint

app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)

from flask import redirect, url_for

@app.route('/')
def index():
    return redirect(url_for('auth.login'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
else:
    # This runs when gunicorn starts the app
    with app.app_context():
        db.create_all()


print("DB PATH:", app.config['SQLALCHEMY_DATABASE_URI'])