import type { Locale } from '../../i18n/ui';

/**
 * Amenities page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * Images are locale-independent and stay in the page component; each stack
 * entry is matched to its FOLDER of photography by `id`.
 *
 * The stack replaced the old alternating `features` rows in August 2026. Its
 * titles are owner-supplied. `line` is OPTIONAL and deliberately absent on
 * three of the six: only rooftop, aqua club and pet zone had a supporting line
 * in the incumbent copy, and inventing one for the club room, the fitness
 * centre or the playroom would be exactly the fabrication this build refuses.
 */
export interface AmenitiesCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  scheduleTitle: string;
  schedule: string[];
  /** The six stacking amenity cards, in render order. `id` also selects the
      image folder in the page component, so it must not be translated. */
  stack: { id: string; title: string; line?: string; alt: string }[];
}

export const amenitiesCopy: Record<Locale, AmenitiesCopy> = {
  en: {
    metaTitle: 'Amenities | Origin Residences',
    metaDescription:
      'Classic elegance for modern living — the rooftop pool, waterfront Aqua Club, gym and resident services at ORIGIN by Artefacto in Bay Harbor Islands, Florida.',
    eyebrow: 'Amenities',
    title: 'Elegance for modern living',
    lede: 'Nestled away on Bay Harbor’s east island, ORIGIN by Artefacto offers a sanctuary where you can enjoy picturesque and peaceful sunset views while embodying the essence of the Miami Lifestyle.',
    scheduleTitle: 'Building amenities',
    schedule: [
      'Panoramic rooftop pool',
      'Poolside summer kitchen and bar',
      'Waterfront Aqua Club',
      'Water sports storage facility',
      'Gym with state-of-the-art equipment',
      'Owner’s Lounge',
      'Kids playroom',
      '24 hour security advanced technology',
      'Designated self parking for all residences',
      'EV-Ready infrastructure available',
      'Bicycle Rack Area',
      'FTTH (Fiber to the Home) for video and high speed internet',
      'Storage units conveniently located on every residential floor',
      'Pet Zone',
    ],
    stack: [
      {
        id: 'rooftop-pool',
        title: 'Panoramic Rooftop Pool',
        line: 'With poolside summer kitchen and bar.',
        alt: 'Rendering of the rooftop deck: a long pool edged with sun loungers and green-and-white parasols, a slatted timber bar pavilion behind, palms along the parapet and the low city skyline beyond.',
      },
      {
        id: 'aqua-club',
        title: 'Waterfront Aqua Club',
        line: 'Dive into the life aquatic at Origin from your own boat slip.',
        alt: 'Rendering of Origin seen from the water at golden hour: the white terraced building framed by palms, with a classic wooden runabout and a modern motor launch passing the private docks.',
      },
      {
        id: 'clubroom',
        title: 'Owner’s Clubroom and Lounge',
        line: 'A space to share with family, friends, and neighbors.',
        alt: 'Rendering of the owner’s lounge: cream bouclé armchairs and a curved sofa on a pale rug, low oak tables, a marble-topped bar beneath a sculpted timber wave, and slatted walnut walls.',
      },
      {
        id: 'fitness-center',
        title: 'State-of-the-art Fitness Center',
        line: 'Designed for Your Peak Performance.',
        alt: 'Rendering of the fitness centre: weight machines and a bench on pale timber flooring, a row of treadmills and cross-trainers along a mirrored wall, under a slatted timber ceiling.',
      },
      {
        id: 'kidsroom',
        title: 'Children’s Playroom',
        line: 'Inspired Spaces for Active Minds',
        alt: 'Rendering of the children’s playroom: upholstered arched wall panels, a carpeted tiered step scattered with soft toys, house-shaped lit display niches and a cloud-shaped table with stools.',
      },
      {
        id: 'pet-zone',
        title: 'Pet Zone',
        line: 'For the extended family.',
        alt: 'Two dogs, a terrier and a corgi, running side by side along a path between tall grasses.',
      },
    ],
  },

  es: {
    metaTitle: 'Amenidades | Origin Residences',
    metaDescription:
      'Elegancia clásica para la vida moderna: piscina en la azotea, Aqua Club frente al mar, gimnasio y servicios para residentes en ORIGIN by Artefacto, Bay Harbor Islands, Florida.',
    eyebrow: 'Amenidades',
    title: 'Elegancia clásica para la vida moderna',
    lede: 'Ubicado en la isla este de Bay Harbor, ORIGIN by Artefacto ofrece un refugio donde disfrutar de atardeceres pintorescos y serenos, encarnando la esencia del estilo de vida de Miami.',
    scheduleTitle: 'Amenidades del edificio',
    schedule: [
      'Piscina panorámica en la azotea',
      'Cocina de verano y bar junto a la piscina',
      'Aqua Club frente al mar',
      'Depósito para deportes acuáticos',
      'Gimnasio con equipamiento de última generación',
      'Salón de propietarios',
      'Sala de juegos infantil',
      'Seguridad 24 horas con tecnología avanzada',
      'Estacionamiento propio asignado para todas las residencias',
      'Infraestructura preparada para vehículos eléctricos',
      'Zona de bicicleteros',
      'FTTH (fibra óptica hasta el hogar) para video e internet de alta velocidad',
      'Depósitos ubicados convenientemente en cada piso residencial',
      'Zona para mascotas',
    ],
    stack: [
      {
        id: 'rooftop-pool',
        title: 'Piscina panorámica en la azotea',
        line: 'Con cocina de verano y bar junto a la piscina.',
        alt: 'Render de la terraza de la azotea: una piscina alargada bordeada de tumbonas y sombrillas verdes y blancas, un pabellón bar de madera listonada detrás, palmeras a lo largo del parapeto y el perfil bajo de la ciudad al fondo.',
      },
      {
        id: 'aqua-club',
        title: 'Aqua Club frente al mar',
        line: 'Sumérjase en la vida acuática en Origin desde su propio amarre.',
        alt: 'Render de Origin visto desde el agua a la hora dorada: el edificio blanco de terrazas escalonadas enmarcado por palmeras, con una lancha clásica de madera y una embarcación a motor moderna pasando frente a los muelles privados.',
      },
      {
        id: 'clubroom',
        title: 'Clubroom y salón de propietarios',
        line: 'Un espacio para compartir con la familia, los amigos y los vecinos.',
        alt: 'Render del salón de propietarios: sillones de bouclé color crema y un sofá curvo sobre una alfombra clara, mesas bajas de roble, una barra con encimera de mármol bajo una ola escultórica de madera y paredes de nogal listonado.',
      },
      {
        id: 'fitness-center',
        title: 'Gimnasio de última generación',
        line: 'Diseñado para su máximo rendimiento.',
        alt: 'Render del gimnasio: máquinas de musculación y un banco sobre suelo de madera clara, una hilera de cintas de correr y elípticas junto a una pared con espejos, bajo un techo de madera listonada.',
      },
      {
        id: 'kidsroom',
        title: 'Sala de juegos infantil',
        line: 'Espacios inspirados para mentes activas',
        alt: 'Render de la sala de juegos infantil: paneles de pared tapizados en arco, una grada alfombrada con peluches, hornacinas iluminadas en forma de casa y una mesa con forma de nube con taburetes.',
      },
      {
        id: 'pet-zone',
        title: 'Zona para mascotas',
        line: 'Para la familia extendida.',
        alt: 'Dos perros, un terrier y un corgi, corriendo lado a lado por un sendero entre hierbas altas.',
      },
    ],
  },

  'pt-br': {
    metaTitle: 'Comodidades | Origin Residences',
    metaDescription:
      'Elegância clássica para o viver moderno: piscina na cobertura, Aqua Club à beira-mar, academia e serviços aos moradores no ORIGIN by Artefacto, em Bay Harbor Islands, Flórida.',
    eyebrow: 'Comodidades',
    title: 'Elegância clássica para o viver moderno',
    lede: 'Situado na ilha leste de Bay Harbor, o ORIGIN by Artefacto oferece um refúgio onde se desfruta de pores do sol pitorescos e tranquilos, traduzindo a essência do estilo de vida de Miami.',
    scheduleTitle: 'Comodidades do edifício',
    schedule: [
      'Piscina panorâmica na cobertura',
      'Cozinha de verão e bar à beira da piscina',
      'Aqua Club à beira-mar',
      'Depósito para esportes aquáticos',
      'Academia com equipamentos de última geração',
      'Lounge dos proprietários',
      'Brinquedoteca infantil',
      'Segurança 24 horas com tecnologia avançada',
      'Vagas próprias designadas para todas as residências',
      'Infraestrutura preparada para veículos elétricos',
      'Bicicletário',
      'FTTH (fibra óptica até a residência) para vídeo e internet de alta velocidade',
      'Depósitos convenientemente localizados em todos os andares residenciais',
      'Espaço pet',
    ],
    stack: [
      {
        id: 'rooftop-pool',
        title: 'Piscina panorâmica na cobertura',
        line: 'Com cozinha de verão e bar à beira da piscina.',
        alt: 'Render do deck da cobertura: uma piscina alongada cercada por espreguiçadeiras e guarda-sóis verdes e brancos, um pavilhão bar de madeira ripada ao fundo, palmeiras ao longo do parapeito e o horizonte baixo da cidade adiante.',
      },
      {
        id: 'aqua-club',
        title: 'Aqua Club à beira-mar',
        line: 'Mergulhe na vida aquática no Origin a partir da sua própria vaga de atracação.',
        alt: 'Render do Origin visto da água na hora dourada: o edifício branco de terraços escalonados emoldurado por palmeiras, com uma lancha clássica de madeira e uma embarcação a motor moderna passando pelos píeres privativos.',
      },
      {
        id: 'clubroom',
        title: 'Clubroom e lounge dos proprietários',
        line: 'Um espaço para compartilhar com a família, os amigos e os vizinhos.',
        alt: 'Render do lounge dos proprietários: poltronas de bouclé creme e um sofá curvo sobre um tapete claro, mesas baixas de carvalho, um bar com tampo de mármore sob uma onda escultórica de madeira e paredes de nogueira ripada.',
      },
      {
        id: 'fitness-center',
        title: 'Academia de última geração',
        line: 'Projetada para o seu máximo desempenho.',
        alt: 'Render da academia: aparelhos de musculação e um banco sobre piso de madeira clara, uma fileira de esteiras e elípticos junto a uma parede espelhada, sob um teto de madeira ripada.',
      },
      {
        id: 'kidsroom',
        title: 'Brinquedoteca infantil',
        line: 'Espaços inspiradores para mentes ativas',
        alt: 'Render da brinquedoteca infantil: painéis de parede estofados em arco, uma arquibancada acarpetada com bichos de pelúcia, nichos iluminados em formato de casa e uma mesa em formato de nuvem com banquinhos.',
      },
      {
        id: 'pet-zone',
        title: 'Espaço pet',
        line: 'Para a família estendida.',
        alt: 'Dois cães, um terrier e um corgi, correndo lado a lado por um caminho entre gramíneas altas.',
      },
    ],
  },
};
