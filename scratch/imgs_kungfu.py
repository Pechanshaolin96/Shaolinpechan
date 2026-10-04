with open('kung-fu.html', encoding='utf-8') as f:
    txt = f.read()

import re
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', txt)
bg_imgs = re.findall(r'url\(["\']?([^"\')]+)["\']?\)', txt)

print("Images in kung-fu.html:")
for img in imgs:
    print("  img:", img)
print("Background images in kung-fu.html:")
for bg in bg_imgs:
    print("  bg:", bg)
