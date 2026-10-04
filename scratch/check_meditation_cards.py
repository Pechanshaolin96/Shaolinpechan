import glob

for f in sorted(glob.glob('*.html')):
    txt = open(f, encoding='utf-8').read()
    if 'actividad-meditacion-chan.jpg' in txt:
        print(f, 'has actividad-meditacion-chan.jpg')
    if 'meditacion-chan.html' in txt and ('<img' in txt or '<article' in txt):
        pass
