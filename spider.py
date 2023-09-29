import requests
from bs4 import BeautifulSoup


url = 'https://scholar.google.com/citations?user=X4dnhQ0AAAAJ&hl=zh-CN'
r = requests.get(url)


with open("tmp.html", "w", encoding="utf-8") as f:
    f.write(r.text)