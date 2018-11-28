from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import requests
import time
import Struct

def getProductInfo(keyword):
    L = []
    url = 'https://www.bloomingdales.com/shop/search?keyword=%s' % keyword 
    response = requests.get(url, headers = { 'User-Agent': "Mozilla/5.0" })
    soup = BeautifulSoup(response.content, 'html.parser')
    print ('url: ' + str(url))
    print ('status code: ' + str(response.status_code))
    print ('encoding: ' + str(response.encoding))

    for product in soup.find_all('div', class_ = 'productThumbnail'):
        # print ("---")
        product_url = 'https://www.bloomingdales.com' + product.find('a', class_ = 'productDescLink')['href']
        # picture_url = product.find('img', class_ = 'thumbnailImage')['src']
        source = product.find('source', class_ = 'thumbnailImage')
        if source.get('srcset') == None:
            picture_url = source['data-srcset']
        else: 
            picture_url = source['srcset']

        if product.find('span', class_ = 'regular') == None: continue
        
        price = product.find('span', class_ = 'regular').text.strip(' \t\n')
        # score = product.find('div', class_ = 'b-pdp-rating').find('div')['style']

        span_lis = product.find('div', class_ = 'productDescription').find_all('span')
        span_num = len(span_lis)
        if span_num == 1:
            brand = span_lis[0].string
            name = span_lis[0].next_sibling.string.strip(' \t\n')
        else:
            brand = span_lis[0].text
            name = span_lis[1].text + ' ' + span_lis[2].text
        
        product = Struct.Product(brand, name, price, product_url, picture_url, "0");
        L.append(product);
        print (product_url)
        print (picture_url)
        print (price)
        # print (score)
        print (brand)
        print (name)

    return L    

def getProductReview(url):
    options = Options()
    options.add_argument('--headless')
    # options.add_argument('--disable-gpu')
    options.add_argument('user-agent=Mozilla/5.0')

    driver = webdriver.Chrome(options=options, executable_path='./chromedriver')
    driver.get(url)               
    driver.execute_script("window.scrollBy(0, (document.body.scrollHeight*0.6));")

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    for review in soup.find_all('div', class_='BVRRContentReview'):
        author = review.find('span', class_='BVRRNickname').text
        date = review.find('span', class_='BVRRReviewDate').text
        title = review.find('span', class_='BVRRReviewTitle').text
        content = review.find('span', class_='BVRRReviewText').text
        score = review.find('span', class_='BVRRRatingNumber').text
        print ("---")
        print (author)
        print (date)
        print (title)
        print (content)
        print (score)

    driver.close()

if __name__ == "__main__":
    getProductInfo('clinique')
    # getProductReview('https://www.bloomingdales.com/shop/product/estee-lauder-double-wear-stay-in-place-liquid-makeup?ID=668196&CategoryID=2921')