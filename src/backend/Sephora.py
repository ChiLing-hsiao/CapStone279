from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import DesiredCapabilities


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
    L = []
    # Init driver

    # headless
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--disable-extensions');
    chrome_options.add_argument('--window-size=1920,1080');
    
    # certificate
    capabilities = DesiredCapabilities.CHROME.copy()
    capabilities['acceptSslCerts'] = True 
    capabilities['acceptInsecureCerts'] = True

    driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options, desired_capabilities=capabilities)
    # driver = webdriver.Chrome(executable_path='/Users/Leon/Desktop/capstone_test/chromedriver')
    # baseUrl = 'https://www.sephora.com';
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

    for i in range(len(reviewTitles)):
        title = reviewTitles[i].contents;
        content = reviewContents[i].contents;
        date = reviewDates[i].contents;
        rating = reviewRatings[i];
        # print content
        comment = Struct.Comment(content, rating, date, title)
        L.append(comment)
    driver.close();
    return L

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
    searchUrl = 'https://www.sephora.com/search?keyword=' + keyword

    # headless
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    # chrome_options.add_argument('--window-size=1920,1080');
    driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options)

    # Init driver
    # driver = webdriver.Chrome(executable_path='/Users/Leon/Desktop/capstone_test/chromedriver')
    driver.get(searchUrl);
    time.sleep(0.5)   # Delays for 0.5 seconds.

    # Move five times can scroll to the end (the height of the website is 4284px)
    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    html = driver.page_source;

    # from bs4 import BeautifulSoup
    soup = BeautifulSoup(html.encode('utf-8'), 'html.parser')

    # All products
    products = soup.findAll('div', {"class" : "css-12egk0t"});

    # Brand
    productsBrands = [];
    for product in products:
        temp = product.findAll("span", {"data-at" : "sku_item_brand"});
        brand = temp[0].contents[0].encode('ascii','ignore')
        productsBrands.append(brand);
    
    # Name
    productsNames = [];
    for product in products:
        temp = product.findAll("span", {"data-at" : "sku_item_name"});
        name = temp[0].contents[0].encode('ascii','ignore')
        productsNames.append(name);
    
    # URL
    productsUrls = [];
    for product in products:
        temp = product.findAll("a", {"class" : "css-ix8km1"});
        url = str(temp[0].get('href'));
        productsUrls.append(url);

    # Price
    productsPrices = [];
    for product in products:
        temp = product.findAll("span", {"data-at" : "sku_item_price_sale"});
        if len(temp) == 0:
            temp = product.findAll("span", {"data-at" : "sku_item_price_list"});
        price = temp[0].contents[0].encode('ascii','ignore')
        productsPrices.append(price);
    
    # IMG_URL
    imageUrls = [];
    for product in products:
        temp = product.findAll("img", {"class" : "css-18c52mt"});
        imageUrl = str(temp[0].get('src'));
        imageUrls.append(imageUrl);
    
    # Rating
    productsRatings = [];
    for product in products:
        temp = product.findAll("div", {"class" : "css-17ol29l"});
        productsRating = processRatingUnicode(temp[0].get('style'));
        productsRatings.append(productsRating);
    
    # # List all product on this page
    # print len(productsNames);
    L = [];
    baseUrl = 'https://www.sephora.com';
    for i in range(len(productsNames)):
        price = productsPrices[i]
        if '-' in price:
            price = price[0:price.find('-')-1]
        price = price[price.find('$') + 1:]
        product = Struct.Product(productsBrands[i], productsNames[i], float(price), baseUrl + productsUrls[i], imageUrls[i], float(productsRatings[i]));
        # print 'Brand:' + productsBrands[i];
        # print 'Product Name:' + productsNames[i];
        # print 'Product Url:' + productsUrls[i];
        # print 'Price:' + productsPrices[i];
        # print 'Image Url:' + imageUrls[i];
        # print 'Rating:' + productsRatings[i];
        # print '-----------'
        L.append(product);
    
    driver.close();
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

# getProductInfo("foundation");
# getProductInfo("Tarte");
# getProductReview('https://www.sephora.com/product/ultra-hd-invisible-cover-foundation-P398321?icid2=products%20grid:p398321:product');
