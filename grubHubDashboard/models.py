from .app import db


class GrubHubDashboard(db.Model):
    __tablename__ = 'grubHubDashboard'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Datetime)
    establishment = db.Column(db.String(64))
    total = db.Column(db.Float)
    tip = db.Column(db.Float)
    grubhub = db.Column(db.Float)
    timePay = db.Column(db.Float)
    mileagePay = db.Column(db.Float)
    miles = db.Column(db.Float)
    bonus = db.Column(db.Float)
    acceptedAt = db.Column(db.datetime)
    delivered = db.Column(db.String(64))
    streetName = db.Column(db.String(64))
    city = db.Column(db.String(64))
    zip = db.Column(db.String(64))
    cancelled = db.Column(db.Boolean)
    popUp = db.Column(db.Boolean)
    pickUp = db.Column(db.Boolean)
    doubleOrder = db.Column(db.Boolean)
    type = db.Column(db.String(64))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    rating = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)
