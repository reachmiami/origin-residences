import type { Locale } from '../i18n/ui';

/**
 * Page prose, separated from markup so translators never touch components.
 *
 * `en` is the source of truth, taken verbatim from originresidences.com.
 * `es` and `pt-br` are AI-authored and REQUIRE native-speaker review before
 * launch — see TRANSLATION-REVIEW.md.
 */

export interface Copy {
  home: {
    heroHeadline: string;
    heroCta: string;
    collabLine1: string;
    collabLine2: string;
    collabLine3: string;
    intro: string;
    inventoryTitle: string;
    inventoryLede: string;
    inventoryLimited: string;
    inventoryCta: string;
    presentationTitle: string;
    presentationBody: string;
    presentationCta: string;
    /** Alternating image/panel bands, in page order. */
    features: { id: string; lines: string[]; sub?: string; alt: string }[];
    fullBleedAlt: string;
  };
  forms: {
    getInfoTitle: string;
    requestInfoTitle: string;
    requestInfoLede: string;
    scheduleTitle: string;
    typeLabel: string;
    typeBuyer: string;
    typeAgent: string;
    company: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cityCode: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    comments: string;
    hearAbout: string;
    methodLabel: string;
    methodGallery: string;
    methodVirtual: string;
    dateLabel: string;
    timeLabel: string;
    fullName: string;
    consent: string;
    privacyLink: string;
    termsLink: string;
    successTitle: string;
    successBody: string;
  };
  hearAboutOptions: string[];
}

const en: Copy = {
  home: {
    heroHeadline:
      'An exquisite collection of 27 waterfront limited edition luxury residences',
    heroCta: 'View available units',
    collabLine1: 'In collaboration with Artefacto,',
    collabLine2: 'the purveyors of sophisticated',
    collabLine3: 'South Florida living.',
    intro:
      'This elegant boutique residential building embodies the ultimate Miami lifestyle, enticing views and expansive floor plans. Just steps away from Miami’s pristine beaches and the world-renowned Bal Harbour Shops, ORIGIN is the ultimate in urban island living while being just steps away from every comfort of city life. ARTEFACTO decodes a lifestyle that is highly regarded amongst the biggest names in architecture and décor creating the epitome of warm, contemporary living.',
    inventoryTitle: 'Developer inventory',
    inventoryLede:
      'Multiple residence floor plan options from 2 bed / 2.5 bath up to 4 bed + den / 4.5 bath',
    inventoryLimited: 'Limited units available',
    inventoryCta: 'View available units',
    presentationTitle: 'Schedule private presentation',
    presentationBody:
      'Discover more about our limited availability units through a personalized one-on-one session from our sales gallery.',
    presentationCta: 'Schedule private presentation',
    features: [
      { id: 'bespoke-design', lines: ['Exceptional', 'bespoke design'], sub: 'by artefacto',
        alt: 'Living and dining room of an ORIGIN residence furnished by Artefacto, a sculptural cluster pendant above the table and terrace doors open to the bay.' },
      { id: 'living-concept', lines: ['Carefully', 'thought out', 'living concept'],
        alt: 'The ORIGIN building seen from the water at dusk, stacked terraces above the pool deck and palms along the seawall.' },
      { id: 'natural-beauty', lines: ['A celebration', 'of natural beauty'],
        alt: 'An Artefacto lounge setting in soft bouclé, photographed from above in strong daylight.' },
    ],
    fullBleedAlt: 'Great room of an ORIGIN residence: curved seating on a patterned rug, dining table beyond, and floor-to-ceiling glass onto the bay.',
  },
  forms: {
    getInfoTitle: 'Attend an Origin Residences Experience',
    requestInfoTitle: 'Request more information',
    requestInfoLede: 'Please fill the form below and we’ll contact you shortly.',
    scheduleTitle: 'Schedule presentation',
    typeLabel: 'Type',
    typeBuyer: 'Buyer',
    typeAgent: 'Broker',
    company: 'Company',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    cityCode: 'City code',
    address: 'Address',
    city: 'City',
    state: 'State',
    zip: 'Zip',
    country: 'Select a country',
    comments: 'Comments',
    hearAbout: 'How did you hear about us',
    methodLabel: 'Presentation method',
    methodGallery: 'Visit sales gallery',
    methodVirtual: 'Virtual presentation',
    dateLabel: 'Date',
    timeLabel: 'Time',
    fullName: 'Full name',
    consent:
      'I agree to be contacted by Origin Residences via call, email, and text for real estate services. To opt out, you can reply ‘stop’ at any time or reply ‘help’ for assistance. You can also click the unsubscribe link in the emails. Message and data rates may apply. Message frequency may vary.',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Service',
    successTitle: 'Thanks for contacting us!',
    successBody:
      'We have successfully received your form submission and will take it from here. You have a great rest of your day.',
  },
  hearAboutOptions: [
    'Area Driveby',
    'Broker',
    'Event',
    'Internet',
    'Magazine',
    'Newspaper',
    'Outdoor Advertising',
    'Referral',
  ],
};

