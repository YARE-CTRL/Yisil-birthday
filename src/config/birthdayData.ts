/**
 * ARCHIVO CENTRAL DE CONFIGURACIÓN Y DATOS DE CUMPLEAÑOS (20 AÑOS)
 * 
 * Nombre: Lorena Salazar Velazco
 * Fecha: 8 de Agosto de 2006 (08/08/2006)
 * 
 * NOTA DE DISEÑO: Sin emojis en texto para mantener una estética humana,
 * editorial, elegante y de alta agencia. Uso exclusivo de iconos Lucide.
 */



export interface BirthdayConfig {
  name: string;
  fullName: string;
  nickname: string;
  birthDate: string; // Formato AAAA-MM-DD
  daysLivedApprox: number;
  
  // El significado de su camino (Reemplaza a CosmicDay)
  lifePath: {
    title: string;
    subtitle: string;
    zodiac: {
      sign: string;
      description: string;
    };
    numerology: {
      number: string;
      description: string;
    };
    responsibilities: string;
    future: string;
  };
  
  // Homenaje a su Abuelita Materna
  grandmotherMemorial: {
    title: string;
    subtitle: string;
    dedication: string;
    letterContent: string[];
    memorialPhotos: string[];
    lanternsCount: number;
    lanternMessages: string[];
  };


  // 20 Razones
  reasons20: string[];

  // Carta Secreta Final
  finalLetter: {
    title: string;
    paragraphs: string[];
    signOff: string;
  };
}

