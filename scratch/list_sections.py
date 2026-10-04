import re, os, glob

with open('index.html', encoding='utf-8') as f:
    txt = f.read()

# find all sections
matches = re.finditer(r'<section([^>]*)>', txt)
for m in matches:
    attrs = m.group(1)
    id_m = re.search(r'id=["\']([^"\']+)["\']', attrs)
    sid = id_m.group(1) if id_m else 'NO_ID'
    # find next heading after this section
    pos = m.end()
    snippet = txt[pos:pos+1500]
    h = re.search(r'<h[1-4][^>]*>(.*?)</h[1-4]>', snippet, re.DOTALL)
    htxt = re.sub(r'<[^>]+>', '', h.group(1)).strip() if h else 'No heading'
    print(f"id: {sid:25} | heading: {htxt[:60]}")
