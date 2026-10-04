import re

masters_data = [
    {
        "id": "master-0",
        "index": "01",
        "name": "Venerable Dai Shifu Shì Sùxǐ Zhang Lao",
        "chinese": "释素喜长老",
        "dates": "1924–2006",
        "generation": "30° Generación de Monjes Shaolin",
        "role": "Raíz Ancestral • Abad Espiritual de Songshan",
        "photo": "imagenes/m_Dai-Shifu-Suxi-12.jpg",
        "short_name": "Shi Suxi",
        "tier": "30ª Gen",
        "badge_color": "bg-amber-100 text-ochre-deep border-amber-300",
        "desc": "Perteneciente a la 30° generación de monjes Shaolin. Fue líder espiritual del Templo y contribuyó a preservar la verdadera esencia de la cultura tradicional de Shaolin en el nuevo milenio, ya que fue uno de los últimos monjes en recibir enseñanzas directas de los maestros del siglo XIX. Enseñó a la mayoría de los monjes de la generación «De» y «Xing» del Templo Shaolin.",
        "points": [
            "Líder espiritual y abad del Templo Shaolin del Monte Songshan.",
            "Formador directo de los monjes de la generación «De» y «Xing».",
            "Custodio histórico que salvaguardó las artes tradicionales durante el siglo XX."
        ],
        "lineage": "Monte Songshan (Dengfeng, Henan) ➔ 30ª Generación Canónica",
        "cta": None
    },
    {
        "id": "master-1",
        "index": "02",
        "name": "Da Shifu Shi De Yang",
        "chinese": "释德扬",
        "dates": "Monje de Songshan",
        "generation": "31° Generación de Monjes Shaolin",
        "role": "Transmisión Monacal • Discípulo de Shi Suxi",
        "photo": "imagenes/m_Da-Shifu-De-Yang-3.jpg",
        "short_name": "Shi De Yang",
        "tier": "31ª Gen",
        "badge_color": "bg-amber-100 text-ochre-deep border-amber-300",
        "desc": "Discípulo directo del venerable Gran Maestro Shi Suxi. Perteneciente a la 31° generación de monjes Shaolin. Mantiene su residencia en el Templo y viaja por el mundo transmitiendo la tradición de la Cultura Shaolin. Es considerado el más grande representante de los tesoros de la Cultura Shaolin en la actualidad: Budismo Chan, Shaolin Kung Fu, Shaolin Qi Gong, y el arte de la caligrafía.",
        "points": [
            "Discípulo formal directo del Gran Maestro Shi Suxi Zhang Lao.",
            "Máximo guardián y divulgador canónico de la triple joya: Chan, Wu y Yi.",
            "Transmisor oficial del linaje monacal hacia Sudamérica y Argentina."
        ],
        "lineage": "Shi Suxi (30ª Gen) ➔ Shi De Yang (31ª Generación)",
        "cta": None
    },
    {
        "id": "master-2",
        "index": "03",
        "name": "Shifu Shi Xing Wu (Daniel Vera)",
        "chinese": "释行午",
        "dates": "Director General",
        "generation": "32º Generación de Shaolin • Director General",
        "role": "Dirección Shaolin Argentina • Discípulo de Shi De Yang",
        "photo": "imagenes/m_Daniel-Vera-Shi-Xing-Wu-9.jpg",
        "short_name": "Daniel Vera",
        "tier": "32ª Gen",
        "badge_color": "bg-primary/10 text-primary border-primary/30",
        "desc": "Discípulo formal del Gran Maestro Shi De Yang y perteneciente a la 32º generación de Shaolin. Director fundador de la Escuela Shaolin Quan Fa Guan Argentina y pionero en la divulgación de las artes tradicionales de Songshan en Sudamérica.",
        "points": [
            "Discípulo formal del Gran Maestro Shi De Yang (32º generación).",
            "Director General de la Escuela Shaolin Quan Fa Guan Argentina.",
            "Maestro de Kung Fu (5° duan), Tai Chi y Yoga.",
            "Presidente de la Asociación Internacional SHAOLIN CHAN en Sudamérica (www.shaolinchan.org).",
            "Presidente de la Federación Argentina de Shaolin Chan y Wushu."
        ],
        "lineage": "Shi De Yang (31ª Gen) ➔ Daniel Vera (32ª Generación)",
        "cta": {"text": "Visitar Escuela Matriz (shaolin.ar)", "url": "https://www.shaolin.ar", "icon": "open_in_new"}
    },
    {
        "id": "master-3",
        "index": "04",
        "name": "Shifu Shi Xing Gong (Yamila Melillo)",
        "chinese": "释行宮",
        "dates": "Codirectora General",
        "generation": "32º Generación de Shaolin • Codirectora",
        "role": "Dirección Shaolin Argentina • Discípula de Shi De Yang",
        "photo": "imagenes/m_Shi-Xing-Gong-9.jpg",
        "short_name": "Yamila Melillo",
        "tier": "32ª Gen",
        "badge_color": "bg-primary/10 text-primary border-primary/30",
        "desc": "Discípula formal del Gran Maestro Shi De Yang y perteneciente a la 32º generación de Shaolin. Codirectora de la escuela matriz, líder pedagógica del programa de Kung Fu Infantil y Maestra de Reiki Usui Ryoho.",
        "points": [
            "Discípula formal del Gran Maestro Shi De Yang (32º generación).",
            "Codirectora de la Escuela Shaolin Quan Fa Guan Argentina.",
            "Instructora y directora pedagógica en la Escuela de Kung Fu Chicos.",
            "Instructora de Kung Fu (5° duan), Yoga y Maestra ReiKi (7° generación Usui).",
            "Secretaria General de la Asociación Internacional SHAOLIN CHAN en Sudamérica."
        ],
        "lineage": "Shi De Yang (31ª Gen) ➔ Yamila Melillo (32ª Generación)",
        "cta": None
    },
    {
        "id": "master-4",
        "index": "05",
        "name": "Jiao Lian Shi Hing Miguel López Márquez",
        "chinese": "3° Duan Dengfeng",
        "dates": "Director Sede Akarma",
        "generation": "Discípulo Instructor (Jiao Lian) • 3° Duan",
        "role": "Rama Instructores • Sede Akarma (Caballito)",
        "photo": "imagenes/m_Jiao-Lian-Miguel-Lopez-3.jpg",
        "short_name": "Miguel López",
        "tier": "Akarma",
        "badge_color": "bg-amber-100 text-ochre-deep border-amber-300",
        "desc": "Graduado como Laoshi en 2008 y como Faja Negra (Jiao Lian) en 2010. Director de Akarma, sede oficial de la Escuela Shaolin Argentina en el barrio de Caballito.",
        "points": [
            "Graduado a Laoshi en 2008 y a Faja Negra (Jiao Lian) en 2010.",
            "Certificado en China como 3°Duan por Dengfeng Shaolin Wushu Association of China.",
            "Director de Akarma, sede de la Escuela Shaolin Argentina en Caballito."
        ],
        "lineage": "Daniel Vera (32ª Gen) ➔ Miguel López (Akarma)",
        "cta": {"text": "Sede Akarma (akarma.com.ar)", "url": "https://www.akarma.com.ar", "icon": "open_in_new"}
    },
    {
        "id": "master-5",
        "index": "06",
        "name": "Jiao Lian Carlos Vighi",
        "chinese": "2° Duan Dengfeng",
        "dates": "Director Sede Patio Sur",
        "generation": "Discípulo Instructor (Jiao Lian) • 2° Duan",
        "role": "Rama Instructores • Sede Patio Sur (Valentín Alsina)",
        "photo": "imagenes/m_Jiao-Lian-Carlos-Vighi-8.jpg",
        "short_name": "Carlos Vighi",
        "tier": "Patio Sur",
        "badge_color": "bg-amber-100 text-ochre-deep border-amber-300",
        "desc": "Graduado a Laoshi en 2012 y a Faja Negra en 2014. Director de Patio Sur, sede oficial de la Escuela Shaolin Argentina en Valentín Alsina.",
        "points": [
            "Graduado a Laoshi en 2012 y a Faja Negra en 2014.",
            "Certificado en China como 2°Duan por Dengfeng Shaolin Wushu Association of China.",
            "Director de Patio Sur, sede oficial de la Escuela Shaolin Argentina en Valentín Alsina."
        ],
        "lineage": "Daniel Vera (32ª Gen) ➔ Carlos Vighi (Patio Sur)",
        "cta": {"text": "Sede Patio Sur (patiosur.com.ar)", "url": "https://www.patiosur.com.ar/", "icon": "open_in_new"}
    },
    {
        "id": "master-6",
        "index": "07",
        "name": "Jiao Lian Javier Cuberos",
        "chinese": "2° Duan Dengfeng",
        "dates": "Director Sede Yang Tai",
        "generation": "Discípulo Instructor (Jiao Lian) • 2° Duan",
        "role": "Rama Instructores • Sede Yang Tai (CABA)",
        "photo": "imagenes/m_Jiao-Lian-Javier-Cuberos-2.jpg",
        "short_name": "Javier Cuberos",
        "tier": "Yang Tai",
        "badge_color": "bg-amber-100 text-ochre-deep border-amber-300",
        "desc": "Graduado a Laoshi en 2012 y a Faja Negra en 2014. Director de Yang Tai, sede de la Escuela Shaolin Argentina, y profesor titular del taller de Caligrafía China.",
        "points": [
            "Graduado a Laoshi en 2012 y a Faja Negra en 2014.",
            "Certificado en China como 2°Duan por Dengfeng Shaolin Wushu Association of China.",
            "Director de Espacio Yang Tai y docente de Caligrafía Tradicional China."
        ],
        "lineage": "Daniel Vera (32ª Gen) ➔ Javier Cuberos (Yang Tai)",
        "cta": {"text": "Sede Yang Tai (espacioyangtai.com)", "url": "https://espacioyangtai.com/", "icon": "open_in_new"}
    },
    {
        "id": "master-7",
        "index": "08",
        "name": "Jiaolian Pablo Encinas",
        "chinese": "少林百禅",
        "dates": "Instructor Sede Pechan • Cinturón Negro 2026",
        "generation": "Instructor Sede Pechan • Terapeuta MTC",
        "role": "Rama Instructores • Sede Pechan (Parque Los Andes, Chacarita)",
        "photo": "imagenes/Pablo_Encinas.jpg",
        "short_name": "Pablo Encinas",
        "tier": "Pechan",
        "badge_color": "bg-primary text-white border-primary",
        "desc": "Discípulo del Maestro Daniel Vera (Shi Xing Wu). Instructor a cargo de la Sede Pechan, impartiendo Shaolin Kung Fu y Chen Taijiquan tradicional en el Mástil del Parque Los Andes (Chacarita). Formado formalmente como Terapeuta en Medicina Tradicional China (MTC) articulando biomecánica marcial y preservación de la salud.",
        "points": [
            "Discípulo del Maestro Daniel Vera (Shi Xing Wu, 32ª generación).",
            "Instructor de Shaolin Kung Fu y Chen Taijiquan tradicional.",
            "Terapeuta formal de Medicina Tradicional China: Acupuntura, moxibustión, ventosas y fitoterapia.",
            "Recibe su graduación y cinturón negro en el año 2026.",
            "Instructor a cargo de Pechan, sede barrial oficial en Chacarita (entrenamientos al aire libre en Parque Los Andes)."
        ],
        "lineage": "Shi Suxi (30ª) ➔ Shi De Yang (31ª) ➔ Daniel Vera (32ª) ➔ Pablo Encinas (Pechan)",
        "cta": {"text": "Ver Clases & Horarios en Pechan", "url": "clases.html", "icon": "schedule"},
        "cta_wa": {"text": "Consultar por WhatsApp", "url": "https://wa.me/541150629554?text=Hola%20Pablo,%20quisiera%20consultar%20por%20las%20clases%20en%20Parque%20Los%20Andes", "icon": "chat"}
    }
]

print(f"Total masters defined: {len(masters_data)}")
