import Struct
import json
import Bloomindale
import Sephora
import _thread
import time
import threading 
import copy
from flask import Flask, jsonify, request, json

id = 0
DB = {}

def API1(L, key):
    try:
        tmp = Sephora.getProductInfo(key)
        print(key)
        L.append(tmp);
    except:
        print("ERROR in thread1")

def API2(L, key):
    try:
        tmp = Bloomindale.getProductInfo(key)
        print(key)
        L.append(tmp)
    except:
        print("EROOR in thread2")

def get(key, L1, L2):
    # t1 = threading.Thread(target=API1, args=(L1,key,))
    t2 = threading.Thread(target=API2, args=(L2,key,)) 

    # starting thread 1 
    # t1.start()
    # starting thread 2 
    t2.start() 
  
    # wait until thread 1 is completely executed 
    # t1.join()
    # wait until thread 2 is completely executed 
    t2.join() 
  
    # both threads completely executed 
    #print "Done!"

def deliver(key):
    global id, DB
    L1 = []
    L2 = []
    get(key, L1, L2)
    L2 = L2[0]
    data = {}
    data['Product'] = []
    print ('Get L2' + str(len(L2)))
    for i in range(0, len(L2)):
        dic = {}
        print (L2[i].name)
        print (L2[i].price)
        print (L2[i].product_URL)
        print (L2[i].figure_URL)
        dic["id"] = id
        dic["name"] = L2[i].name
        dic["price"] = L2[i].price
        dic["product_URL"] = L2[i].product_URL
        dic["figure_URL"] = L2[i].figure_URL
        dic["review_score"] = L2[i].review_score
        dic["brand"] = L2[i].brand
        data['Product'].append(dic)
        DB[id] = dic
        id += 1

    #with open('data.txt', 'w') as outfile:
    #    json.dump(data, outfile)
    return data

app = Flask(__name__)

@app.route("/", methods=['POST'])
def index():
    key = request.form.get("KEY")
    print(key)
    dic = deliver(key);
    return jsonify(dic)

@app.route("/detail", methods=['POST'])
def detail():
    global id, DB
    id = int(request.form.get("ID"))
    print(id)
    dic = DB[id];
    #dic["Comment"] = comment_deliver(Bloomindale.getProductReview(dic[product_URL]))
    return jsonify(dic)

if __name__ == "__main__":
    app.run(host='localhost',port=5000)
    #print "done"