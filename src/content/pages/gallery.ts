import type { Locale } from '../../i18n/ui';

/**
 * Gallery page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * The lede under the heading is the shared collaboration line and already
 * lives in src/content/copy.ts, so it is not repeated here.
 *
 * `prevImage` / `nextImage` are the GalleryGrid step controls: the ui
 * dictionary only carries the residence wording, so the page supplies these.
 *
 * `photos` carries the caption and the alt text of each frame in the mosaic,
 * in the order they are laid out. The photographs themselves are
 * locale-independent, so they stay as ImageMetadata imports in the component
 * and are matched to the entry below by `id` — the same arrangement
 * floor-plans.astro uses for its key plans. Every `id` is the asset filename
 * stem under src/assets/gallery/, e.g. `lobby-double-height` is
 * src/assets/gallery/lobby-double-height.jpg.
 *
 * Every frame is developer material from the incumbent gallery. They are
 * renderings, and the alt text says so in each language — the building is not
 * yet standing.
 */
export interface GalleryPhoto {
  /** Stable key: the asset filename stem, matched to the image in the grid. */
  id: string;
  /** Short caption shown alongside the expanded photograph. */
  label: string;
  /** Written after inspecting the file — never guessed from the filename. */
  alt: string;
}

export interface GalleryCopy {
  metaTitle: string;
  metaDescription: string;
  title: string;
  prevImage: string;
  nextImage: string;
  photos: GalleryPhoto[];
}

