import glob, os
from PIL import Image

files = sorted(glob.glob('imagenes/yo/*.*'))
for f in files:
    try:
        im = Image.open(f)
        print(f, im.size, im.format)
    except Exception as e:
        print(f, e)
