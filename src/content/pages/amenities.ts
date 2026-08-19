import type { Locale } from '../../i18n/ui';

/**
 * Amenities page copy.
 *
 * `en` is verbatim from originresidences.com. `es` and `pt-br` are AI-authored
 * and awaiting native review — see TRANSLATION-REVIEW.md.
 *
 * Images are locale-independent and stay in the page component; features are
 * matched to their artwork by `id`.
 */
export interface AmenitiesCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  bandAlt: string;
  scheduleTitle: string;
  schedule: string[];
  features: { id: string; title: string; lines: string[]; alt: string }[];
}

export const amenitiesCopy: Record<Locale, AmenitiesCopy> = {
  en: {
    metaTitle: 'Amenities | Origin Residences',
    metaDescription:
      'Classic elegance for modern living — the rooftop pool, waterfront Aqua Club, gym and resident services at ORIGIN by Artefacto in Bay Harbor Islands, Florida.',
    eyebrow: 'Amenities',
    title: 'Elegance for modern living',
    lede: 'Nestled away on Bay Harbor’s east island, ORIGIN by Artefacto offers a sanctuary where you can enjoy picturesque and peaceful sunset views while embodying the essence of the Miami Lifestyle.',
    bandAlt:
      'Living and dining room of an ORIGIN residence furnished by Artefacto, with floor-to-ceiling glass opening onto a terrace above the water.',
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
    features: [
      {
        id: 'aqua-club',
        title: 'Waterfront Aqua Club',
        lines: ['Water sports storage facility', 'Dive into the waterfront living at Origin'],
        alt: 'Two kayakers paddling side by side across calm open water, a low skyline on the far horizon.',
      },
      {
        id: 'rooftop-pool',
        title: 'Rooftop Pool',
        lines: ['Panoramic rooftop pool with poolside summer kitchens and bar'],
        alt: 'Rendering of the rooftop pool deck: a rectangular pool edged with sun loungers and parasols, palms along the parapet, and a covered summer kitchen and bar at the far end.',
      },
      {
        id: 'gym',
        title: 'Gym',
        lines: ['Gym with state-of-the-art equipment'],
        alt: 'Rendering of the fitness room: weight machines and benches on pale timber flooring beneath a slatted wood ceiling, with a mirrored wall and cardio equipment beyond.',
      },
      {
        id: 'pet-park',
        title: 'Pet Park',
        lines: ['For the extended family'],
        alt: 'Two dogs running side by side along a paved path between tall grasses.',
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
    bandAlt:
      'Salón y comedor de una residencia ORIGIN amueblada por Artefacto, con ventanales de piso a techo que se abren a una terraza sobre el agua.',
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
    features: [
      {
        id: 'aqua-club',
        title: 'Aqua Club frente al mar',
        lines: ['Depósito para deportes acuáticos', 'Sumérjase en la vida frente al mar en Origin'],
        alt: 'Dos personas en kayak remando lado a lado sobre aguas abiertas y calmas, con un perfil urbano bajo en el horizonte.',
      },
      {
        id: 'rooftop-pool',
        title: 'Piscina en la azotea',
        lines: ['Piscina panorámica en la azotea con cocinas de verano y bar junto a la piscina'],
        alt: 'Render de la terraza de la piscina en la azotea: una piscina rectangular bordeada de tumbonas y sombrillas, palmeras a lo largo del parapeto y una cocina de verano cubierta con bar al fondo.',
      },
      {
        id: 'gym',
        title: 'Gimnasio',
        lines: ['Gimnasio con equipamiento de última generación'],
        alt: 'Render de la sala de fitness: máquinas de musculación y bancos sobre piso de madera clara bajo un cielorraso de listones, con una pared espejada y equipos de cardio al fondo.',
      },
      {
        id: 'pet-park',
        title: 'Parque para mascotas',
        lines: ['Para la familia extendida'],
        alt: 'Dos perros corriendo lado a lado por un sendero pavimentado entre pastos altos.',
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
    bandAlt:
      'Sala de estar e jantar de uma residência ORIGIN mobiliada pela Artefacto, com vidros do piso ao teto abrindo para um terraço sobre a água.',
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
    features: [
      {
        id: 'aqua-club',
        title: 'Aqua Club à beira-mar',
        lines: ['Depósito para esportes aquáticos', 'Mergulhe na vida à beira-mar no Origin'],
        alt: 'Dois caiaques lado a lado em águas abertas e calmas, com um horizonte urbano baixo ao fundo.',
      },
      {
        id: 'rooftop-pool',
        title: 'Piscina na cobertura',
        lines: ['Piscina panorâmica na cobertura com cozinhas de verão e bar à beira da piscina'],
        alt: 'Render do deck da piscina na cobertura: piscina retangular cercada por espreguiçadeiras e guarda-sóis, palmeiras ao longo do parapeito e uma cozinha de verão coberta com bar ao fundo.',
      },
      {
        id: 'gym',
        title: 'Academia',
        lines: ['Academia com equipamentos de última geração'],
        alt: 'Render da sala de ginástica: aparelhos de musculação e bancos sobre piso de madeira clara sob forro ripado, com parede espelhada e equipamentos de cardio ao fundo.',
      },
      {
        id: 'pet-park',
        title: 'Parque para pets',
        lines: ['Para a família estendida'],
        alt: 'Dois cães correndo lado a lado por um caminho pavimentado entre gramíneas altas.',
      },
    ],
  },
};
