from PIL import Image
import glob

files = sorted(glob.glob('imagenes/medicina*.jpg'))
# create a grid
w, h = 200, 200
cols = 4
rows = (len(files) + cols - 1) // cols
grid = Image.new('RGB', (cols * w, rows * h), (255, 255, 255))

for i, f in enumerate(files):
    im = Image.open(f)
    im.thumbnail((w, h))
    x = (i % cols) * w + (w - im.width) // 2
    y = (i // cols) * h + (h - im.height) // 2
    grid.paste(im, (x, y))

grid.save('scratch/medicina_grid.png')
print('Saved scratch/medicina_grid.png')
