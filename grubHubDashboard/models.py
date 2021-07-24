from .app import db

class GrubHubDashboard(db.Model):
    __tablename__ = 'grubhubdashboard'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)
    establishment = db.Column(db.String(100))
    total = db.Column(db.Float)
    tip = db.Column(db.Float)
    grubhub = db.Column(db.Float)
    timePay = db.Column(db.Float)
    mileagePay = db.Column(db.Float)
    miles = db.Column(db.Float)
    bonus = db.Column(db.Float)
    acceptedAt = db.Column(db.Time)
    streetName = db.Column(db.String(150))
    city = db.Column(db.String(100))
    zip = db.Column(db.Integer)
    canceled = db.Column(db.Boolean)
    popUp = db.Column(db.Boolean)
    type = db.Column(db.String(100))
    lat = db.Column(db.Float)
    long = db.Column(db.Float)
    rating = db.Column(db.Float)

    def __repr__(self):
        return '<Pet %r>' % (self.name)
