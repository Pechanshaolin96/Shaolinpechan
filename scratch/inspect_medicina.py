with open('medicina-china.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    l = line.lower()
    if '<section' in l or 'id=' in l or '<img' in l:
        print(f"{i}: {line.strip()[:100]}".encode('ascii', 'replace').decode('ascii'))
