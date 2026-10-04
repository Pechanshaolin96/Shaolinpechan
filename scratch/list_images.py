import os, glob

files = glob.glob('imagenes/**/*', recursive=True)
for f in sorted(files):
    if os.path.isfile(f):
        print(f.replace('\\', '/'))
