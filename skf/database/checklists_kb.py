from skf.database import db

class ChecklistKB(db.Model):
    
    __tablename__ = 'checklists_kb'
    
    id = db.Column(db.Integer, primary_key=True)
    checklist_id = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text)
    add_resources = db.Column(db.Text)
    maturity = db.Column(db.Integer, nullable=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=True)
    questions = db.relationship("Question", backref=db.backref('checklist_kb'))
    kb_id = db.Column(db.Integer, db.ForeignKey("kb_items.kb_id"), nullable=True)
    kb_items = db.relationship("KBItem", backref=db.backref('checklist_kb'))
    checklist_type = db.Column(db.Integer, nullable=False)

    def __init__(self, checklist_id, content, checklist_type, add_resources, maturity):
        self.checklist_id = checklist_id
        self.checklist_type = checklist_type
        self.content = content
        self.add_resources = add_resources 
        self.maturity = maturity 
