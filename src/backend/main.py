import Struct
import json
import Bloomindale
import Sephora
import _thread
import time
import threading 
import copy
from flask import Flask, jsonify, request, json

def API1(L, key):
    tmp = Sephora.getProductInfo(key)
    print(key)
    L.append(tmp);

def API2(L, key):
    tmp = Bloomindale.getProductInfo(key)
    print(key)
    L.append(tmp)

def get(key, L1, L2):
    t1 = threading.Thread(target=API1, args=(L1,key,)) 
    t2 = threading.Thread(target=API2, args=(L2,key,)) 

    # starting thread 1 
    t1.start() 
    # starting thread 2 
    t2.start() 
  
    # wait until thread 1 is completely executed 
    t1.join() 
    # wait until thread 2 is completely executed 
    t2.join() 
  
    # both threads completely executed 
    #print "Done!"

def deliver(key):
    L1 = []
    L2 = []
    key = "Lipstick"
    get(key, L1, L2)
    #L1 = L1[0]
    L2 = L2[0]
    data = {}
    data['Product'] = []
    for i in range(0, 30):  
        dic = {}
        dic["name"] = L2[i].name
        dic["price"] = L2[i].price
        dic["product_URL"] = L2[i].product_URL
        dic["figure_URL"] = L2[i].figure_URL
        dic["review_score"] = L2[i].review_score
        dic["brand"] = L2[i].brand
        data['Product'].append(dic)

    #with open('data.txt', 'w') as outfile:  
    #    json.dump(data, outfile)
    return data

app = Flask(__name__)

@app.route("/", methods=['POST'])
def index():
    print("hello")
    key = request.get_json()['KEY']
    print(key)
    #web = request.get_json()['WEB']
    dic = deliver(key);
    return jsonify(dic)

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=5000)
    #print "done"