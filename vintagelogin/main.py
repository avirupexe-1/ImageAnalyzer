import random
from flask import Blueprint, render_template, request, jsonify
from flask_login import login_required, current_user
from vision import analyze_image, BUDDIES

main_bp = Blueprint("main", __name__)

BUDDY_KEYS = list(BUDDIES.keys())


@main_bp.route("/dashboard")
@login_required
def dashboard():
    buddy = random.choice(BUDDY_KEYS)
    buddy_name = BUDDIES[buddy][0]
    return render_template("dashboard.html", buddy=buddy, buddy_name=buddy_name)


@main_bp.route("/describe", methods=["POST"])
@login_required
def describe():
    data     = request.get_json(force=True)
    image    = data.get("image", "")
    buddy    = data.get("buddy", "cat")

    if not image:
        return jsonify({"error": "No image provided"}), 400

    result = analyze_image(image, buddy)
    return jsonify(result)