export const birthdayData: BirthdayConfig = {
  name: "Lorena",
  fullName: "Lorena Salazar Velazco",
  nickname: "Lore",
  birthDate: "2006-08-08",
  daysLivedApprox: 7305,

  lifePath: {
    title: "La Fuerza de tu Historia",
    subtitle: "El significado de nacer un 8 de agosto y la valentía de tu camino",
    zodiac: {
      sign: "Leo",
      description: "Regida por el sol. Más allá de la astrología, representas la lealtad inquebrantable, la protección hacia los que amas y el calor de un refugio seguro. Tienes una luz propia que no se apaga ni en las tormentas más fuertes."
    },
    numerology: {
      number: "8 de Agosto",
      description: "El 8 representa el infinito, el equilibrio y el poder interior. Nacer este día marca un destino de superación constante, donde aprendes a transformar las heridas en sabiduría y los obstáculos en escalones."
    },
    responsibilities: "Has asumido responsabilidades enormes a lo largo de tu vida, muchas veces cargando un peso que pocos a tu edad comprenderían. Lo has hecho con una entereza y una madurez que dejan sin palabras a quienes te observan de cerca. Eres un pilar fundamental.",
    future: "A partir de hoy, la vida no te traerá más cargas, sino la cosecha de todo el amor, el esfuerzo y la resiliencia que has sembrado. Es tu momento de brillar, de recibir, y de permitirte ser cuidada por el universo."
  },

  grandmotherMemorial: {
    title: "Una Luz Eterna",
    subtitle: "Un espacio de silencio, amor y respeto profundo en memoria de tu abuelita materna.",
    dedication: "Hay vínculos que ni el tiempo ni la distancia pueden romper. Ella sigue viva en cada paso que das.",
    letterContent: [
      "Las personas que amamos de verdad nunca se van del todo; se transforman en esa fuerza invisible que nos impulsa en los momentos difíciles y en la paz que sentimos cuando hacemos las cosas bien.",
      "Sé que desde allá arriba, tu abuelita te mira con el orgullo más inmenso del universo. Está viendo la mujer tan fuerte, madura e increíble en la que te estás convirtiendo.",
      "Ella nota cómo cuidas a la familia, cómo asumes tus responsabilidades con tanta entereza y cómo sigues adelante a pesar de todo. Su legado de amor está intacto en tu corazón.",
      "Cada vez que sientas que el camino pesa, cierra los ojos. Ella sigue cuidándote, guiándote y abrazándote desde las estrellas.",
      "Con profundo cariño y absoluto respeto."
    ],
    memorialPhotos: [
      "/images/memorial/abuela-1.jpg",
    ],
    lanternsCount: 5,
    lanternMessages: [
      "Un abrazo sincero hasta el cielo",
      "Tu orgullo es mi mayor fuerza",
      "Sé que siempre estás cuidándome",
      "El amor no muere, se transforma en luz",
      "Por siempre en mi corazón, abuelita"
    ]
  },


  reasons20: [
    "1. Tu risa contagiosa que ilumina cualquier día gris.",
    "2. Mujer berraca futura ingeniera, con un sentido de responsabilidad infinito.",
    "3. Carácter fuerte y muchas veces difícil de leer.",
    "4. Decidida ante decisiones difíciles, afrontándolas con criterio y determinación.",
    "5. El brillo inigualable de tus ojos cuando estás realmente feliz.",
    "6. Tu capacidad única de hacer que cualquier momento sencillo sea inolvidable.",
    "7. Terca con dulzura.",
    "8. La lealtad incondicional que brindas a quienes quieres.",
    "9. Tu voz calmada que transmite paz y refugio.",
    "10. Los 20 años de historia, magia y crecimiento que has construido.",
    "11. Peligro bonito XD.",
    "12. Tu nobleza y autenticidad genuina.",
    "13. La forma tan especial que tienes para escuchar y comprender.",
    "14. Tus abrazos cálidos que reconfortan el alma.",
    "15. La dulzura y empatía con la que tratas a las personas que te rodean.",
    "16. Tu determinación para ir detrás de tus metas.",
    "17. Tu sentido del humor y habilidad para hacer reír de la nada.",
    "18. Ser un faro de luz para las personas que tienen la dicha de conocerte.",
    "19. Tu perspectiva tan hermosa para apreciar el mundo.",
    "20. Simplemente por ser Lorena, única, valiosa e irremplazable."
  ],

  finalLetter: {
    title: "Para cuando necesites recordar quién eres",
    paragraphs: [
      "Lore, si estás leyendo esto es porque acabas de apagar veinte velas y el confeti todavía no termina de caer. Pero esta carta no es solo por tu cumpleaños. Es algo que quiero que guardes para después, para esos días en los que el mundo pese más de lo normal y necesites que alguien te recuerde lo extraordinaria que eres.",
      "Sé que no necesitas que nadie te salve. Eres la persona más autosuficiente, terca y decidida que conozco, y eso lo digo con toda la admiración del mundo. Pero incluso las personas más fuertes merecen escuchar esto: no tienes que cargar todo sola. Has cargado responsabilidades que mucha gente a tu edad ni siquiera imagina, y lo has hecho con una entereza que me deja sin palabras cada vez que lo pienso.",
      "Hay algo que nunca te he dicho con todas las letras: conocerte fue de las cosas más indescriptibles que me han pasado. Contigo se puede hablar de todo, literalmente de todo, desde lo más profundo hasta la cosa más absurda del universo. Esa conexión no se encuentra fácil, y aunque hoy nos separen doce horas de distancia y cada uno esté construyendo su propio camino, quiero que sepas que eso no cambia nada de lo que significas para mí.",
      "No voy a pretender que todo fue sencillo. Hubo momentos en los que sentí cosas que iban más allá de lo que cabe en una amistad, pero la vida me enseñó que quererte no significa necesitarte de una sola manera. Decidí quedarme, no por conformismo, sino porque tenerte en mi vida, así como estamos, vale infinitamente más que cualquier otra cosa. Y lo volvería a elegir.",
      "Así que esta carta es mi manera de decirte: cuando el camino se sienta largo, cuando dudes de ti misma, cuando sientas que nadie te entiende — vuelve aquí. Estas palabras no tienen fecha de vencimiento. Hoy, mañana, en cinco años, seguirán siendo igual de ciertas. Eres fuerte, eres valiosa, eres única, y hay alguien a doce horas de distancia que siempre va a estar orgulloso de la mujer en la que te estás convirtiendo.",
      "Felices 20, Lore. Que esta nueva década te traiga todo lo que mereces, que es muchísimo más de lo que te imaginas."
    ],
    signOff: "Siempre, tu negrito."
  }
};
