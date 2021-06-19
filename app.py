from flask import Flask, render_template, request, redirect,jsonify, url_for,send_from_directory
import numpy as np
import cv2
import io
import requests
import easyocr


app = Flask(__name__)

# Route for the index page
@app.route("/")
def test():
    return render_template('index.html')

# Route for posting an image
@app.route('/', methods=['POST'])
def upload_file():

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36', "Upgrade-Insecure-Requests": "1","DNT": "1","Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language": "en-US,en;q=0.5","Accept-Encoding": "gzip, deflate"}

# Acquiring the image and changing it to numpay array
    photo = request.files['u_img']
    in_memory_file = io.BytesIO()
    photo.save(in_memory_file)
    data = np.fromstring(in_memory_file.getvalue(), dtype=np.uint8)
    color_image_flag = 1
    img = cv2.imdecode(data, color_image_flag)
    custom_config = r'--oem 3 --psm 6'
# Acquiring the information about the book using ocr
    reader = easyocr.Reader(['en']) # need to run only once to load model into memory
    results = reader.readtext(img)
    result = ""
    for i in results:
        if i[2] > 0.5:
            result += i[1] + "+"
# Search for information about the book using google api
    data = requests.get("https://www.googleapis.com/books/v1/volumes?q="+result).json()
    if 'items' not in data:
        return render_template('Error.html')
    data = data['items']
    current_data = {}
    author_image_link = ""
    for i in data:
        current_data = dict(i)
        # Obtain the authors name and search for their photo using open library api
        author_name_formatted = (i['volumeInfo']['authors'][0]).replace(" ","+")
        author_key = requests.get("http://openlibrary.org/search.json?author="+author_name_formatted).json()['docs']
        if len(author_key) == 0:
            continue
        author_key = author_key[0]['author_key'][0]
        author_image_link = "http://covers.openlibrary.org/a/olid/"+ author_key +"-L.jpg"
        # Convert the image from a link to data
        res = requests.get(author_image_link,headers=headers)
        image_bytes = io.BytesIO(res.content)
        image = np.fromstring(image_bytes.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        image = cv2.imdecode(image, color_image_flag)
        # Returns a default image if there's no image for the author
        if(image is None):
                author_image_link = "https://www.pngjoy.com/pngm/183/3626713_vin-diesel-unknown-face-png-png-download.png"  
        break
    # Search for books with the same category using google api
    categories_data = requests.get("https://www.googleapis.com/books/v1/volumes?q=subject:"+current_data['volumeInfo']['categories'][0]).json()
    if 'items' not in categories_data:
        categories_data = requests.get("https://www.googleapis.com/books/v1/volumes?q=subject:fantasy").json()
    categories_data=categories_data['items']
    suggested_authors_images = []
    counter = 0
    other_books = []
    for suggested_book in categories_data:
        if 'authors' not in suggested_book['volumeInfo']:
            continue
        # Obtain the authors name and search for their photo using open library api
        suggested_author = (suggested_book['volumeInfo']['authors'][0]).replace((" "),"+")
        author_key = requests.get("http://openlibrary.org/search.json?author="+suggested_author).json()['docs']
        if len(author_key) == 0:
            continue
        author_key = author_key[0]['author_key'][0]
        suggested_author_image = "http://covers.openlibrary.org/a/olid/"+ author_key +"-L.jpg"
        # Convert the image from a link to data
        res = requests.get(suggested_author_image,headers=headers)
        image_bytes = io.BytesIO(res.content)
        image = np.fromstring(image_bytes.getvalue(), dtype=np.uint8)
        color_image_flag = 1
        image = cv2.imdecode(image, color_image_flag)
        counter += 1
        # Returns a default image if there's no image for the author
        if(image is None):
            suggested_author_image = "https://www.pngjoy.com/pngm/183/3626713_vin-diesel-unknown-face-png-png-download.png"      
        suggested_authors_images.append(suggested_author_image)
        other_books.append(suggested_book)
        if counter == 4:
            break
    
    # If the number of book is less than 4 return duplicated data
    while counter < 4 :
        other_books[counter].append(other_books[0])
        counter += 1
    
    # Search for other books written by the author using their name
    other_books_from_the_author = requests.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+author_name_formatted).json()
    if 'items' not in other_books_from_the_author:
        other_books_from_the_author = requests.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:Stephen+King").json()
    other_books_from_the_author=other_books_from_the_author['items']
    other_books_list = []
    for book in other_books_from_the_author:
        if 'categories' not in book['volumeInfo']:
            continue
        other_books_list.append(book)
    
    other_books_from_the_author = other_books_list[0:4]
    
    # Returns all the data to the interface
    return render_template('book_info.html', data = current_data, author_image_link=author_image_link, categories_data = other_books,other_books_from_the_author=other_books_from_the_author,suggested_authors_images=suggested_authors_images)
if __name__ == "__main__":
    app.run(debug=True)