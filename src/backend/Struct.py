import random

class API(object):
    """docstring for API"""
    def __init__(self, arg):
        super(API, self).__init__()
        self.arg = arg

class Product(object):
    """docstring for product"""
    def __init__(self, brand, name, price, product_URL, figure_URL, review_score):
        super(Product, self).__init__()
        self.id = random.randint(0, 1000000)
        self.name = name
        self.price = price
        self.product_URL = product_URL
        self.figure_URL = figure_URL
        self.review_score = review_score
        self.brand = brand

    def product_print(self):
        print ("brand: " + self.brand)
        print ("name:" + self.name)
        print ("price: " + self.price)
        print ("product_URL: " + self.product_URL)
        print ("figure_URL: " + self.figure_URL)
        print ("review_score: " + self.review_score)
        
class Comment(object):
    """docstring for Comment"""
    def __init__(self, content, score, date, tile):
        super(Comment, self).__init__()
        self.content = content
        self.score = score
        self.date = date
        self.tile = tile
    def __str__():
        print("__str__")
        #print self.content + " " + self.score + " " + self.date + " " + self.tile

class Products(object):
    """docstring for Products"""
    def __init__(self, keyword, num):
        super(Products, self).__init__()
        self.keyword = keyword
        self.products = []
        self.num = num #indicate how many products to add

    def add_prodcut(name, price, product_URL, figure_URL, review_score): 
        # the name is string, the price is int, the product_URL is string, figure_URL is string, review_score is int, 
        # the listof_comments is a list of string.
        p = Product(brand, name, price, product_URL, figure_URL, review_score)
        products.append(p)

    def print_all():
        for ele in products:
            #print ele
            print("-------------")