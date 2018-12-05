from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
import Struct
import requests
import time
import re

def getProductInfo(keyword):
    products = []
    url = 'https://shop.nordstrom.com/sr?keyword=%s' % keyword
    response = requests.get(url, headers = { 'User-Agent': "Mozilla/5.0" })
    print ('url: ' + str(url))
    print ('status code: ' + str(response.status_code))
    print ('encoding: ' + str(response.encoding))
    soup = BeautifulSoup(response.content, 'html.parser')

    for product in soup.find_all('article', class_='productModule_Z1pWESH'):
        name = product.find('span', class_='light_Z1MOMXL navigationLink_Z1yc2MG').span.text.strip(' \t\n')
        product_url = 'https://shop.nordstrom.com' + product.find('a', class_='linkWrapper_F71fC')['href']
        picture_url = product.find('img', class_='image_Z272g5Q')['src']
        prices = product.find_all('span', attrs={'data-element' : 'product-module-price-line-price'})
        normal_price = prices[0].text
        sales_price = -1
        if len(prices) > 1:
            sales_price = prices[1].text

        print ('---')
        print (name)
        print (product_url)
        print (picture_url)
        print (normal_price)
        print (sales_price)
        p = Struct.Product("", name, normal_price, product_url, picture_url, "0");
        if (sales_price != -1):
            p = Struct.Product("", name, sales_price, product_url, picture_url, "0");

        products.append(p)
    
    return products

def getProductReview(url):
    options = Options()
    # options.add_argument('--headless')
    # options.add_argument('--disable-gpu')
    options.add_argument('user-agent=Mozilla/5.0')
    driver = webdriver.Chrome(options=options, executable_path='./chromedriver')
    driver.get(url)

    for i in range(5):
        driver.execute_script("window.scrollBy(0,1000)");
        time.sleep(0.3);
    # driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.8);")
    # driver.execute_script("window.scrollBy(0, (document.body.scrollHeight*0.5));")
    # time.sleep(0.7)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    for review in soup.find_all('div', class_ = 'review_ZSzsr0'):
        author = review.find('div', class_='comment_Z2tOBDw').next_sibling.span.text
        date = review.find('div', class_='rightColumn_2st6aX').span.text
        title = review.find('strong', class_='title_ZFDjct').text
        content = review.find('div', class_='comment_Z2tOBDw').text
        score_percent = review.find('span', class_='reviewStarsActive_Zos8tQ')['style']
        score_real = int(re.findall(r'\d+', score_percent)[0]) * 0.05
        
        print ("---")
        print (author)
        print (date)
        print (title)
        print (content)
        print (score_real)

    driver.close()

if __name__ == '__main__':
    detail_url = 'https://shop.nordstrom.com/s/estee-lauder-double-wear-stay-in-place-liquid-makeup/3383085?origin=keywordsearch-personalizedsort&breadcrumb=Home/All%20Results&color=3c3%20sandbar'
    # getProductInfo('lipstick')
    getProductReview(detail_url)

