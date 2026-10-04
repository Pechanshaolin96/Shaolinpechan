import re

file_path = r"c:\Users\pablo\Documents\Web Shaolin pechan\kung-fu.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to extract PLANIFICACIÓN SEMANAL OFICIAL section and BANNER INFERIOR section
pattern = r"(\s*<!-- PLANIFICACIÓN SEMANAL OFICIAL \(HORARIOS & CLASES\) -->.*?</section>\s*<!-- BANNER INFERIOR -->.*?</section>)"

match = re.search(pattern, content, re.DOTALL)
if not match:
    print("ERROR: Section not found")
else:
    section_to_move = match.group(1)
    print("Found section to move, length:", len(section_to_move))
    
    # Remove the section from its original location
    content_without_section = content.replace(section_to_move, "")
    
    # Target insertion point: right after Metodología section
    metodologia_end_pattern = r"(<!-- METODOLOGÍA DE ENTRENAMIENTO: ARQUITECTURA TÉCNICA -->.*?</section>)"
    
    def insert_after_metodologia(m):
        return m.group(1) + "\n" + section_to_move

    new_content, count = re.subn(metodologia_end_pattern, insert_after_metodologia, content_without_section, count=1, flags=re.DOTALL)
    
    if count == 1:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("SUCCESSFULLY MOVED SECTION!")
    else:
        print("ERROR: Metodología section not found for insertion")
