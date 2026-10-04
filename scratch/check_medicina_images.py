import glob
from PIL import Image

for f in sorted(glob.glob('imagenes/medicina*.jpg')):
    im = Image.open(f)
    print(f, im.size)
