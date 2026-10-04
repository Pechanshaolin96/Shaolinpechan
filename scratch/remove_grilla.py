import re

file_path = r"c:\Users\pablo\Documents\Web Shaolin pechan\kung-fu.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pattern = r"(\s*<!-- HORARIOS SEMANALES -->.*?</section>)"

match = re.search(pattern, content, re.DOTALL)
if not match:
    print("ERROR: Section HORARIOS SEMANALES not found")
else:
    print("Found HORARIOS SEMANALES section, length:", len(match.group(1)))
    new_content = content[:match.start()] + "\n\n" + content[match.end():]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("SUCCESSFULLY REMOVED SECTION!")
