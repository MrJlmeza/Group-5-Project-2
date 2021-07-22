# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from .models import GrubHubDashboard


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        date = request.form["date"]
        establishment = request.form["establishment"]
        total = request.form["total"]
        tip = request.form["tip"]
        grubhub = request.form["grubhub"]
        timePay = request.form["timePay"]
        mileagePay = request.form["mileagePay"]
        miles = request.form["miles"]
        bonus = request.form["bonus"]
        acceptedAt = request.form["acceptedAt"]
        streetName = request.form["streetName"]
        city = request.form["city"]
        zip = request.form["zip"]
        canceled = request.form["canceled"]
        popUp = request.form["popUp"]
        type = request.form["type"]
        lat = request.form["lat"]
        long = request.form["long"]
        rating = request.form["rating"]

        grubHubDashboard = GrubHubDashboard(
            date = date,
            establishment = establishment,
            total = total,
            tip = tip,
            grubhub = grubhub,
            timePay = timePay,
            mileagePay = mileagePay,
            miles = miles,
            bonus = bonus,
            acceptedAt = acceptedAt,
            streetName = streetName,
            city = city,
            zip = zip,
            canceled = canceled,
            popUp = popUp,
            type = type,
            lat = lat,
            long = long,
            rating = rating
        )

        db.session.add(grubHubDashboard)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


@app.route("/api/grubhHubDashboard")
def grubHubDash():
    grubHubDashboardResults = db.session.query(GrubHubDashboard.establishment, GrubHubDashboard.lat, GrubHubDashboard.long).all()
    return jsonify(grubHubDashboardResults)


if __name__ == "__main__":
    app.run()
