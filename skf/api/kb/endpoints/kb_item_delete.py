from flask import request
from flask_restplus import Resource
from skf.api.kb.business import delete_kb_item
from skf.api.kb.serializers import message
from skf.api.restplus import api
from skf.api.security import *

ns = api.namespace('kb', description='Operations related to knowledge base')

@ns.route('/delete/<int:id>')
@api.doc(params={'id': 'The project id'})
@api.response(404, 'Validation error', message)
class KnowledgebaseItemDelete(Resource):

    @api.marshal_with(message, 'Success')
    @api.response(400, 'No results found', message)
    def delete(self, id):
        val_num(id)
        result = delete_kb_item(id)
        return result, 200, security_headers()
