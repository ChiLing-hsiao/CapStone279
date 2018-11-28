from selenium import webdriver
from selenium.common.exceptions import TimeoutException
# available since 2.4.0
from selenium.webdriver.support.ui import WebDriverWait
# available since 2.26.0
from selenium.webdriver.support import expected_conditions as EC
import time
# from Struct import Product
import Struct
import math
import requests
from bs4 import BeautifulSoup

def getProductReview(searchUrl):
    L2 = [];
    # Can't use, also dynamic web page
        # searchUrl = 'https://www.sephora.com/product/ultra-hd-invisible-cover-foundation-P398321?icid2=products%20grid:p398321:product';
        # agent = {"User-Agent":'Firefox'};
        # page = requests.get(searchUrl, agent);
        # print page;
        # soup = BeautifulSoup(page.content, 'html.parser')
        # print soup
    # Init driver
    driver = webdriver.Chrome(executable_path='C:/Users/Ray/Desktop/scracp/chromedriver_win32/chromedriver')
    driver.get(searchUrl);
    time.sleep(0.5)   # Delays for 0.5 seconds.

    # Move five times can scroll to the end (the height of the website is 4284px)
    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    html = driver.page_source;
    soup = BeautifulSoup(html.encode('utf-8'), 'html.parser')


    reviewTitleClass = 'css-1fsuw0x';
    reviewContentClass = 'css-eq4i08';
    reviewDateClass = 'css-12z5fyi'

    reviewTitles = soup.findAll("div", {"class" : reviewTitleClass});
    reviewContents = soup.findAll("div", {"class" : reviewContentClass});
    reviewDates = soup.findAll("span", {"class" : reviewDateClass});
    reviewRatings = getReviewRatings(soup);

    #print len(reviewTitles)
    #print len(reviewContents)
    #print len(reviewDates)
    #print len(reviewRatings)

    for i in range(len(reviewTitles)):
        title = reviewTitles[i].contents;
        content = reviewContents[i].contents;
        date = reviewDates[i].contents;
        rating = reviewRatings[i];

        ##############
        productComment = Struct.Comment(content, rating, date, title);
        L2.append(productComment);
    return L2;

def getReviewRatings(soup):
    divs = list();
    for element in soup.find_all("div", {"class" : 'css-hfbv3n'}):
        for temp in element.descendants:
            if temp.get('class', '') == ['css-17ol29l']:
                divs.append(temp);
    ret = list()
    for div in divs:
        rating = processRatingUnicodeInComment(div.get('style'));
        ret.append(rating);
    return ret;

# Sephora use the 'width' style to specify how many stars it is. One star is 20%.
def processRatingUnicodeInComment(ratingUnicode):
    temp = ratingUnicode.encode('ascii','ignore')
    intString = ''.join(x for x in temp if x.isdigit())
    num = int(intString)
    num /= 20
    return str(num)

def getProductInfo(keyword):
    # https://www.sephora.com/search?keyword=foundation
    searchUrl = 'https://www.sephora.com/search?keyword=' + keyword

    # Init driver
    driver = webdriver.Chrome(executable_path='./chromedriver')
    driver.get(searchUrl);
    time.sleep(0.5)   # Delays for 0.5 seconds.

    # Move five times can scroll to the end (the height of the website is 4284px)
    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    html = driver.page_source;

    # from bs4 import BeautifulSoup
    soup = BeautifulSoup(html.encode('utf-8'), 'html.parser')

    # Brand
    productsBrands = soup.findAll("span", {"data-at" : "sku_item_brand"});

    # Name
    productsNames = soup.findAll("span", {"data-at" : "sku_item_name"});

    # URL
    productsUrls = soup.findAll("a", {"class" : "css-ix8km1"});

    # Price
    productsPrices = soup.findAll("span", {"data-at" : "sku_item_price_list"});

    # IMG_URL
    imageUrls = soup.findAll("img", {"class" : "css-bynouy"});

    # Rating
    productsRatings = soup.findAll("div", {"class" : "css-17ol29l"});

    # # List all product on this page
    L = [];
    #print len(productsNames);
    #print len(imageUrls);
    for i in range(len(productsNames)):
        # print 'Brand:' + str(productsBrands[i].contents)
        # print 'Product Name:' + str(productsNames[i].contents)
        # print 'Product Url:' + str(productsUrls[i].get('href'))
        # print 'Price:' + str(productsPrices[i].contents)
        # print 'Image Url:' + str(imageUrls[i].get('src'))
        # print 'Rating:' + processRatingUnicode(productsRatings[i].get('style'));
        # print '-----------'
        brand =  str(productsBrands[i].contents)
        productName = str(productsNames[i].contents)
        productUrl = str(productsUrls[i].get('href'))
        price = str(productsPrices[i].contents)
        imageUrl = str(imageUrls[i].get('src'))
        rating = processRatingUnicode(productsRatings[i].get('style'));
        
        product = Struct.Product(brand, productName, price, productUrl, imageUrl, rating);
        L.append(product);

    return L;
# @param {unicode} ratingUnicode 
# @output {str} parse result
def processRatingUnicode(ratingUnicode):
    temp = ratingUnicode.encode('ascii','ignore')
    intString = ''.join(x for x in temp if x.isdigit())
    num = int(intString)
    num = num / math.pow(10, len(intString))
    num = num * 5
    return str(num)

#getProductInfo("foundation");
#getProductReview('https://www.sephora.com/product/ultra-hd-invisible-cover-foundation-P398321?icid2=products%20grid:p398321:product');