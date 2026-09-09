/**
 * The gallery photography, keyed by asset id.
 *
 * The id is the filename stem under src/assets/gallery/, which is also the key
 * the translated captions and alt text in src/content/pages/gallery.ts are
 * written against. Keeping the map here rather than inside GalleryGrid lets
 * the listing cards and the listing carousels draw on the same photographs and
 * the same alt text, instead of restating 24 imports per component and letting
 * the two copies drift.
 *
 * Images only. Anything a reader sees in words is translated copy and lives in
 * the content files.
 */
import type { ImageMetadata } from 'astro';

import buildingFromWaterSunset from '../assets/gallery/building-from-water-sunset.jpg';
import lobbyDoubleHeight from '../assets/gallery/lobby-double-height.jpg';
import residenceLivingDiningBayView from '../assets/gallery/residence-living-dining-bay-view.jpg';
import rooftopPoolBar from '../assets/gallery/rooftop-pool-bar.jpg';
import buildingCanalElevation from '../assets/gallery/building-canal-elevation.jpg';
import residenceGreatRoomKitchen from '../assets/gallery/residence-great-room-kitchen.jpg';
import primaryBedroomWaterView from '../assets/gallery/primary-bedroom-water-view.jpg';
import lobbyReceptionDesk from '../assets/gallery/lobby-reception-desk.jpg';
import terracePergolaDining from '../assets/gallery/terrace-pergola-dining.jpg';
import residenceLivingTerraceOpen from '../assets/gallery/residence-living-terrace-open.jpg';
import buildingWaterfrontApproach from '../assets/gallery/building-waterfront-approach.jpg';
import residentsLoungeWoodWall from '../assets/gallery/residents-lounge-wood-wall.jpg';
import primaryBathroomMarble from '../assets/gallery/primary-bathroom-marble.jpg';
import rooftopPoolTerrace from '../assets/gallery/rooftop-pool-terrace.jpg';
import residenceKitchenIsland from '../assets/gallery/residence-kitchen-island.jpg';
import elevatorLobbyBrass from '../assets/gallery/elevator-lobby-brass.jpg';
import residenceCurvedSofaLounge from '../assets/gallery/residence-curved-sofa-lounge.jpg';
import buildingStreetEntrance from '../assets/gallery/building-street-entrance.jpg';
import bedroomWoodPanelling from '../assets/gallery/bedroom-wood-panelling.jpg';
import privateTerraceLounge from '../assets/gallery/private-terrace-lounge.jpg';
import childrensPlayroom from '../assets/gallery/childrens-playroom.jpg';
import residenceLivingBlueRug from '../assets/gallery/residence-living-blue-rug.jpg';
import rooftopDeckSkyline from '../assets/gallery/rooftop-deck-skyline.jpg';
import residenceTerraceToLiving from '../assets/gallery/residence-terrace-to-living.jpg';

export const galleryArt: Record<string, ImageMetadata> = {
  'building-from-water-sunset': buildingFromWaterSunset,
  'lobby-double-height': lobbyDoubleHeight,
  'residence-living-dining-bay-view': residenceLivingDiningBayView,
  'rooftop-pool-bar': rooftopPoolBar,
  'building-canal-elevation': buildingCanalElevation,
  'residence-great-room-kitchen': residenceGreatRoomKitchen,
  'primary-bedroom-water-view': primaryBedroomWaterView,
  'lobby-reception-desk': lobbyReceptionDesk,
  'terrace-pergola-dining': terracePergolaDining,
  'residence-living-terrace-open': residenceLivingTerraceOpen,
  'building-waterfront-approach': buildingWaterfrontApproach,
  'residents-lounge-wood-wall': residentsLoungeWoodWall,
  'primary-bathroom-marble': primaryBathroomMarble,
  'rooftop-pool-terrace': rooftopPoolTerrace,
  'residence-kitchen-island': residenceKitchenIsland,
  'elevator-lobby-brass': elevatorLobbyBrass,
  'residence-curved-sofa-lounge': residenceCurvedSofaLounge,
  'building-street-entrance': buildingStreetEntrance,
  'bedroom-wood-panelling': bedroomWoodPanelling,
  'private-terrace-lounge': privateTerraceLounge,
  'childrens-playroom': childrensPlayroom,
  'residence-living-blue-rug': residenceLivingBlueRug,
  'rooftop-deck-skyline': rooftopDeckSkyline,
  'residence-terrace-to-living': residenceTerraceToLiving,
};

/** Ids in their published mosaic order. */
export const galleryOrder: string[] = Object.keys(galleryArt);