const es: Copy = {
  home: {
    heroHeadline:
      'Una exquisita colección de 27 residencias de lujo frente al mar, en edición limitada',
    heroCta: 'Ver unidades disponibles',
    collabLine1: 'En colaboración con Artefacto,',
    collabLine2: 'los proveedores del refinado',
    collabLine3: 'estilo de vida del sur de Florida.',
    intro:
      'Este elegante edificio residencial boutique encarna el máximo estilo de vida de Miami, con vistas cautivadoras y amplias plantas. A pocos pasos de las playas vírgenes de Miami y de las mundialmente reconocidas Bal Harbour Shops, ORIGIN representa la máxima expresión de la vida urbana en la isla, sin renunciar a ninguna comodidad de la ciudad. ARTEFACTO descifra un estilo de vida muy valorado entre los grandes nombres de la arquitectura y la decoración, creando la máxima expresión de una vida cálida y contemporánea.',
    inventoryTitle: 'Inventario del desarrollador',
    inventoryLede:
      'Múltiples opciones de planta, desde 2 habitaciones / 2.5 baños hasta 4 habitaciones + estudio / 4.5 baños',
    inventoryLimited: 'Unidades limitadas disponibles',
    inventoryCta: 'Ver unidades disponibles',
    presentationTitle: 'Agendar presentación privada',
    presentationBody:
      'Descubra más sobre nuestras unidades de disponibilidad limitada en una sesión personalizada e individual en nuestra galería de ventas.',
    presentationCta: 'Agendar presentación privada',
    features: [
      { id: 'bespoke-design', lines: ['Diseño excepcional', 'hecho a medida'], sub: 'por artefacto',
        alt: 'Salón y comedor de una residencia ORIGIN amueblada por Artefacto, con una lámpara escultórica sobre la mesa y las puertas de la terraza abiertas a la bahía.' },
      { id: 'living-concept', lines: ['Un concepto de vida', 'cuidadosamente', 'pensado'],
        alt: 'El edificio ORIGIN visto desde el agua al atardecer, con terrazas escalonadas sobre la piscina y palmeras a lo largo del malecón.' },
      { id: 'natural-beauty', lines: ['Una celebración', 'de la belleza natural'],
        alt: 'Un conjunto de salón de Artefacto en bouclé suave, fotografiado desde arriba con luz natural intensa.' },
    ],
    fullBleedAlt: 'Salón principal de una residencia ORIGIN: asientos curvos sobre una alfombra estampada, comedor al fondo y ventanales de piso a techo hacia la bahía.',
  },
  forms: {
    getInfoTitle: 'Asista a una experiencia Origin Residences',
    requestInfoTitle: 'Solicitar más información',
    requestInfoLede: 'Complete el formulario y nos pondremos en contacto con usted en breve.',
    scheduleTitle: 'Agendar presentación',
    typeLabel: 'Tipo',
    typeBuyer: 'Comprador',
    typeAgent: 'Corredor',
    company: 'Empresa',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    cityCode: 'Código de ciudad',
    address: 'Dirección',
    city: 'Ciudad',
    state: 'Estado',
    zip: 'Código postal',
    country: 'Seleccione un país',
    comments: 'Comentarios',
    hearAbout: 'Cómo supo de nosotros',
    methodLabel: 'Modalidad de presentación',
    methodGallery: 'Visitar la galería de ventas',
    methodVirtual: 'Presentación virtual',
    dateLabel: 'Fecha',
    timeLabel: 'Hora',
    fullName: 'Nombre completo',
    consent:
      'Acepto ser contactado por Origin Residences por llamada, correo electrónico y mensaje de texto para servicios inmobiliarios. Para darse de baja, puede responder «stop» en cualquier momento o «help» para obtener ayuda. También puede hacer clic en el enlace para cancelar la suscripción en los correos. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar.',
    privacyLink: 'Política de Privacidad',
    termsLink: 'Términos del Servicio',
    successTitle: '¡Gracias por contactarnos!',
    successBody:
      'Hemos recibido su formulario correctamente y nos encargaremos a partir de aquí. Que tenga un excelente día.',
  },
  hearAboutOptions: [
    'Paso por la zona',
    'Corredor',
    'Evento',
    'Internet',
    'Revista',
    'Periódico',
    'Publicidad exterior',
    'Recomendación',
  ],
};

