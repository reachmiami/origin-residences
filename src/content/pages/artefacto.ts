import type { Locale } from '../../i18n/ui';

/**
 * Artefacto page copy.
 *
 * `en` is verbatim from originresidences.com — this is the brand's one
 * uncopyable claim, so nothing there is paraphrased. The EXCEPTION is the page
 * head: `headline` and `headLede` were supplied by the owner in August 2026
 * when this page moved from a photographic band onto `.page-head`, replacing
 * the incumbent's 'The perfect synergy…' title. They carry two factual claims
 * that are NOT in the scraped copy — three generations since 1976, and first
 * Artefacto-branded project in the United States — both owner-asserted. `es` and `pt-br` are
 * AI-authored and awaiting native review — see TRANSLATION-REVIEW.md. The
 * pt-br reading is written for the Brazilian buyer, who knows ARTEFACTO as a
 * house rather than as a licensed name.
 *
 * Images are locale-independent and stay in the page component; their alt text
 * is matched here by a stable key. Attributions (Paulo Bacchi, Carla Guilhem)
 * are personal names and stay in the page.
 */
export interface ArtefactoCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  /** Standfirst under the rule in the page head. Distinct from `lede`, which
      belongs to the editorial section further down the page. Owner-supplied. */
  headLede: string;
  editorialTitle: string;
  lede: string;
  body: string;
  bacchiQuote: string;
  /** Her role, over her name on the card — the wording the Team page uses. */
  guilhemRole: string;
  guilhemBody: string;
  guilhemQuote: string;
  alt: {
    terrace: string;
    livingRoom: string;
    lobby: string;
    bedroom: string;
    kitchen: string;
    openPlan: string;
  };
}

