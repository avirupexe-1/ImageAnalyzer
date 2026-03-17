from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required, current_user
from vision import describe_image

main = Blueprint('main', __name__)

@main.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@main.route('/describe', methods=['POST'])
@login_required
def describe():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']
    buddy_name = request.form.get('buddy', 'duck')

    if image_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        image_bytes = image_file.read()
        description = describe_image(image_bytes, buddy_name)
        return jsonify({'description': description})
    except Exception as e:
        return jsonify({'error': str(e)}), 500