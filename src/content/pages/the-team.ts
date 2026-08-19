import type { Locale } from '../../i18n/ui';

/**
 * The Team page copy.
 *
 * `en` is verbatim from originresidences.com, EXCEPT the page head — `eyebrow`,
 * `title` and `lede` were supplied by the owner in August 2026 when this page
 * moved from a photographic band onto `.page-head`. `es` and `pt-br` are
 * AI-authored and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * Firm names, outbound links and portraits are locale-independent and stay in
 * the page component; partners are matched to them by `id`. The order of this
 * array is the order the rows render in, so it must match across locales.
 */
export interface TeamCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  /** Standfirst under the rule in the page head. Owner-supplied. */
  lede: string;
  visitWebsite: string;
  newTabNote: string;
  partners: { id: string; role: string; body: string; alt: string }[];
}

export const teamCopy: Record<Locale, TeamCopy> = {
  en: {
    metaTitle: 'The Team | Origin Residences',
    metaDescription:
      'The partners behind Origin Residences: VDA, Revuelta Architecture International, Artefacto, Carla Guilhem Design and Cervera.',
    eyebrow: 'The Team',
    title: 'A Proven Track Record on all Fronts.',
    lede:
      'With decades of sustainable Engineering in South America, and award-winning Architecture in the U.S., our leadership team unites visionary developers, master architects, and seasoned industry experts to bring you the U.S.\'s first Artefacto-branded Residencial Project.',
    visitWebsite: 'Visit website',
    newTabNote: '(opens in a new tab)',
    partners: [
      {
        id: 'vda',
        role: 'Developed by',
        alt: 'VDA — black-and-white portrait of two men in dark jackets standing in an office corridor.',
        body:
          'What began as a boutique project, with only 21 apartments in the commune of Ñuñoa, Santiago de Chile, would become the starting point of a successful career marked by innovation and a visionary spirit that, to this day, promotes each one of the ideas and projects of VDA. With more than 22 years of experience in the real estate market in Chile, VDA has been building its history on the solid foundation of excellence throughout the country. The key to its success lies in constant and rapid learning, the ability to adapt and stay ahead of its competition and always maintain the highest quality standard in each product it launches on the market.',
      },
      {
        id: 'revuelta',
        role: 'Architecture by',
        alt: 'Revuelta Architecture International — black-and-white portrait of a man in a suit seated at a desk beside an architectural model.',
        body:
          'Designed by renowned architectural firm, Revuelta Architecture International. Revuelta Architecture International was founded with a commitment to provide our clients with quality designs balanced with sustainable and economically feasible solutions, delivered within stringent time schedules. This philosophy, over the past two decades, has been the cornerstone of the success of many of our projects. We have partnered with top local and national developers in the design and creation of some of South Florida’s leading landmark residential, commercial, hospitality, automobile dealerships and mixed-use projects.',
      },
      {
        id: 'artefacto',
        role: 'Interiors by',
        alt: 'Artefacto — black-and-white portrait of four men dressed in black against a dark backdrop.',
        body:
          'The Artefacto aesthetic is highly coveted by renowned architects and designers. Each of their pieces is crafted with utmost care and attention to detail, striving to create a bond between the home and its inhabitants. You can find luxurious yet warm textures and furnishings that feature a monochrome palette of neutral hues. One statement piece can draw together an entire room. To experience Artefacto for yourself, visit an Artefacto showroom in Aventura, Coral Gables or Doral.',
      },
      {
        id: 'carla-guilhem',
        role: 'Design by',
        alt: 'Carla Guilhem Design — black-and-white portrait of a woman looking away from camera in front of a panelled wall.',
        body:
          'Carla Guilhem Design is a creative interior design studio based in Miami with over a decade of experience in high-end projects. Led by creative director Carla Guilhem, who taps into her Brazilian heritage and academic studies at the Instituto Europeo di Design in Madrid, Spain, the studio has built a global reputation for creating uniquely creative, beautiful and yet functional spaces that reflect the unique needs and desires of its highly demanding clients. Carla’s keen eye for detail and her ability to create highly bespoke spaces made her a sought-after designer for superyachts.',
      },
      {
        id: 'cervera',
        role: 'Exclusive sales by',
        alt: 'Cervera — black-and-white portrait of a woman and a man standing beside a window.',
        body:
          'A South Florida-based, family owned and operated real estate company responsible for exclusively representing and selling over 115 of South Florida’s most prestigious condominiums, the most among any brokerage firm in South Florida. Backed by over 50 years of market expertise, Cervera has deep roots in the local community, and an international broker and buyer network built on five decades of trust. With a far reaching and unrivaled international network and decades on the ground, Cervera has cultivated unique and long-lasting relationships with developers, architects, investors, and real estate firms that are crucial to the success of their clients and partners.',
      },
    ],
  },

  es: {
    metaTitle: 'El equipo | Origin Residences',
    metaDescription:
      'Los socios detrás de Origin Residences: VDA, Revuelta Architecture International, Artefacto, Carla Guilhem Design y Cervera.',
    eyebrow: 'El equipo',
    title: 'Una trayectoria de desarrollo probada en todos los frentes.',
    lede:
      'Con décadas de ingeniería sostenible en América del Sur y arquitectura galardonada en los EE. UU., nuestro equipo directivo une a desarrolladores visionarios, arquitectos maestros y expertos consolidados de la industria para ofrecerles el primer proyecto residencial de la marca Artefacto en los Estados Unidos.',
    visitWebsite: 'Visitar sitio web',
    newTabNote: '(se abre en una pestaña nueva)',
    partners: [
      {
        id: 'vda',
        role: 'Desarrollado por',
        alt: 'VDA — retrato en blanco y negro de dos hombres con sacos oscuros de pie en el pasillo de una oficina.',
        body:
          'Lo que comenzó como un proyecto boutique, con apenas 21 departamentos en la comuna de Ñuñoa, Santiago de Chile, sería el punto de partida de una trayectoria exitosa, marcada por la innovación y un espíritu visionario que, hasta hoy, impulsa cada una de las ideas y los proyectos de VDA. Con más de 22 años de experiencia en el mercado inmobiliario de Chile, VDA ha construido su historia sobre la base sólida de la excelencia en todo el país. La clave de su éxito reside en un aprendizaje constante y veloz, en la capacidad de adaptarse y anticiparse a la competencia y en mantener siempre el más alto estándar de calidad en cada producto que lanza al mercado.',
      },
      {
        id: 'revuelta',
        role: 'Arquitectura por',
        alt: 'Revuelta Architecture International — retrato en blanco y negro de un hombre de traje sentado a un escritorio junto a una maqueta arquitectónica.',
        body:
          'Diseñado por la reconocida firma de arquitectura Revuelta Architecture International. Revuelta Architecture International fue fundada con el compromiso de ofrecer a nuestros clientes diseños de calidad, equilibrados con soluciones sostenibles y económicamente viables, entregadas dentro de plazos exigentes. Durante las últimas dos décadas, esta filosofía ha sido la piedra angular del éxito de muchos de nuestros proyectos. Hemos colaborado con los principales desarrolladores locales y nacionales en el diseño y la creación de algunos de los proyectos más emblemáticos del sur de Florida en los ámbitos residencial, comercial, hotelero, de concesionarios de automóviles y de uso mixto.',
      },
      {
        id: 'artefacto',
        role: 'Interiores por',
        alt: 'Artefacto — retrato en blanco y negro de cuatro hombres vestidos de negro sobre un fondo oscuro.',
        body:
          'La estética de Artefacto es muy codiciada por arquitectos y diseñadores de renombre. Cada una de sus piezas se elabora con el mayor cuidado y atención al detalle, buscando crear un vínculo entre el hogar y quienes lo habitan. Encontrará texturas y mobiliario lujosos y a la vez cálidos, con una paleta monocromática de tonos neutros. Una sola pieza protagonista puede dar unidad a toda una sala. Para conocer Artefacto en persona, visite un showroom de Artefacto en Aventura, Coral Gables o Doral.',
      },
      {
        id: 'carla-guilhem',
        role: 'Diseño por',
        alt: 'Carla Guilhem Design — retrato en blanco y negro de una mujer que mira fuera de cámara ante una pared con paneles.',
        body:
          'Carla Guilhem Design es un estudio creativo de diseño de interiores con sede en Miami y más de una década de experiencia en proyectos de alta gama. Dirigido por la directora creativa Carla Guilhem, quien recurre a su herencia brasileña y a su formación académica en el Instituto Europeo di Design de Madrid, España, el estudio ha construido una reputación global por crear espacios singularmente creativos, bellos y a la vez funcionales, que reflejan las necesidades y los deseos particulares de sus clientes más exigentes. Su agudo ojo para el detalle y su capacidad para crear espacios altamente personalizados la convirtieron en una diseñadora muy solicitada para superyates.',
      },
      {
        id: 'cervera',
        role: 'Ventas exclusivas por',
        alt: 'Cervera — retrato en blanco y negro de una mujer y un hombre de pie junto a una ventana.',
        body:
          'Una empresa inmobiliaria con sede en el sur de Florida, de propiedad y gestión familiar, responsable de representar y comercializar en exclusiva más de 115 de los condominios más prestigiosos del sur de Florida, la mayor cantidad entre todas las corredoras de la región. Respaldada por más de 50 años de experiencia en el mercado, Cervera tiene raíces profundas en la comunidad local y una red internacional de corredores y compradores construida sobre cinco décadas de confianza. Con una red internacional de alcance incomparable y décadas de trabajo en el terreno, Cervera ha cultivado relaciones únicas y duraderas con desarrolladores, arquitectos, inversionistas y firmas inmobiliarias, decisivas para el éxito de sus clientes y socios.',
      },
    ],
  },

  'pt-br': {
    metaTitle: 'A equipe | Origin Residences',
    metaDescription:
      'Os parceiros por trás do Origin Residences: VDA, Revuelta Architecture International, Artefacto, Carla Guilhem Design e Cervera.',
    eyebrow: 'A equipe',
    title: 'Um histórico comprovado de incorporação em todas as frentes.',
    lede:
      'Com décadas de engenharia sustentável na América do Sul e arquitetura premiada nos EUA, nossa equipe de liderança une desenvolvedores visionários, arquitetos mestres e especialistas experientes do setor para trazer a você o primeiro projeto residencial com a marca Artefacto dos EUA.',
    visitWebsite: 'Visitar site',
    newTabNote: '(abre em uma nova aba)',
    partners: [
      {
        id: 'vda',
        role: 'Incorporado por',
        alt: 'VDA — retrato em preto e branco de dois homens de paletó escuro em pé no corredor de um escritório.',
        body:
          'O que começou como um projeto boutique, com apenas 21 apartamentos na comuna de Ñuñoa, em Santiago do Chile, tornou-se o ponto de partida de uma trajetória bem-sucedida, marcada pela inovação e por um espírito visionário que, até hoje, impulsiona cada uma das ideias e dos projetos da VDA. Com mais de 22 anos de experiência no mercado imobiliário do Chile, a VDA construiu sua história sobre o alicerce sólido da excelência em todo o país. A chave de seu sucesso está no aprendizado constante e rápido, na capacidade de se adaptar e de se antecipar à concorrência e em manter sempre o mais alto padrão de qualidade em cada produto que lança no mercado.',
      },
      {
        id: 'revuelta',
        role: 'Arquitetura por',
        alt: 'Revuelta Architecture International — retrato em preto e branco de um homem de terno sentado a uma mesa ao lado de uma maquete arquitetônica.',
        body:
          'Projetado pelo renomado escritório de arquitetura Revuelta Architecture International. A Revuelta Architecture International foi fundada com o compromisso de oferecer aos nossos clientes projetos de qualidade, equilibrados com soluções sustentáveis e economicamente viáveis, entregues dentro de prazos rigorosos. Ao longo das duas últimas décadas, essa filosofia tem sido a pedra angular do sucesso de muitos de nossos projetos. Trabalhamos em parceria com os principais incorporadores locais e nacionais na concepção e na criação de alguns dos mais emblemáticos empreendimentos residenciais, comerciais, de hotelaria, de concessionárias de automóveis e de uso misto do sul da Flórida.',
      },
      {
        id: 'artefacto',
        role: 'Interiores por',
        alt: 'Artefacto — retrato em preto e branco de quatro homens vestidos de preto sobre um fundo escuro.',
        body:
          'A estética da Artefacto é muito desejada por arquitetos e designers renomados. Cada peça é produzida com o máximo cuidado e atenção aos detalhes, buscando criar um vínculo entre a casa e quem nela vive. Você encontra texturas e mobiliário luxuosos e, ao mesmo tempo, acolhedores, com uma paleta monocromática de tons neutros. Uma única peça protagonista pode dar unidade a um ambiente inteiro. Para conhecer a Artefacto pessoalmente, visite um showroom da Artefacto em Aventura, Coral Gables ou Doral.',
      },
      {
        id: 'carla-guilhem',
        role: 'Design por',
        alt: 'Carla Guilhem Design — retrato em preto e branco de uma mulher olhando para fora do quadro diante de uma parede revestida com painéis.',
        body:
          'A Carla Guilhem Design é um estúdio criativo de design de interiores sediado em Miami, com mais de uma década de experiência em projetos de alto padrão. Liderado pela diretora criativa Carla Guilhem, que recorre à sua origem brasileira e à sua formação acadêmica no Instituto Europeo di Design, em Madri, na Espanha, o estúdio construiu reputação global ao criar espaços singularmente criativos, belos e, ao mesmo tempo, funcionais, que refletem as necessidades e os desejos particulares de seus clientes mais exigentes. Seu olhar apurado para os detalhes e sua capacidade de criar espaços sob medida tornaram-na uma designer muito procurada para superiates.',
      },
      {
        id: 'cervera',
        role: 'Vendas exclusivas por',
        alt: 'Cervera — retrato em preto e branco de uma mulher e um homem em pé ao lado de uma janela.',
        body:
          'Uma empresa imobiliária sediada no sul da Flórida, de propriedade e gestão familiar, responsável por representar e comercializar com exclusividade mais de 115 dos condomínios mais prestigiados do sul da Flórida, o maior número entre todas as imobiliárias da região. Respaldada por mais de 50 anos de experiência de mercado, a Cervera tem raízes profundas na comunidade local e uma rede internacional de corretores e compradores construída sobre cinco décadas de confiança. Com uma rede internacional de alcance incomparável e décadas de atuação, a Cervera cultivou relações únicas e duradouras com incorporadores, arquitetos, investidores e empresas imobiliárias, decisivas para o sucesso de seus clientes e parceiros.',
      },
    ],
  },
};
