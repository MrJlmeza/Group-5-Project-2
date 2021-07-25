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
from sqlalchemy import func

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
                               GrubHubDashboard.timepay,
                               GrubHubDashboard.mileagepay,
                               GrubHubDashboard.miles,
                               GrubHubDashboard.bonus,
                               GrubHubDashboard.streetname,
                               GrubHubDashboard.city,
                               GrubHubDashboard.zip,
                               GrubHubDashboard.canceled,
                               GrubHubDashboard.popup,
                               GrubHubDashboard.type,
                               GrubHubDashboard.lat,
                               GrubHubDashboard.long,
                               GrubHubDashboard.rating).all()

    grubHubDashboard_data = []
   
    for establishment, total, tip, grubhub, timepay, mileagepay, miles, bonus, streetname, city, zip, canceled, popup, type, lat, long, rating in results:
        data_dict = {}
        data_dict["establishment"] = establishment
        data_dict["total"] = total
        data_dict["tip"] = tip
        data_dict["grubhub"] = grubhub
        data_dict["timepay"] = timepay
        data_dict["mileagepay"] = mileagepay
        data_dict["miles"] = miles
        data_dict["bonus"] = bonus
        data_dict["streetname"] = streetname
        data_dict["city"] = city
        data_dict["zip"] = zip
        data_dict["canceled"] = canceled
        data_dict["popup"] = popup
        data_dict["type"] = type
        data_dict["lat"] = lat
        data_dict["long"] = long
        data_dict["rating"] = rating
        grubHubDashboard_data.append(data_dict)

    return jsonify(grubHubDashboard_data)

@app.route("/api/summarized")
def getSummarizedData():
    results = db.session.query(GrubHubDashboard.establishment, 
                               GrubHubDashboard.total,
                               GrubHubDashboard.tip,
                               GrubHubDashboard.grubhub,
                               GrubHubDashboard.timepay,
                               GrubHubDashboard.mileagepay,
                               GrubHubDashboard.miles,
                               GrubHubDashboard.bonus,
                               GrubHubDashboard.streetname,
                               GrubHubDashboard.city,
                               GrubHubDashboard.zip,
                               GrubHubDashboard.canceled,
                               GrubHubDashboard.popup,
                               GrubHubDashboard.type,
                               GrubHubDashboard.lat,
                               GrubHubDashboard.long,
                               GrubHubDashboard.rating).all()
    
    
    totalEarnings = 0
    totalDeliveries = 0
    establishmentList = []
    totalEstablishments = 0
    totalTips = 0
    typeList = []
    finaljson = {}

    for result in results:
        establishmentList.append(result.establishment)
        totalDeliveries = totalDeliveries + 1
        totalEarnings = totalEarnings + result.total
        totalTips = totalTips + result.tip
        typeList.append(result.type)

    typeCount = {x:typeList.count(x) for x in typeList}

    mySet = set(establishmentList)
    my_new_list = list(mySet)
    totalEstablishments = len(my_new_list)

    finaljson["totalEarnings"] = round(totalEarnings, 2)
    finaljson["totalDeDliveries"] = totaleliveries
    finaljson["totalTips"] = round(totalTips, 2)
    finaljson["totalEstablishments"] = totalEstablishments
    finaljson["typeCount"] = typeCount

    return jsonify(finaljson)

@app.route("/api/milessummarized")
def getSummarizedMileageData():
    results = db.session.query(GrubHubDashboard.establishment, 
                               GrubHubDashboard.total,
                               GrubHubDashboard.tip,
                               GrubHubDashboard.grubhub,
                               GrubHubDashboard.timepay,
                               GrubHubDashboard.mileagepay,
                               GrubHubDashboard.miles,
                               GrubHubDashboard.bonus,
                               GrubHubDashboard.streetname,
                               GrubHubDashboard.city,
                               GrubHubDashboard.zip,
                               GrubHubDashboard.canceled,
                               GrubHubDashboard.popup,
                               GrubHubDashboard.type,
                               GrubHubDashboard.lat,
                               GrubHubDashboard.long,
                               GrubHubDashboard.rating).all()
    
    
    totalMiles = 0
    totalMileagePay = 0
    finaljson = {}

    for result in results:
        totalMiles = totalMiles + result.miles
        totalMileagePay = totalMileagePay + result.mileagepay

    finaljson["totalMiles"] = round(totalMiles, 2)
    finaljson["totalMileagePay"] = round(totalMileagePay, 2)

    return jsonify(finaljson)

@app.route("/api/bar")
def getDataForBarChart():
    results = db.session.query(GrubHubDashboard.establishment, func.sum(GrubHubDashboard.total).label('totalSorted')).group_by(GrubHubDashboard.establishment).order_by(('totalSorted')).all()
    # results = db.session.query(GrubHubDashboard.establishment, GrubHubDashboard.total, GrubHubDashboard.type, GrubHubDashboard.rating).all()
    grubHubDashboard_data = [] 

    for establishment, total in results:
        data_dict = {}
        data_dict["establishment"] = establishment
        data_dict["total"] = round(total, 2)
        grubHubDashboard_data.append(data_dict)

    return jsonify(sorted(grubHubDashboard_data, key = lambda i: i["total"],reverse=True))


@app.route("/api/yelpearningsratings")
def getyelpearningsratings():
    results = db.session.query(GrubHubDashboard.rating, func.sum(GrubHubDashboard.total).label('totalSorted')).group_by(GrubHubDashboard.rating).order_by(GrubHubDashboard.rating).all()
    
    grubHubDashboard_data = [] 
   
    for rating, total in results:
        data_dict = {}
        data_dict["rating"] = rating
        data_dict["total"] = round(total, 2)
        grubHubDashboard_data.append(data_dict)

    return jsonify(grubHubDashboard_data)

if __name__ == "__main__":
    app.run()
