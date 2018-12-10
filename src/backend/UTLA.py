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
    # headless
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--window-size=1920,1080');

    driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options)
    # driver = webdriver.Chrome(executable_path='/Users/Leon/Desktop/capstone_test/chromedriver')
    # baseUrl = 'https://www.ulta.com';
    driver.get(searchUrl);
    time.sleep(0.5)   # Delays for 0.5 seconds.

    # Move five times can scroll to the end (the height of the website is 4284px)
    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    html = driver.page_source;
    soup = BeautifulSoup(html.encode('utf-8'), 'html.parser')

    reviews = soup.findAll('article', {'class' : 'pr-review'});
    # print len(reviews);
    
    # title
    reviewTitles = [];
    for review in reviews:
        temp = review.findAll('h2', {'class' : 'pr-rd-review-headline'});
        reviewTitle = temp[0].contents[0];
        reviewTitles.append(reviewTitle);
    # print reviewTitles[0];

    # content
    reviewContents = [];
    for review in reviews:
        temp = review.findAll('p', {'class' : 'pr-rd-description-text'});
        reviewContent = temp[0].contents[0];
        reviewContents.append(reviewContent);
    # print reviewContents[0];

    # date
    reviewDates = [];
    for review in reviews:
        temp = review.findAll('time', {});
        reviewDate = temp[0].contents[0];
        reviewDates.append(reviewDate.strip());
    # print reviewDates[0];

    # rating
    reviewRatings = [];
    for review in reviews:
        temp = review.findAll('div', {'class' : 'pr-snippet-rating-decimal'});
        reviewRating = temp[0].contents[0];
        reviewRatings.append(reviewRating);
    # print reviewRatings[0];

    # print len(reviewTitles)
    # print len(reviewContents)
    # print len(reviewDates)
    # print len(reviewRatings)

    for i in range(len(reviews)):
        # print reviewTitles[i]
        # print reviewContents[i]
        # print reviewDates[i]
        # print reviewRatings[i]
        # print '################'
        comment = Struct.Comment(reviewContents[i], reviewRatings[i], reviewDates[i], reviewTitles[i])
        L.append(comment)
    return L

def getProductInfo(keyword):
    # https://www.ulta.com/ulta/a/_/Ntt-temp/
    searchUrl = 'https://www.ulta.com/ulta/a/_/Ntt-' + keyword;

    # headless
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    # chrome_options.add_argument('--window-size=1920,1080');
    driver = webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options)

    driver.get(searchUrl);
    time.sleep(0.5)   # Delays for 0.5 seconds.

    # Move five times can scroll to the end (the height of the website is 4284px)
    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    html = driver.page_source;

    # from bs4 import BeautifulSoup
    soup = BeautifulSoup(html.encode('utf-8'), 'html.parser')
    products = soup.findAll('div', {'class' : 'productQvContainer'});
    
    # Brand
    productsBrands = [];
    for product in products:
        temp = product.findAll('h4', {'class' : 'prod-title'});
        productsBrand = temp[0].findAll('a', {})[0].contents[0].encode('utf-8','ignore').strip();
        productsBrands.append(productsBrand);
    # print productsBrands[0];

    # Name
    productsNames = [];
    for product in products:
        temp = product.findAll('p', {'class' : 'prod-desc'});
        productsName = temp[0].findAll('a', {})[0].contents[0].encode('utf-8','ignore').strip();
        productsNames.append(productsName)
    # print productsNames[0];

    # URL
    productsUrls = [];
    for product in products:
        temp = product.findAll('p', {'class' : 'prod-desc'});
        productsUrl = temp[0].findAll('a', {})[0].get('href');
        productsUrls.append(productsUrl)
    # print productsUrls[0];

    # Price
    productsPrices = [];
    for product in products:
        temp = product.findAll('span', {'class' : 'regPrice'});
        productsPrice = 0;
        # Deal with promotion
        if len(temp) == 0 :
            temp = product.findAll('span', {'class' : 'pro-new-price'});
        productsPrice = temp[0].contents[0].encode('utf-8','ignore').strip();
        productsPrices.append(productsPrice);
    # print prices[0];

    # IMG_URL
    imageUrls = [];
    for product in products:
        temp = product.findAll('a', {'class' : 'product'});
        imageUrl = temp[0].findAll('img', {})[0].get('src').encode('utf-8','ignore').strip();
        imageUrls.append(imageUrl);
    # print imageUrls[0];

    # Rating
    productsRatings = [];
    for product in products:
        temp = product.findAll('label', {'class' : 'sr-only'});
        productsRating = temp[0].contents[0].encode('utf-8','ignore').strip();
        productsRating = productsRating.split()[0];
        productsRatings.append(productsRating);
    # print productsRatings[0];

    L = [];
    baseUrl = 'https://www.ulta.com';
    for i in range(len(productsNames)):
        price = productsPrices[i]
        price = price.decode('utf-8')
        if '-' in price:
            price = price[0:price.find('-')-1]
        price = price[price.find('$') + 1:]
        product = Struct.Product(productsBrands[i].decode('utf-8'), productsNames[i].decode('utf-8'), float(price), baseUrl + productsUrls[i], imageUrls[i].decode('utf-8'), float(productsRatings[i]));
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

# getProductInfo("foundation");
# getProductReview('https://www.ulta.com/your-skin-but-better-cc-cream-with-spf-50?productId=xlsImpprod5770257');