export const galleryCopy: Record<Locale, GalleryCopy> = {
  en: {
    metaTitle: 'Gallery | Origin Residences',
    metaDescription:
      'The building, its amenities and its Artefacto interiors — the Origin Residences gallery, in Bay Harbor Islands, Florida.',
    title: 'Gallery',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    photos: [
      {
        id: 'building-from-water-sunset',
        label: 'Origin from the water',
        alt: 'Rendering of the Origin building seen from the water at sunset, stacked glass balconies behind palms, a sailboat moored at left.',
      },
      {
        id: 'lobby-double-height',
        label: 'Lobby lounge',
        alt: 'Rendering of the double-height lobby lounge: pale curved sofas, a timber slat wall and a polished sculptural table beneath a deep blue disc.',
      },
      {
        id: 'residence-living-dining-bay-view',
        label: 'Living and dining',
        alt: 'Rendering of a residence living and dining room, green upholstered chairs around an oval table under a cluster pendant, opening to a bay view.',
      },
      {
        id: 'rooftop-pool-bar',
        label: 'Rooftop pool',
        alt: 'Rendering of the rooftop pool, with a shaded bar, sun loungers and green umbrellas set along the water.',
      },
      {
        id: 'building-canal-elevation',
        label: 'Canal elevation',
        alt: 'Rendering of the canal elevation, terrace stacked on terrace, looking down the waterway past private docks and moored boats.',
      },
      {
        id: 'residence-great-room-kitchen',
        label: 'Great room',
        alt: 'Rendering of a residence great room: curved sofas on a patterned rug, a dining table with green chairs and the open kitchen beyond.',
      },
      {
        id: 'primary-bedroom-water-view',
        label: 'Primary bedroom',
        alt: 'Rendering of a primary bedroom with an upholstered headboard wall, sliding doors open to a planted terrace and the water beyond.',
      },
      {
        id: 'lobby-reception-desk',
        label: 'Reception',
        alt: 'Rendering of the lobby reception, a polished bronze desk in front of wall lettering reading Origin Residences Bay Harbor by Artefacto.',
      },
      {
        id: 'terrace-pergola-dining',
        label: 'Terrace dining',
        alt: 'Rendering of a rooftop terrace under a timber pergola, a long table laid for dinner beneath trailing bougainvillea with the skyline behind.',
      },
      {
        id: 'residence-living-terrace-open',
        label: 'Living room',
        alt: 'Rendering of a corner living room with the terrace doors slid fully open, a dining table with green chairs and treetops beyond.',
      },
      {
        id: 'building-waterfront-approach',
        label: 'Waterfront approach',
        alt: 'Rendering of the building approached from the water, its stacked terraces seen on the angle, two motor launches passing in the foreground.',
      },
      {
        id: 'residents-lounge-wood-wall',
        label: 'Residents’ lounge',
        alt: 'Rendering of the residents’ lounge, low pale seating in front of a sculpted timber wall and a stone-topped bar.',
      },
      {
        id: 'primary-bathroom-marble',
        label: 'Primary bathroom',
        alt: 'Rendering of a primary bathroom: a freestanding tub against veined marble, twin lit mirrors above a bronze double vanity.',
      },
      {
        id: 'rooftop-pool-terrace',
        label: 'Pool terrace',
        alt: 'Rendering of the rooftop pool terrace, planters and palms along the parapet with loungers and umbrellas around the water.',
      },
      {
        id: 'residence-kitchen-island',
        label: 'Kitchen',
        alt: 'Rendering of a residence kitchen, a stone island with bar stools beside a round dining table at the terrace doors.',
      },
      {
        id: 'elevator-lobby-brass',
        label: 'Elevator lobby',
        alt: 'Rendering of an elevator lobby, brushed bronze doors between textured panels, a figure passing in motion blur.',
      },
      {
        id: 'residence-curved-sofa-lounge',
        label: 'Sitting room',
        alt: 'Rendering of a residence sitting room: a curved cream sofa, amber glass pendants and a large abstract canvas.',
      },
      {
        id: 'building-street-entrance',
        label: 'Street entrance',
        alt: 'Rendering of the building from the street, terraces stepping back above a timber-screened entrance and a flowering tree.',
      },
      {
        id: 'bedroom-wood-panelling',
        label: 'Bedroom',
        alt: 'Rendering of a bedroom set against walnut panelling, an upholstered headboard and a blown-glass pendant beside the terrace doors.',
      },
      {
        id: 'private-terrace-lounge',
        label: 'Private terrace',
        alt: 'Rendering of a private terrace, deep lounge seating and planters under a shaded soffit, looking out over rooftops toward the skyline.',
      },
      {
        id: 'childrens-playroom',
        label: 'Children’s playroom',
        alt: 'Rendering of the children’s playroom, padded arched walls, soft toys and low tables beside house-shaped nooks.',
      },
      {
        id: 'residence-living-blue-rug',
        label: 'Living room',
        alt: 'Rendering of a living room on a blue patterned rug, a modular cream sofa facing a faceted mirror on a panelled wall.',
      },
      {
        id: 'rooftop-deck-skyline',
        label: 'Rooftop deck',
        alt: 'Rendering of the rooftop deck seen from across the water, the pool and umbrellas set between planted edges beneath a wide sky.',
      },
      {
        id: 'residence-terrace-to-living',
        label: 'Terrace to living',
        alt: 'Rendering of a residence seen from its terrace, sliding doors open onto the kitchen, dining table and living room within.',
      },
    ],
  },

  es: {
    metaTitle: 'Galería | Origin Residences',
    metaDescription:
      'El edificio, sus amenidades y sus interiores de Artefacto: la galería de Origin Residences, en Bay Harbor Islands, Florida.',
    title: 'Galería',
    prevImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    photos: [
      {
        id: 'building-from-water-sunset',
        label: 'Origin desde el agua',
        alt: 'Imagen ilustrativa del edificio Origin visto desde el agua al atardecer, con balcones de cristal superpuestos tras las palmeras y un velero amarrado a la izquierda.',
      },
      {
        id: 'lobby-double-height',
        label: 'Salón del lobby',
        alt: 'Imagen ilustrativa del salón del lobby a doble altura: sofás curvos en tonos claros, un muro de lamas de madera y una mesa escultórica pulida bajo un disco azul intenso.',
      },
      {
        id: 'residence-living-dining-bay-view',
        label: 'Sala y comedor',
        alt: 'Imagen ilustrativa de la sala y el comedor de una residencia: sillas tapizadas en verde alrededor de una mesa ovalada bajo una lámpara de racimo, abiertos a la vista de la bahía.',
      },
      {
        id: 'rooftop-pool-bar',
        label: 'Piscina en la azotea',
        alt: 'Imagen ilustrativa de la piscina en la azotea, con un bar techado, tumbonas y sombrillas verdes dispuestas junto al agua.',
      },
      {
        id: 'building-canal-elevation',
        label: 'Alzado al canal',
        alt: 'Imagen ilustrativa del alzado hacia el canal, terraza sobre terraza, con la vista siguiendo el canal entre muelles privados y embarcaciones amarradas.',
      },
      {
        id: 'residence-great-room-kitchen',
        label: 'Salón principal',
        alt: 'Imagen ilustrativa del salón principal de una residencia: sofás curvos sobre una alfombra estampada, una mesa de comedor con sillas verdes y, al fondo, la cocina abierta.',
      },
      {
        id: 'primary-bedroom-water-view',
        label: 'Dormitorio principal',
        alt: 'Imagen ilustrativa de un dormitorio principal con la pared del cabecero tapizada y puertas correderas abiertas a una terraza ajardinada, con el agua al fondo.',
      },
      {
        id: 'lobby-reception-desk',
        label: 'Recepción',
        alt: 'Imagen ilustrativa de la recepción del lobby: un mostrador de bronce pulido frente al rótulo mural que dice Origin Residences Bay Harbor by Artefacto.',
      },
      {
        id: 'terrace-pergola-dining',
        label: 'Comedor en la terraza',
        alt: 'Imagen ilustrativa de una terraza en la azotea bajo una pérgola de madera: una mesa larga dispuesta para la cena bajo buganvillas colgantes, con el horizonte de la ciudad al fondo.',
      },
      {
        id: 'residence-living-terrace-open',
        label: 'Sala',
        alt: 'Imagen ilustrativa de una sala en esquina con las puertas de la terraza completamente abiertas, una mesa de comedor con sillas verdes y las copas de los árboles al fondo.',
      },
      {
        id: 'building-waterfront-approach',
        label: 'Llegada desde el agua',
        alt: 'Imagen ilustrativa del edificio en la aproximación desde el agua, con sus terrazas superpuestas vistas en diagonal y dos lanchas cruzando en primer plano.',
      },
      {
        id: 'residents-lounge-wood-wall',
        label: 'Salón de residentes',
        alt: 'Imagen ilustrativa del salón de residentes: asientos bajos en tonos claros frente a un muro de madera esculpida y una barra con encimera de piedra.',
      },
      {
        id: 'primary-bathroom-marble',
        label: 'Baño principal',
        alt: 'Imagen ilustrativa de un baño principal: una bañera exenta contra mármol veteado y dos espejos iluminados sobre un mueble doble de bronce.',
      },
      {
        id: 'rooftop-pool-terrace',
        label: 'Terraza de la piscina',
        alt: 'Imagen ilustrativa de la terraza de la piscina en la azotea: jardineras y palmeras a lo largo del pretil, con tumbonas y sombrillas alrededor del agua.',
      },
      {
        id: 'residence-kitchen-island',
        label: 'Cocina',
        alt: 'Imagen ilustrativa de la cocina de una residencia: una isla de piedra con taburetes junto a una mesa redonda de comedor, ante las puertas de la terraza.',
      },
      {
        id: 'elevator-lobby-brass',
        label: 'Vestíbulo de ascensores',
        alt: 'Imagen ilustrativa de un vestíbulo de ascensores: puertas de bronce cepillado entre paneles texturizados y una figura que pasa con efecto de movimiento.',
      },
      {
        id: 'residence-curved-sofa-lounge',
        label: 'Sala de estar',
        alt: 'Imagen ilustrativa de la sala de estar de una residencia: un sofá curvo en color crema, lámparas colgantes de vidrio ámbar y un gran lienzo abstracto.',
      },
      {
        id: 'building-street-entrance',
        label: 'Acceso desde la calle',
        alt: 'Imagen ilustrativa del edificio desde la calle: las terrazas retranqueadas sobre un acceso con celosía de madera y un árbol en flor.',
      },
      {
        id: 'bedroom-wood-panelling',
        label: 'Dormitorio',
        alt: 'Imagen ilustrativa de un dormitorio contra un panelado de nogal, con cabecero tapizado y una lámpara colgante de vidrio soplado junto a las puertas de la terraza.',
      },
      {
        id: 'private-terrace-lounge',
        label: 'Terraza privada',
        alt: 'Imagen ilustrativa de una terraza privada: asientos profundos de lounge y jardineras bajo un alero, con vistas sobre los tejados hacia el horizonte de la ciudad.',
      },
      {
        id: 'childrens-playroom',
        label: 'Sala de juegos infantil',
        alt: 'Imagen ilustrativa de la sala de juegos infantil: paredes acolchadas con arcos, peluches y mesas bajas junto a nichos en forma de casa.',
      },
      {
        id: 'residence-living-blue-rug',
        label: 'Sala',
        alt: 'Imagen ilustrativa de una sala sobre una alfombra azul estampada: un sofá modular en color crema frente a un espejo facetado en la pared panelada.',
      },
      {
        id: 'rooftop-deck-skyline',
        label: 'Azotea',
        alt: 'Imagen ilustrativa de la azotea vista desde el otro lado del agua: la piscina y las sombrillas entre bordes ajardinados bajo un cielo amplio.',
      },
      {
        id: 'residence-terrace-to-living',
        label: 'De la terraza a la sala',
        alt: 'Imagen ilustrativa de una residencia vista desde su terraza: las puertas correderas abren a la cocina, el comedor y la sala interiores.',
      },
    ],
  },

  'pt-br': {
    metaTitle: 'Galeria | Origin Residences',
    metaDescription:
      'O edifício, suas comodidades e seus interiores Artefacto: a galeria do Origin Residences, em Bay Harbor Islands, Flórida.',
    title: 'Galeria',
    prevImage: 'Imagem anterior',
    nextImage: 'Próxima imagem',
    photos: [
      {
        id: 'building-from-water-sunset',
        label: 'Origin visto da água',
        alt: 'Imagem ilustrativa do edifício Origin visto da água ao pôr do sol, com varandas de vidro sobrepostas atrás das palmeiras e um veleiro ancorado à esquerda.',
      },
      {
        id: 'lobby-double-height',
        label: 'Lounge do lobby',
        alt: 'Imagem ilustrativa do lounge do lobby em pé-direito duplo: sofás curvos em tons claros, uma parede de ripas de madeira e uma mesa escultórica polida sob um disco azul profundo.',
      },
      {
        id: 'residence-living-dining-bay-view',
        label: 'Sala e jantar',
        alt: 'Imagem ilustrativa da sala de estar e jantar de uma residência: cadeiras estofadas em verde ao redor de uma mesa oval sob um pendente em cacho, abertas para a vista da baía.',
      },
      {
        id: 'rooftop-pool-bar',
        label: 'Piscina na cobertura',
        alt: 'Imagem ilustrativa da piscina na cobertura, com bar coberto, espreguiçadeiras e guarda-sóis verdes dispostos à beira da água.',
      },
      {
        id: 'building-canal-elevation',
        label: 'Fachada para o canal',
        alt: 'Imagem ilustrativa da fachada voltada para o canal, terraço sobre terraço, com a vista seguindo o canal entre píeres privativos e barcos atracados.',
      },
      {
        id: 'residence-great-room-kitchen',
        label: 'Living integrado',
        alt: 'Imagem ilustrativa do living integrado de uma residência: sofás curvos sobre um tapete estampado, mesa de jantar com cadeiras verdes e, ao fundo, a cozinha aberta.',
      },
      {
        id: 'primary-bedroom-water-view',
        label: 'Suíte principal',
        alt: 'Imagem ilustrativa de uma suíte principal com parede de cabeceira estofada e portas de correr abertas para um terraço ajardinado, com a água ao fundo.',
      },
      {
        id: 'lobby-reception-desk',
        label: 'Recepção',
        alt: 'Imagem ilustrativa da recepção do lobby: um balcão de bronze polido diante do letreiro na parede com a inscrição Origin Residences Bay Harbor by Artefacto.',
      },
      {
        id: 'terrace-pergola-dining',
        label: 'Jantar no terraço',
        alt: 'Imagem ilustrativa de um terraço na cobertura sob uma pérgola de madeira: uma mesa longa posta para o jantar sob buganvílias pendentes, com o skyline ao fundo.',
      },
      {
        id: 'residence-living-terrace-open',
        label: 'Sala de estar',
        alt: 'Imagem ilustrativa de uma sala de esquina com as portas do terraço totalmente abertas, mesa de jantar com cadeiras verdes e as copas das árvores ao fundo.',
      },
      {
        id: 'building-waterfront-approach',
        label: 'Chegada pela água',
        alt: 'Imagem ilustrativa do edifício na chegada pela água, com seus terraços sobrepostos vistos em diagonal e duas lanchas passando em primeiro plano.',
      },
      {
        id: 'residents-lounge-wood-wall',
        label: 'Lounge dos moradores',
        alt: 'Imagem ilustrativa do lounge dos moradores: assentos baixos em tons claros diante de uma parede de madeira esculpida e um bar com tampo de pedra.',
      },
      {
        id: 'primary-bathroom-marble',
        label: 'Banheiro principal',
        alt: 'Imagem ilustrativa de um banheiro principal: banheira solta contra mármore com veios e dois espelhos iluminados sobre uma bancada dupla em bronze.',
      },
      {
        id: 'rooftop-pool-terrace',
        label: 'Terraço da piscina',
        alt: 'Imagem ilustrativa do terraço da piscina na cobertura: floreiras e palmeiras ao longo do parapeito, com espreguiçadeiras e guarda-sóis ao redor da água.',
      },
      {
        id: 'residence-kitchen-island',
        label: 'Cozinha',
        alt: 'Imagem ilustrativa da cozinha de uma residência: uma ilha de pedra com banquetas ao lado de uma mesa de jantar redonda, junto às portas do terraço.',
      },
      {
        id: 'elevator-lobby-brass',
        label: 'Hall dos elevadores',
        alt: 'Imagem ilustrativa de um hall de elevadores: portas de bronze escovado entre painéis texturizados e uma figura passando com efeito de movimento.',
      },
      {
        id: 'residence-curved-sofa-lounge',
        label: 'Sala íntima',
        alt: 'Imagem ilustrativa da sala íntima de uma residência: um sofá curvo em creme, pendentes de vidro âmbar e uma grande tela abstrata.',
      },
      {
        id: 'building-street-entrance',
        label: 'Entrada pela rua',
        alt: 'Imagem ilustrativa do edifício visto da rua: os terraços recuados sobre uma entrada com brise de madeira e uma árvore florida.',
      },
      {
        id: 'bedroom-wood-panelling',
        label: 'Quarto',
        alt: 'Imagem ilustrativa de um quarto contra painéis de nogueira, com cabeceira estofada e um pendente de vidro soprado junto às portas do terraço.',
      },
      {
        id: 'private-terrace-lounge',
        label: 'Terraço privativo',
        alt: 'Imagem ilustrativa de um terraço privativo: assentos profundos de lounge e floreiras sob a laje de cobertura, com vista sobre os telhados em direção ao skyline.',
      },
      {
        id: 'childrens-playroom',
        label: 'Brinquedoteca',
        alt: 'Imagem ilustrativa da brinquedoteca: paredes acolchoadas em arco, bichos de pelúcia e mesas baixas ao lado de nichos em forma de casa.',
      },
      {
        id: 'residence-living-blue-rug',
        label: 'Sala de estar',
        alt: 'Imagem ilustrativa de uma sala de estar sobre um tapete azul estampado: um sofá modular em creme diante de um espelho facetado na parede em painéis.',
      },
      {
        id: 'rooftop-deck-skyline',
        label: 'Deck da cobertura',
        alt: 'Imagem ilustrativa do deck da cobertura visto do outro lado da água: a piscina e os guarda-sóis entre bordas ajardinadas sob um céu amplo.',
      },
      {
        id: 'residence-terrace-to-living',
        label: 'Do terraço à sala',
        alt: 'Imagem ilustrativa de uma residência vista de seu terraço: as portas de correr se abrem para a cozinha, a mesa de jantar e a sala de estar.',
      },
    ],
  },
};
