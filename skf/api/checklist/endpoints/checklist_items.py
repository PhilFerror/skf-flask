from flask_restplus import Resource
from skf.api.checklist.business import get_checklist_items
from skf.api.checklist.serializers import checklist_items, message
from skf.api.restplus import api
from skf.api.security import *

ns = api.namespace('checklist', description='Operations related to checklist items')

@ns.route('/items/<int:checklist_type>')
@api.doc(params={'checklist_type': 'The checklist type (0: ASVS lvl1, 1: ASVS lvl2, 2: ASVS lvl3, 3: MASVS lvl1, etc)'})
@api.response(404, 'Validation error', message)
class ChecklistCollection(Resource):

    @api.marshal_with(checklist_items)
    @api.response(400, 'No results found', message)
    def get(self, checklist_type):
        val_num(checklist_type)
        result = get_checklist_items(checklist_type)
        return result, 200, security_headers()