const ptBr: Copy = {
  home: {
    heroHeadline:
      'Uma coleção primorosa de 27 residências de luxo à beira-mar, em edição limitada',
    heroCta: 'Ver unidades disponíveis',
    collabLine1: 'Em colaboração com a Artefacto,',
    collabLine2: 'os fornecedores do sofisticado',
    collabLine3: 'estilo de vida do sul da Flórida.',
    intro:
      'Este elegante edifício residencial boutique traduz o melhor do estilo de vida de Miami, com vistas envolventes e plantas amplas. A poucos passos das praias intocadas de Miami e das mundialmente reconhecidas Bal Harbour Shops, o ORIGIN é o ápice da vida urbana na ilha, sem abrir mão de nenhum conforto da cidade. A ARTEFACTO decifra um estilo de vida altamente valorizado entre os maiores nomes da arquitetura e da decoração, criando a expressão máxima de um viver acolhedor e contemporâneo.',
    inventoryTitle: 'Inventário do incorporador',
    inventoryLede:
      'Diversas opções de planta, de 2 quartos / 2,5 banheiros até 4 quartos + escritório / 4,5 banheiros',
    inventoryLimited: 'Unidades limitadas disponíveis',
    inventoryCta: 'Ver unidades disponíveis',
    presentationTitle: 'Agendar apresentação privada',
    presentationBody:
      'Conheça mais sobre nossas unidades de disponibilidade limitada em uma sessão personalizada e individual em nosso showroom de vendas.',
    presentationCta: 'Agendar apresentação privada',
    features: [
      { id: 'bespoke-design', lines: ['Design excepcional', 'sob medida'], sub: 'pela artefacto',
        alt: 'Sala de estar e jantar de uma residência ORIGIN mobiliada pela Artefacto, com luminária escultural sobre a mesa e portas do terraço abertas para a baía.' },
      { id: 'living-concept', lines: ['Um conceito de morar', 'cuidadosamente', 'pensado'],
        alt: 'O edifício ORIGIN visto da água ao entardecer, com terraços escalonados sobre o deck da piscina e palmeiras ao longo do cais.' },
      { id: 'natural-beauty', lines: ['Uma celebração', 'da beleza natural'],
        alt: 'Um conjunto de lounge da Artefacto em bouclé macio, fotografado de cima sob luz natural intensa.' },
    ],
    fullBleedAlt: 'Sala principal de uma residência ORIGIN: assentos curvos sobre tapete estampado, mesa de jantar ao fundo e vidros do piso ao teto voltados para a baía.',
  },
  forms: {
    getInfoTitle: 'Participe de uma experiência Origin Residences',
    requestInfoTitle: 'Solicitar mais informações',
    requestInfoLede: 'Preencha o formulário abaixo e entraremos em contato em breve.',
    scheduleTitle: 'Agendar apresentação',
    typeLabel: 'Tipo',
    typeBuyer: 'Comprador',
    typeAgent: 'Corretor',
    company: 'Empresa',
    firstName: 'Nome',
    lastName: 'Sobrenome',
    email: 'E-mail',
    phone: 'Telefone',
    cityCode: 'Código da cidade',
    address: 'Endereço',
    city: 'Cidade',
    state: 'Estado',
    zip: 'CEP',
    country: 'Selecione um país',
    comments: 'Comentários',
    hearAbout: 'Como você nos conheceu',
    methodLabel: 'Formato da apresentação',
    methodGallery: 'Visitar o showroom de vendas',
    methodVirtual: 'Apresentação virtual',
    dateLabel: 'Data',
    timeLabel: 'Horário',
    fullName: 'Nome completo',
    consent:
      'Concordo em ser contatado pela Origin Residences por ligação, e-mail e mensagem de texto para serviços imobiliários. Para cancelar, responda «stop» a qualquer momento ou «help» para obter ajuda. Você também pode clicar no link de cancelamento nos e-mails. Podem incidir tarifas de mensagens e dados. A frequência das mensagens pode variar.',
    privacyLink: 'Política de Privacidade',
    termsLink: 'Termos de Serviço',
    successTitle: 'Obrigado por entrar em contato!',
    successBody:
      'Recebemos seu formulário com sucesso e cuidaremos de tudo a partir de agora. Tenha um excelente dia.',
  },
  hearAboutOptions: [
    'Passagem pela região',
    'Corretor',
    'Evento',
    'Internet',
    'Revista',
    'Jornal',
    'Mídia exterior',
    'Indicação',
  ],
};

const copy: Record<Locale, Copy> = { en, es, 'pt-br': ptBr };

export function getCopy(locale: Locale): Copy {
  return copy[locale] ?? en;
}
