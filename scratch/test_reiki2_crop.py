from PIL import Image

im = Image.open('imagenes/reiki_2.jpg')
print('reiki_2 size:', im.size)

def test_crop(im, w, h, px, py, name):
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    im_r = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - w) * px)
    top = int((nh - h) * py)
    c = im_r.crop((left, top, left + w, top + h))
    c.save(f'scratch/{name}.png')

test_crop(im, 380, 192, 0.5, 0.5, 'reiki2_center')
test_crop(im, 380, 192, 0.5, 0.4, 'reiki2_p40')
print('Crops generated')
