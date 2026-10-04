import glob
from PIL import Image

files = sorted(glob.glob('imagenes/shaolin-*.jpg'))
for f in files:
    try:
        im = Image.open(f)
        print(f, im.size)
    except Exception as e:
        print(f, e)
