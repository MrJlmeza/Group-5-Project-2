# import necessary libraries
import numpy as np
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
    results = db.session.query(GrubHubDashboard.establishment, 
                               GrubHubDashboard.total,
                               GrubHubDashboard.tip,
                               GrubHubDashboard.grubhub,
                               GrubHubDashboard.timePay,
                               GrubHubDashboard.mileagePay,
                               GrubHubDashboard.miles,
                               GrubHubDashboard.bonus,
                               GrubHubDashboard.streetName,
                               GrubHubDashboard.city,
                               GrubHubDashboard.zip,
                               GrubHubDashboard.canceled,
                               GrubHubDashboard.popUp,
                               GrubHubDashboard.type,
                               GrubHubDashboard.lat,
                               GrubHubDashboard.long,
                               GrubHubDashboard.rating).all()

    grubHubDashboard_data = []
    for establishment, total, tip, grubhub, timePay, mileagePay, miles, bonus, streetName, city, zip, canceled, popUp, type, lat, long, rating in results:
        data_dict = {}
        data_dict["establishment"] = establishment
        data_dict["total"] = total
        data_dict["tip"] = tip
        data_dict["grubhub"] = grubhub
        data_dict["timePay"] = timePay
        data_dict["mileagePay"] = mileagePay
        data_dict["miles"] = miles
        data_dict["bonus"] = bonus
        data_dict["streetName"] = streetName
        data_dict["city"] = city
        data_dict["zip"] = zip
        data_dict["canceled"] = canceled
        data_dict["popUp"] = popUp
        data_dict["type"] = type
        data_dict["lat"] = lat
        data_dict["long"] = long
        data_dict["rating"] = rating
        grubHubDashboard_data.append(data_dict)

    return jsonify(grubHubDashboard_data)
    
    
    # return jsonify(grubHubDashboardResults)
    return grubHubDashboardResults
    # results = db.session.query(GrubHubDashboard.establishment, GrubHubDashboard.lat, GrubHubDashboard.long).all()

    # hover_text = [result[0] for result in results]
    # lat = [result[1] for result in results]
    # lon = [result[2] for result in results]

    # grubHub_data = [{
    #     "type": "scattergeo",
    #     "locationmode": "USA-states",
    #     "lat": lat,
    #     "lon": lon,
    #     "text": hover_text,
    #     "hoverinfo": "text",
    #     "marker": {
    #         "size": 15,
    #         "line": {
    #             "color": "rgb(8,8,8)",
    #             "width": 1
    #         },
    #     }
    # }]

    # return jsonify(grubHub_data)


if __name__ == "__main__":
    app.run()
