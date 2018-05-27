from wifirelay import db

class Device(db.Model):
  __tablename__ = 'devices'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  active = db.Column(db.Boolean, nullable=False)

  def __init__(self, name, active):
    self.name = name
    self.active = active

  def __repr__(self):
    return '<Device %d %s %r>' % (self.id, self.name, self.active)

  @property
  def serialize(self):
    return {'id': self.id, 'name': self.name, 'active': self.active}
