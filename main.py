from flask import Flask, flash, render_template, request, redirect, url_for
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import plotly.graph_objs as go
import plotly.offline
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ideas.db'


db = SQLAlchemy(app)
# login_manager = LoginManager(app)
# login_manager.login_view = 'login'

class Idea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    problem_statement = db.Column(db.Text, nullable=False)
    solutions = db.Column(db.Text, nullable=False)
    project_proposals = db.Column(db.Text, nullable=False)
    yes_votes = db.Column(db.Integer, default=0)
    no_votes = db.Column(db.Integer, default=0)
    


    


# from werkzeug.security import generate_password_hash, check_password_hash

# # 

# class User(UserMixin, db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128), nullable=False)  # Add this line

#     def __init__(self, username, password):
#         self.username = username
#         self.set_password(password)  # Hash the password when creating a user

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)



# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

@app.route('/')
def front_page():
    ideas = Idea.query.all()
    return render_template('front_page.html', ideas=ideas)





@app.route('/idea/<int:idea_id>/vote', methods=['POST'])
def vote(idea_id):
    idea = Idea.query.get(idea_id)
    
    if request.method == 'POST':
        user_vote = request.form['vote']
        if user_vote == 'yes':
            idea.yes_votes += 1
        elif user_vote == 'no':
            idea.no_votes += 1
        
        db.session.commit()
    
    return redirect(url_for('view_idea', idea_id=idea_id))



# from flask_login import login_user, logout_user

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         user = User.query.filter_by(username=username).first()
#         if user and user.password == password:
#             login_user(user)
#             flash('Login successful.', 'success')
#             return redirect(url_for('home'))
#         else:
#             flash('Invalid username or password. Please try again.', 'danger')
#     return render_template('login.html')



# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']

#         existing_user = User.query.filter_by(username=username).first()
#         if existing_user:
#             flash('Username already exists. Please choose a different username.', 'danger')
#         else:
#             new_user = User(username=username, password=password)
#             db.session.add(new_user)
#             db.session.commit()
#             flash('Registration successful. You can now log in.', 'success')
#             return redirect(url_for('login'))
#     return render_template('register.html')


# @app.route('/dashboard')
# @login_required
# def dashboard():
#     return render_template('dashboard.html', user=current_user)

# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     flash('Logged out successfully', 'success')
#     return redirect(url_for('login'))

# @app.route('/add_comment', methods=['GET', 'POST'])
# def submit_idea():
#     if request.method == 'POST':
#         name = request.form['name']
#         summary = request.form['summary']
#         description = request.form['description']
#         problem_statement = request.form['problem_statement']
#         solutions = request.form['solutions']
#         project_proposals = request.form['project_proposals']

#         new_idea = Idea(
#             title=title,
#             summary=summary,
#             description=description,
#             problem_statement=problem_statement,
#             solutions=solutions,
#             project_proposals=project_proposals
#         )
#         db.session.add(new_idea)
#         db.session.commit()

#         return redirect(url_for('front_page'))

#     return render_template('submit_idea.html')


@app.route('/submit_idea', methods=['GET', 'POST'])
def submit_idea():
    if request.method == 'POST':
        title = request.form['title']
        summary = request.form['summary']
        description = request.form['description']
        problem_statement = request.form['problem_statement']
        solutions = request.form['solutions']
        project_proposals = request.form['project_proposals']
        new_idea = Idea(
            title=title,
            summary=summary,
            description=description,
            problem_statement=problem_statement,
            solutions=solutions,
            project_proposals=project_proposals
        )
        db.session.add(new_idea)
        db.session.commit()

        return redirect(url_for('front_page'))

    return render_template('submit_idea.html')


@app.route('/delete_idea/<int:idea_id>')
# @login_required  
def delete_idea(idea_id):
    idea = Idea.query.get(idea_id)
    
    if idea:
        db.session.delete(idea)
        db.session.commit()

    return redirect(url_for('front_page'))

@app.route('/idea/<int:idea_id>')
def view_idea(idea_id):
    idea = Idea.query.get(idea_id)
    return render_template('view_idea.html', idea=idea)


def create_vote_graph(idea):
    data = [
        go.Bar(x=['Yes', 'No'], y=[idea.yes_votes, idea.no_votes])
    ]
    graph_html = plotly.offline.plot(data, output_type='div', include_plotlyjs=False)
    return graph_html






if __name__ == '__main__':
    with app.app_context():  
        db.create_all()  
    app.run(debug=True, port=5000)