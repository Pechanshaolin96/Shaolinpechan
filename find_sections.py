with open("linaje-sedes.html", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, l in enumerate(lines, 1):
    if any(k in l for k in ['id="sedes', 'id="horarios', 'id="maestros', 'id="contacto', 'id="faq']):
        print(f"L{i}: {l.strip()[:100]}")