export const artefactoCopy: Record<Locale, ArtefactoCopy> = {
  en: {
    metaTitle: 'Interiors by Artefacto | Origin Residences',
    metaDescription:
      'The perfect synergy to create innovative and surprising spaces — Origin’s interiors in collaboration with Artefacto and interior designer Carla Guilhem.',
    eyebrow: 'Artefacto',
    headline: 'Crafting Luxury Across Three Generations Since 1976.',
    headLede:
      'For over 50 years, Artefacto has been decoding a lifestyle that is highly regarded amongst the biggest names in architecture and décor. Now, the iconic brand proudly brings their first branded residence to the US, translating decades of visionary design into an extraordinary living experience',
    /* Was missing entirely, so the English page rendered an empty <h2> that
       `aria-labelledby` then pointed at — an unnamed section for a screen
       reader and a silent gap for everyone else. Spanish and Portuguese both
       carried it; only English did not. Wording follows the metaTitle. */
    editorialTitle: 'Interiors by Artefacto',
    lede: 'Designed for the modern family, ORIGIN offers large floor plans with flexible layouts and unit sizes. With floor-to-ceiling windows and expansive water views, the building aesthetics evoke elegance.',
    body: 'ARTEFACTO decodes a lifestyle that is highly regarded amongst the biggest names in architecture and décor. Behind every accessory and piece of furniture is a carefully thought-out concept that aims to establish connections between the home and the owner.',
    bacchiQuote:
      '“It’s an incredible honor and opportunity to design a truly branded lifestyle for VDA Origin Miami and deliver a bespoke condominium experience.”',
    guilhemRole: 'Design by',
    guilhemBody:
      'The setting by the renowned interior designer Carla Guilhem, in collaboration with the firm ARTEFACTO, is one of the main reasons for the great appeal of ORIGIN. Guilhem’s distinctive style, her ability to combine elements and her meticulous eye for detail, is appreciated in every corner of the settings, from common spaces to individual apartments. Guilhem’s decoration becomes a reflection of the good taste and quality that characterize this exceptional residence.',
    guilhemQuote:
      '“Beauty has the power to change our lives. We want to create spaces that are a reflection of the good taste and quality that characterize Origin Residences by Artefacto.”',
    alt: {
      terrace:
        'A furnished Origin terrace with woven lounge chairs, a low round table and planted beds, looking across low-rise rooftops toward the bay.',
      livingRoom:
        'An Origin living room with a curved cream sofa, three amber glass pendants and a large abstract canvas, opening through floor-to-ceiling glass onto a planted balcony.',
      lobby:
        'Origin’s double-height lobby lounge: a sculptural stone planter, low sand-toned sofas on a curved rug and a slatted timber wall lit from behind.',
      bedroom:
        'An Origin bedroom in cream and oak with an upholstered headboard, a dressing table and full-length mirror, and sliding glass to a balcony above the treetops.',
      kitchen:
        'An Origin kitchen and dining area in pale oak and stone, with a round table, an island with counter stools, and glass doors to a balcony above the rooftops.',
      openPlan:
        'An open-plan Origin living and kitchen space with a marble island, a low sectional sofa and sheer curtains drawn back from a planted balcony.',
    },
  },

  es: {
    metaTitle: 'Interiores por Artefacto | Origin Residences',
    metaDescription:
      'La sinergia perfecta para crear espacios innovadores y sorprendentes: los interiores de Origin en colaboración con Artefacto y la diseñadora de interiores Carla Guilhem.',
    eyebrow: 'Artefacto',
    headline: 'Creando lujo a lo largo de tres generaciones desde 1976.',
    headLede:
      'Durante más de 50 años, Artefacto ha estado decodificado un estilo de vida muy apreciado entre los nombres más importantes de la arquitectura y la decoración. Ahora, la marca icónica trae con orgullo su primera residencia de marca a los EE. UU., traduciendo décadas de diseño visionario en una experiencia de vida extraordinaria.',
    editorialTitle: 'Interiores por Artefacto',
    lede: 'Concebido para la familia moderna, ORIGIN ofrece plantas amplias con distribuciones y superficies flexibles. Con ventanales de piso a techo y extensas vistas al agua, la estética del edificio evoca elegancia.',
    body: 'ARTEFACTO descifra un estilo de vida muy valorado entre los grandes nombres de la arquitectura y la decoración. Detrás de cada accesorio y cada pieza de mobiliario hay un concepto cuidadosamente pensado, que busca establecer vínculos entre la casa y quien la habita.',
    bacchiQuote:
      '“Es un honor y una oportunidad extraordinarios diseñar un verdadero estilo de vida de marca para VDA Origin Miami y ofrecer una experiencia de condominio hecha a medida.”',
    guilhemRole: 'Diseño por',
    guilhemBody:
      'La ambientación de la reconocida diseñadora de interiores Carla Guilhem, en colaboración con la firma ARTEFACTO, es una de las principales razones del gran atractivo de ORIGIN. El estilo inconfundible de Guilhem, su capacidad para combinar elementos y su meticulosa atención al detalle se aprecian en cada rincón de los ambientes, desde los espacios comunes hasta cada apartamento. Su decoración se convierte en un reflejo del buen gusto y la calidad que caracterizan a esta residencia excepcional.',
    guilhemQuote:
      '“La belleza tiene el poder de cambiar nuestras vidas. Queremos crear espacios que sean un reflejo del buen gusto y la calidad que caracterizan a Origin Residences by Artefacto.”',
    alt: {
      terrace:
        'Una terraza de Origin amueblada con sillones de fibra tejida, una mesa baja redonda y jardineras, con vista sobre techos de baja altura hacia la bahía.',
      livingRoom:
        'Un salón de Origin con un sofá curvo color crema, tres lámparas colgantes de vidrio ámbar y un gran lienzo abstracto, que se abre mediante ventanales de piso a techo a un balcón con plantas.',
      lobby:
        'El lobby lounge de doble altura de Origin: una jardinera escultórica de piedra, sofás bajos en tonos arena sobre una alfombra curva y una pared de listones de madera iluminada por detrás.',
      bedroom:
        'Un dormitorio de Origin en crema y roble, con cabecero tapizado, tocador y espejo de cuerpo entero, y puertas corredizas de vidrio a un balcón sobre las copas de los árboles.',
      kitchen:
        'Cocina y comedor de Origin en roble claro y piedra, con mesa redonda, isla con banquetas y puertas de vidrio a un balcón sobre los tejados.',
      openPlan:
        'Un espacio de Origin de planta abierta entre sala y cocina, con isla de mármol, sofá seccional bajo y cortinas ligeras recogidas frente a un balcón con plantas.',
    },
  },

  'pt-br': {
    metaTitle: 'Interiores pela Artefacto | Origin Residences',
    metaDescription:
      'A sinergia perfeita para criar espaços inovadores e surpreendentes: os interiores do Origin em parceria com a Artefacto e a designer de interiores Carla Guilhem.',
    eyebrow: 'Artefacto',
    headline: 'Criando luxo ao longo de três gerações desde 1976.',
    headLede:
      'Há mais de 50 anos, a Artefacto decodifica um estilo de vida muito conceituado entre os maiores nomes da arquitetura e da decoração. Agora, a marca icônica traz orgulhosamente sua primeira residência assinada para os EUA, traduzindo décadas de design visionário em uma experiência de vida extraordinária.',
    editorialTitle: 'Interiores pela Artefacto',
    lede: 'Pensado para a família contemporânea, o ORIGIN oferece plantas amplas, com layouts e metragens flexíveis. Com janelas do piso ao teto e vistas generosas para a água, a estética do edifício evoca elegância.',
    body: 'A ARTEFACTO decifra um estilo de vida altamente valorizado entre os maiores nomes da arquitetura e da decoração. Por trás de cada objeto e de cada peça de mobiliário há um conceito cuidadosamente concebido, que busca criar conexões entre a casa e quem nela vive.',
    bacchiQuote:
      '“É uma honra e uma oportunidade incríveis projetar um estilo de vida verdadeiramente autoral para o VDA Origin Miami e entregar uma experiência de condomínio sob medida.”',
    guilhemRole: 'Design por',
    guilhemBody:
      'A ambientação assinada pela renomada designer de interiores Carla Guilhem, em parceria com a ARTEFACTO, é uma das principais razões do enorme apelo do ORIGIN. O estilo inconfundível de Guilhem, sua habilidade para combinar elementos e seu olhar minucioso para os detalhes se revelam em cada canto dos ambientes, dos espaços comuns a cada apartamento. Sua decoração torna-se reflexo do bom gosto e da qualidade que caracterizam esta residência excepcional.',
    guilhemQuote:
      '“A beleza tem o poder de transformar nossas vidas. Queremos criar espaços que sejam reflexo do bom gosto e da qualidade que caracterizam o Origin Residences by Artefacto.”',
    alt: {
      terrace:
        'Um terraço do Origin mobiliado com poltronas de fibra trançada, mesa baixa redonda e canteiros, com vista sobre telhados baixos em direção à baía.',
      livingRoom:
        'Uma sala de estar do Origin com sofá curvo em tom creme, três pendentes de vidro âmbar e uma grande tela abstrata, que se abre por vidros do piso ao teto para uma varanda com plantas.',
      lobby:
        'O lounge do lobby em pé-direito duplo do Origin: um cachepô escultórico de pedra, sofás baixos em tons de areia sobre um tapete curvo e uma parede ripada de madeira iluminada por trás.',
      bedroom:
        'Um quarto do Origin em creme e carvalho, com cabeceira estofada, penteadeira e espelho de corpo inteiro, e portas de vidro de correr para uma varanda acima das copas das árvores.',
      kitchen:
        'Cozinha e sala de jantar do Origin em carvalho claro e pedra, com mesa redonda, ilha com banquetas e portas de vidro para uma varanda acima dos telhados.',
      openPlan:
        'Um ambiente integrado de sala e cozinha do Origin, com ilha de mármore, sofá seccional baixo e cortinas leves recolhidas diante de uma varanda com plantas.',
    },
  },
};
