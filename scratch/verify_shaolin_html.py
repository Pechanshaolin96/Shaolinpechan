with open('maestros-shaolin.html', encoding='utf-8') as f:
    txt = f.read()

print('Has arbol-maestros:', 'id="arbol-maestros"' in txt)
print('Has tree-node-master:', 'tree-node-master' in txt)
print('Has master-profile-panel:', 'master-profile-panel' in txt)
print('Has old carousel masters:', 'data-carousel="masters"' in txt)
