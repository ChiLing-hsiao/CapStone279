import Struct
import json
import Bloomindale
import Sephora
import UTLA
import thread
import time
import threading 
import copy
from flask import Flask, jsonify, request, json

id = 0
DB = {}

def name_check(A, B):
    if(A == B): 
        return True
    if(abs(len(A) - len(B))/float(max(len(A), len(B))) > 0.3): 
        return False
    dicA = {}
    dicB = {}
    for ele in A:
        if ele.upper() in dicA:
            dicA[ele.upper()] += 1
        else:
            dicA[ele.upper()] = 1
    for ele in B:
        if ele.upper() in dicB:
            dicB[ele.upper()] += 1
        else:
            dicB[ele.upper()] = 1
    diff = 0
    for ele in dicA.keys():
        if(ele in dicB):
            diff += abs(dicB[ele] - dicA[ele])
        else:
            diff += dicA[ele]

    diff2 = 0
    for ele in dicB.keys():
        if(ele in dicA):
            diff2 += abs(dicA[ele] - dicB[ele])
        else:
            diff2 += dicB[ele]

    if(max(diff, diff2)/float(max(len(A), len(B))) > 0.3): 
        return False
    else:
        return True

def product_merge(L, result, source):
    for product in L:
        check = False
        for mp in result:
            if product.brand.upper() == mp.brand.upper() and name_check(product.name, mp.name):
                print (product.name);
                mp.price = (mp.price*len(mp.product_URL) + product.price)/(len(mp.product_URL)+1)
                mp.review_score = (mp.review_score*len(mp.product_URL) + product.review_score)/(len(mp.product_URL)+1)
                mp.product_URL.append(product.product_URL)
                mp.figure_URL.append(product.figure_URL)
                mp.source.append(source)
                check = True
                break
        if(not check):
            mp = Struct.Merge_Product()
            mp.name = product.name
            mp.price = product.price
            mp.product_URL.append(product.product_URL)
            mp.figure_URL.append(product.figure_URL)
            mp.review_score = product.review_score
            mp.brand = product.brand
            mp.source.append(source)
            result.append(mp);

def merge(L1, L2, L3):
    result = []
    if(L1):
        for product in L1:
            mp = Struct.Merge_Product()
            mp.name = product.name
            mp.price = product.price
            mp.product_URL.append(product.product_URL)
            mp.figure_URL.append(product.figure_URL)
            mp.review_score = product.review_score
            mp.brand = product.brand
            mp.source.append("Sephora")
            result.append(mp);
    
    if(L2):
        if(len(result) == 0):
            mp = Struct.Merge_Product()
            mp.name = product.name
            mp.price = product.price
            mp.product_URL.append(product.product_URL)
            mp.figure_URL.append(product.figure_URL)
            mp.review_score = product.review_score
            mp.brand = product.brand
            mp.source.append("Bloomindale")
            result.append(mp);
        else:
            product_merge(L2, result, "Bloomindale")

    if(L3):
        if(len(result) == 0):
            mp = Struct.Merge_Product()
            mp.name = product.name
            mp.price = product.price
            mp.product_URL.append(product.product_URL)
            mp.figure_URL.append(product.figure_URL)
            mp.review_score = product.review_score
            mp.brand = product.brand
            mp.source.append("UTLA")
            result.append(mp);
        else:
            product_merge(L3, result, "UTLA")
    return result
    

def API1(L, key):
    try:
        tmp = Sephora.getProductInfo(key)
        print(key)
        L.append(tmp);
        print("Success in Sephora")
    except:
        print("ERROR in Sephora")

def API2(L, key):
    try:
        tmp = Bloomindale.getProductInfo(key)
        print(key)
        L.append(tmp)
        print("Success in Bloomindale")
    except:
        print("EROOR in Bloomindale")

def API3(L, key):
    try:
        tmp = UTLA.getProductInfo(key)
        print(key)
        L.append(tmp)
        print("Success in UTLA")
    except:
        print("EROOR in UTLA")

def get(key):
    L1 = []
    L2 = []
    L3 = []
    t1 = threading.Thread(target=API1, args=(L1,key,))
    t2 = threading.Thread(target=API2, args=(L2,key,)) 
    t3 = threading.Thread(target=API3, args=(L3,key,))
    # starting thread 1 
    t1.start()
    # starting thread 2 
    t2.start() 
    t3.start()
    # wait until thread 1 is completely executed 
    t1.join()
    # wait until thread 2 is completely executed 
    t2.join() 
    t3.join()
    # both threads completely executed 
    #print "Done!"
    return merge(L1[0],L2[0],L3[0])

def deliver(key):
    global id, DB
    result = get(key)
    if len(result) == 0:
        return {}
    data = {}
    data['Product'] = []
    for i in range(0, len(result)):
        dic = {}
        dic["id"] = id
        dic["name"] = result[i].name
        dic["price"] = result[i].price
        dic["product_URL"] = result[i].product_URL
        dic["figure_URL"] = result[i].figure_URL
        dic["review_score"] = result[i].review_score
        dic["brand"] = result[i].brand
        dic["source"] = result[i].source
        data['Product'].append(dic)
        DB[id] = dic
        id += 1

    #with open('data.txt', 'w') as outfile:
    #    json.dump(data, outfile)
    return data

def comment_API1(L, URL):
    try:
        print(URL)
        tmp = Sephora.getProductReview(URL)
        L.append(tmp);
        print("Success in Sephora")
    except:
        print("ERROR in Sephora")

def comment_API2(L, URL):
    try:
        print("Bloomindale: " + URL)
        tmp = Bloomindale.getProductReview(URL)
        L.append(tmp)
        print("Success in Bloomindale")
    except:
        print("EROOR in Bloomindale")

def comment_API3(L, URL):
    try:
        print("UTLA: " + URL)
        tmp = UTLA.getProductReview(URL)
        L.append(tmp)
        print("Success in UTLA")
    except:
        print("EROOR in UTLA")

def form_comment(dic, comments):
    for comment in comments:
        dic["content"].append(comment.content)
        dic["score"].append(comment.score)
        dic["date"].append(comment.date)
        dic["title"].append(comment.title)

def get_comment(dic):
    L1 = []
    L2 = []
    L3 = []
    check1 = False;
    check2 = False;
    check3 = False;
    dic["content"] = []
    dic["score"] = []
    dic["date"] = []
    dic["title"] = []
    i = 0
    for src in dic["source"]:
        if(src == "Sephora"):
            t1 = threading.Thread(target=comment_API1, args=(L1,dic["product_URL"][i],))
            t1.start()
        elif(src == "Bloomindale"):
            t2 = threading.Thread(target=comment_API2, args=(L2,dic["product_URL"][i],)) 
            t2.start() 
        elif(src == "UTLA"):
            t3 = threading.Thread(target=comment_API3, args=(L3,dic["product_URL"][i],))
            t3.start() 
        i += 1

    if check1: 
        t1.join()
        form_comment(dic, L1[0])
    if check2:
        t2.join() 
        form_comment(dic, L2[0])
    if check3:
        t3.join()
        form_comment(dic, L3[0])

app = Flask(__name__)

@app.route("/", methods=['POST'])
def index():
    data = json.loads(request.data)
    key = data['KEY']
    print(key)
    dic = deliver(key);
    return jsonify(dic)

@app.route("/detail", methods=['POST'])
def detail():
    global id, DB
    id = int(request.form.get("ID"))
    print(id)
    dic = DB[id];
    get_comment(dic);
    return jsonify(dic)

if __name__ == "__main__":
    dic = deliver("SK2");
    get_comment(dic['Product'][3]);
    # app.run()
    #print "done"
