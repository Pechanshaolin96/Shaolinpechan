import re

cards_html = """        <!-- 4 Tarjetas Resumen de Disciplinas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <!-- Kung Fu Adultos -->
          <div class="h-full p-5 rounded-xl bg-surface-container-lowest border-2 border-primary/30 flex flex-col justify-between shadow-xs hover:border-primary transition-all">
            <div class="flex flex-col justify-between flex-1">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded">Arte Externo</span>
                  <span class="material-symbols-outlined text-primary text-[20px]">fitness_center</span>
                </div>
                <h3 class="text-base font-bold text-on-surface mb-1 min-h-[1.5rem]">Shaolin Kung Fu (Adultos)</h3>
                <p class="text-xs text-secondary mb-3 leading-relaxed min-h-[2.75rem]">
                  Posturas tradicionales (<em>Bu Fa</em>), acondicionamiento de tendones, formas clásicas (<em>Taolu</em>), bastón (<em>Gun</em>) y combate tradicional.
                </p>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-surface-container text-xs flex-1 flex flex-col justify-start">
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Miércoles:</span>
                  <span class="font-bold text-primary">08:30 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Jueves (Turno Esp.):</span>
                  <span class="font-bold text-primary">10:30 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Viernes:</span>
                  <span class="font-bold text-primary">08:30 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Domingos:</span>
                  <span class="font-bold text-primary">11:00 AM</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-surface-container text-[11px] text-secondary flex items-center gap-1 shrink-0">
              <span class="material-symbols-outlined text-[15px] text-primary">park</span>
              <span>Mástil Parque Los Andes</span>
            </div>
          </div>

          <!-- Kung Fu Infantil -->
          <div class="h-full p-5 rounded-xl bg-surface-container-lowest border-2 border-ochre-border flex flex-col justify-between shadow-xs hover:border-ochre-gold transition-all">
            <div class="flex flex-col justify-between flex-1">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase tracking-wider font-bold text-ochre-deep bg-ochre-gold/15 px-2.5 py-0.5 rounded">Infantil 6+ Años</span>
                  <span class="material-symbols-outlined text-ochre-deep text-[20px]">child_care</span>
                </div>
                <h3 class="text-base font-bold text-on-surface mb-1 min-h-[1.5rem]">Kung Fu Infantil</h3><a id="infantil"></a>
                <p class="text-xs text-secondary mb-3 leading-relaxed min-h-[2.75rem]">
                  Desarrollo psicomotriz, disciplina consciente, juegos pedagógicos tradicionales y respeto ético (<em>Wu De</em>) para niños y jóvenes.
                </p>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-surface-container text-xs flex-1 flex flex-col justify-start">
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Martes:</span>
                  <span class="font-bold text-ochre-deep">16:30 hs</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Edades:</span>
                  <span class="font-bold text-on-surface">A partir de 6 años</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Modalidad:</span>
                  <span class="font-medium text-emerald-700">Espacio acondicionado</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Ubicación:</span>
                  <span class="font-medium text-on-surface">Parque Los Andes</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-surface-container text-[11px] text-secondary flex items-center gap-1 shrink-0">
              <span class="material-symbols-outlined text-[15px] text-primary">park</span>
              <span>Mástil Parque Los Andes</span>
            </div>
          </div>

          <!-- Tai Ji Quan -->
          <div class="h-full p-5 rounded-xl bg-surface-container-lowest border-2 border-secondary/30 flex flex-col justify-between shadow-xs hover:border-secondary transition-all">
            <div class="flex flex-col justify-between flex-1">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase tracking-wider font-bold text-secondary bg-secondary-container px-2.5 py-0.5 rounded">Arte Interno</span>
                  <span class="material-symbols-outlined text-secondary text-[20px]">self_improvement</span>
                </div>
                <h3 class="text-base font-bold text-on-surface mb-1 min-h-[1.5rem]">Chen Taijiquan &amp; Qi Gong</h3>
                <p class="text-xs text-secondary mb-3 leading-relaxed min-h-[2.75rem]">
                  Espirales de seda (<em>Chan Si Gong</em>), forma antigua <em>Laojia Yi Lu</em>, respiración <em>Tu Na</em> y cultivo energético en el Dantian.
                </p>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-surface-container text-xs flex-1 flex flex-col justify-start">
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Lunes:</span>
                  <span class="font-bold text-secondary">08:30 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Jueves:</span>
                  <span class="font-bold text-secondary">08:30 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Domingos:</span>
                  <span class="font-bold text-secondary">11:00 AM</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Modalidad:</span>
                  <span class="font-medium text-emerald-700">Al aire libre</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-surface-container text-[11px] text-secondary flex items-center gap-1 shrink-0">
              <span class="material-symbols-outlined text-[15px] text-primary">park</span>
              <span>Mástil Parque Los Andes</span>
            </div>
          </div>

          <!-- MTC -->
          <div class="h-full p-5 rounded-xl bg-surface-container-lowest border-2 border-ochre-border flex flex-col justify-between shadow-xs hover:border-ochre-gold transition-all">
            <div class="flex flex-col justify-between flex-1">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs uppercase tracking-wider font-bold text-ochre-deep bg-ochre-gold/15 px-2.5 py-0.5 rounded">Medicina China</span>
                  <span class="material-symbols-outlined text-ochre-deep text-[20px]">medical_services</span>
                </div>
                <h3 class="text-base font-bold text-on-surface mb-1 min-h-[1.5rem]">Atención con MTC</h3>
                <p class="text-xs text-secondary mb-3 leading-relaxed min-h-[2.75rem]">
                  Acupuntura tradicional, moxibustión, masaje clínico Tuina, ventosas y fitoterapia. Diagnóstico de pulso y lengua individualizado.
                </p>
              </div>
              <div class="space-y-1.5 pt-2 border-t border-surface-container text-xs flex-1 flex flex-col justify-start">
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Modalidad:</span>
                  <span class="font-bold text-ochre-deep">Individual</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Disponibilidad:</span>
                  <span class="font-bold text-ochre-deep bg-ochre-gold/15 px-2 py-0.5 rounded">Días hábiles</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Reserva:</span>
                  <span class="font-medium text-on-surface">Con turno previo</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-secondary font-medium">Atención:</span>
                  <span class="font-medium text-on-surface">Personalizada</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-3 border-t border-surface-container text-[11px] text-secondary flex items-center gap-1 shrink-0">
              <span class="material-symbols-outlined text-[15px] text-ochre-deep">calendar_today</span>
              <span>Coordinar por WhatsApp</span>
            </div>
          </div>
        </div>"""

f_path = r"c:\Users\pablo\Documents\Web Shaolin pechan\taijiquan.html"
with open(f_path, "r", encoding="utf-8") as fh:
    text = fh.read()

match = re.search(r"<!-- (?:4 Tarjetas Resumen de Disciplinas|Grilla de Tarjetas de Horarios) -->.*?<!-- (?:Atención con MTC|MTC) -->.*?</div>\s*</div>", text, re.DOTALL)
if match:
    new_text = text[:match.start()] + cards_html + text[match.end():]
    with open(f_path, "w", encoding="utf-8") as fh:
        fh.write(new_text)
    print(f"Successfully updated cards in {f_path}")
else:
    print(f"Match still not found in {f_path}")
