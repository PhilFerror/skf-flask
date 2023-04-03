import time, random
from random import randint
from skf.database import db
from skf.database.lab_items import LabItem
from skf.database.lab_items_code import LabItemCode
from skf.database.lab_items_code_options import LabItemCodeOptions
from skf.api.security import log, val_num, val_alpha_num
from flask import render_template, Blueprint, jsonify, request, current_app
from skf.api.labs.deployment_tasks import SKFLabDeployment
from skf.api.labs.deletion_tasks import SKFLabDelete


def get_labs():
    log("User requested list of kb items", "LOW", "PASS")
    result = LabItem.query.order_by(LabItem.level.asc()).paginate(1, 2500, False)
    return result


def deploy_labs(instance_id, userid):
    log("User requested deployment of lab", "LOW", "PASS")
    result = LabItem.query.filter(LabItem.id == instance_id).first()
    rpc = SKFLabDeployment()
    body = result.image_tag + ":" + str(userid)
    response = rpc.call(body)
    print(type(response))  
    return {'message': response.encode().decode()} 


def delete_labs(instance_id, userid):
    log("User requested depletion of lab", "LOW", "PASS")
    result = LabItem.query.filter(LabItem.id == instance_id).first()
    rpc = SKFLabDelete()
    body = result.image_tag + ":" + str(userid)
    response = rpc.call(body)
    return {'message': response.encode().decode()} 
