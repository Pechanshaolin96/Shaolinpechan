with open('galeria.html', encoding='utf-8') as f:
    txt = f.read()

import re
matches = re.finditer(r'<section([^>]*)>', txt)
for m in matches:
    pos = m.end()
    snippet = txt[pos:pos+1500]
    h = re.search(r'<h[1-4][^>]*>(.*?)</h[1-4]>', snippet, re.DOTALL)
    htxt = re.sub(r'<[^>]+>', '', h.group(1)).strip() if h else 'No heading'
    print(f"section: {htxt[:60]}")
