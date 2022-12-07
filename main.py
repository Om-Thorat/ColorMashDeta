from flask import Flask, request, jsonify,render_template
from deta import Deta
from json import dumps
app = Flask(__name__)
user=""

DETA_BASE_TASK = "ColorCombos"

def getdb(db_name):
    deta = Deta(***REMOVED***)
    return deta.Base(db_name)

def get_detabase(func):
     def inner(*args, **krwargs):
          deta_db = getdb(DETA_BASE_TASK)
          return func(deta_db, *args, **krwargs)

     return inner
@get_detabase
def get_user_by_id(deta_db, key: str):
    """Get user from key"""
    user = deta_db.get(key)
    if not user:
        return
    return user

@get_detabase
def create_new_user(deta_db, user_dict):
    """Create a new user in deta base."""
    deta_db.put(user_dict)
    return "all good"

@get_detabase
def update_user(deta_db,key,rating):
        update = {
        "rating": rating,
        }
        #print(update)
        deta_db.update(update,key)
        return

@get_detabase
def getall(deta_db):
    data = deta_db.fetch(query=None,limit=1000)
    return data

class Color:
    ComboL = ""
    ComboR = ""
    Firstload = 0


def rate(winner):
    if Color.Firstload >=2:
        #print(Color.ComboR)
        #print(Color.ComboL)
        DeltaCL = 1/(1+10**((Color.ComboR['rating']-Color.ComboL['rating'])/400))
        DeltaCR = 1/(1+10**((Color.ComboL['rating']-Color.ComboR['rating'])/400))
        #print(DeltaCL)
        #print(DeltaCR)
        if winner == "Right":
            Color.ComboR['rating'] = Color.ComboR['rating'] + DeltaCR
            Color.ComboL['rating'] = Color.ComboL['rating'] - DeltaCL
        if winner == "Left":
            Color.ComboR['rating'] = Color.ComboR['rating'] - DeltaCR
            Color.ComboL['rating'] = Color.ComboL['rating'] + DeltaCL
        update_user(Color.ComboR['key'],float(Color.ComboR['rating']))
        update_user(Color.ComboL['key'],float(Color.ComboL['rating']))
    return "Great Success!"
@app.route('/')
def home():
    Color.Firstload = 0
    return render_template("shit.html")
@app.route('/voteR',methods=['POST','GET'])
def voteR():
    if request.method == "POST":
        ColorCombo = request.get_json()
        if get_user_by_id(ColorCombo['colorcombo']) == None:
            create_new_user({
                "key": ColorCombo['colorcombo'],
                "code": ColorCombo['colorcombo'],
                "rating": 400.000,
            })
        Color.ComboL = get_user_by_id(ColorCombo['colorcombo'])
        rate("Right")
        Color.Firstload += 1
    return "Great Success!"
@app.route('/voteL',methods=['POST','GET'])
def voteL():
    if request.method == "POST":
        ColorCombo = request.get_json()
        if get_user_by_id(ColorCombo['colorcombo']) == None:
            create_new_user({
                "key": ColorCombo['colorcombo'],
                "code": ColorCombo['colorcombo'],
                "rating": 400.000,
            })
        Color.ComboR = get_user_by_id(ColorCombo['colorcombo'])
        rate("Left")
        Color.Firstload += 1
    return "Great Sucess!"

@app.route('/leads')
def leads():
    data = getall()
    leaddict = {}
    for i in data.items:
        leaddict[i["code"]]= float(i["rating"])
    leaddict=dict(sorted(leaddict.items(), key=lambda item: item[1],reverse=True))
    data = dumps(leaddict)
    print(data)
    return (render_template("leads.html",data=(data)))
app.run(debug=True)