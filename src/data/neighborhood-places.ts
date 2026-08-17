/**
 * NEIGHBOURHOOD LOCATOR DATA — generated, then committed. Do not hand-edit
 * coordinates without re-checking them on a map.
 *
 * Built from the owner's categorised list. Coordinates come from three places,
 * recorded per entry in `how`: geocoded from OpenStreetMap, supplied by the
 * owner, or inherited from a parent venue the list itself named (every tenant
 * of Bal Harbour Shops shares the mall's pin, as do the restaurants inside the
 * St. Regis, the Ritz-Carlton and the Four Seasons).
 *
 * `x` and `y` are percentages within the basemap's viewBox, projected with the
 * SAME Web Mercator bounds the basemap SVG was generated from. Changing the
 * basemap's bounds invalidates every one of them — regenerate both together.
 *
 * Roads, routes and areas from the source list (Collins Avenue, the causeway,
 * bus and shuttle routes, the public-art programmes) are deliberately absent:
 * they are not single points and a pin would misrepresent them.
 */
export interface Place {
  /** Marker number, unique and stable across category filters. */
  n: number;
  name: string;
  cats: string[];
  lat: number;
  lng: number;
  /** Percent of the basemap viewBox, from its left / top edge. */
  x: number;
  y: number;
  how: string;
}

/** Filter order, as the chips appear.

    Arts & Culture is absent: every entry in it was either a programme rather
    than a place, or could not be located.

    Three of the owner's original headings were folded together, so the source
    list and this array no longer match one-for-one:
      · "Best Bars & Restaurants" + "Best Cafés"
          -> "Top Cafés, Bars & Restaurants"
      · "Shopping at Bal Harbour Shops" + "Dining at Bal Harbour Shops"
          -> "Bal Harbour Shops"
      · "Transportation" removed. Its only entry, Haulover Marina & Marine
        Center, had no other category and went with it — which is why the
        marker numbers below stop at 77 rather than 78. */
export const CATEGORIES = ["Beaches", "Waterfront Dining", "Top Cafés, Bars & Restaurants", "Bal Harbour Shops", "5-Star Hotels", "Parks & Recreation", "Places of Worship", "Top-Rated Schools", "Unique Landmarks"] as const;

/** The building itself. Always on the map, in every category. */
export const SITE = {
  x: 73.816,
  y: 63.377,
  lat: 25.8879,
  lng: -80.1339,
};

export const PLACES: Place[] = [
    {
      "name": "Bal Harbour Beach",
      "cats": [
        "Beaches"
      ],
      "lat": 25.888895,
      "lng": -80.121028,
      "x": 90.753,
      "y": 62.362,
      "how": "owner-supplied",
      "n": 1
    },
    {
      "name": "Haulover Beach",
      "cats": [
        "Beaches"
      ],
      "lat": 25.907546,
      "lng": -80.121019,
      "x": 90.764,
      "y": 43.331,
      "how": "owner-supplied",
      "n": 2
    },
    {
      "name": "Haulover Inlet / Jetty Beach Area",
      "cats": [
        "Beaches"
      ],
      "lat": 25.904487,
      "lng": -80.126204,
      "x": 83.942,
      "y": 46.452,
      "how": "inside Haulover Inlet",
      "n": 3
    },
    {
      "name": "North Shore Beach",
      "cats": [
        "Beaches"
      ],
      "lat": 25.857706,
      "lng": -80.123692,
      "x": 87.247,
      "y": 94.18,
      "how": "geocoded",
      "n": 4
    },
    {
      "name": "Sunny Isles Beach",
      "cats": [
        "Beaches"
      ],
      "lat": 25.942691,
      "lng": -80.121849,
      "x": 89.672,
      "y": 7.461,
      "how": "geocoded",
      "n": 5
    },
    {
      "name": "Surfside Beach",
      "cats": [
        "Beaches"
      ],
      "lat": 25.884983,
      "lng": -80.120592,
      "x": 91.326,
      "y": 66.353,
      "how": "owner-supplied",
      "n": 6
    },
    {
      "name": "Artisan Beach House",
      "cats": [
        "Waterfront Dining"
      ],
      "lat": 25.898609,
      "lng": -80.123405,
      "x": 87.625,
      "y": 52.45,
      "how": "inside The Ritz-Carlton Bal Harbour",
      "n": 7
    },
    {
      "name": "Atlantikós",
      "cats": [
        "Waterfront Dining",
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.888868,
      "lng": -80.122748,
      "x": 88.489,
      "y": 62.389,
      "how": "inside The St. Regis Bal Harbour Resort",
      "n": 8
    },
    {
      "name": "Lido Restaurant at The Surf Club",
      "cats": [
        "Waterfront Dining",
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.877318,
      "lng": -80.121166,
      "x": 90.571,
      "y": 74.173,
      "how": "inside Four Seasons Hotel at The Surf Club",
      "n": 9
    },
    {
      "name": "The Surf Club Restaurant",
      "cats": [
        "Waterfront Dining",
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.877318,
      "lng": -80.121166,
      "x": 90.571,
      "y": 74.173,
      "how": "inside Four Seasons Hotel at The Surf Club",
      "n": 10
    },
    {
      "name": "Water’s Edge",
      "cats": [
        "Waterfront Dining"
      ],
      "lat": 25.898609,
      "lng": -80.123405,
      "x": 87.625,
      "y": 52.45,
      "how": "inside The Ritz-Carlton Bal Harbour",
      "n": 11
    },
    {
      "name": "Carpaccio",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 12
    },
    {
      "name": "China Grill",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 13
    },
    {
      "name": "Makoto",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 14
    },
    {
      "name": "Neya",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.885036,
      "lng": -80.123349,
      "x": 87.699,
      "y": 66.299,
      "how": "geocoded",
      "n": 15
    },
    {
      "name": "Slim’s",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 16
    },
    {
      "name": "The Palm",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.887452,
      "lng": -80.129554,
      "x": 79.534,
      "y": 63.834,
      "how": "geocoded",
      "n": 17
    },
    {
      "name": "The St. Regis Bar",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.888868,
      "lng": -80.122748,
      "x": 88.489,
      "y": 62.389,
      "how": "inside The St. Regis Bal Harbour Resort",
      "n": 18
    },
    {
      "name": "Avenue 31 Café",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 19
    },
    {
      "name": "Café en 3",
      "cats": [
        "Top Cafés, Bars & Restaurants",
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 20
    },
    {
      "name": "Josh’s Deli",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.885689,
      "lng": -80.123368,
      "x": 87.674,
      "y": 65.633,
      "how": "geocoded",
      "n": 21
    },
    {
      "name": "La Gourmandise",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.888868,
      "lng": -80.122748,
      "x": 88.489,
      "y": 62.389,
      "how": "inside The St. Regis Bal Harbour Resort",
      "n": 22
    },
    {
      "name": "Pura Vida Miami",
      "cats": [
        "Top Cafés, Bars & Restaurants"
      ],
      "lat": 25.88699,
      "lng": -80.129396,
      "x": 79.742,
      "y": 64.305,
      "how": "geocoded",
      "n": 23
    },
    {
      "name": "Audemars Piguet",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 24
    },
    {
      "name": "Balenciaga",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 25
    },
    {
      "name": "Bottega Veneta",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 26
    },
    {
      "name": "Brioni",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 27
    },
    {
      "name": "Brunello Cucinelli",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 28
    },
    {
      "name": "Buccellati",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 29
    },
    {
      "name": "Bulgari",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 30
    },
    {
      "name": "Celine",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 31
    },
    {
      "name": "Chanel",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 32
    },
    {
      "name": "Chopard",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 33
    },
    {
      "name": "Dolce & Gabbana",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 34
    },
    {
      "name": "Fendi",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 35
    },
    {
      "name": "Goyard",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 36
    },
    {
      "name": "Graff",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 37
    },
    {
      "name": "Gucci",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 38
    },
    {
      "name": "Harry Winston",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 39
    },
    {
      "name": "Loewe",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 40
    },
    {
      "name": "Loro Piana",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 41
    },
    {
      "name": "Neiman Marcus",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 42
    },
    {
      "name": "Prada",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 43
    },
    {
      "name": "Richard Mille",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 44
    },
    {
      "name": "Rolex",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 45
    },
    {
      "name": "Saint Laurent",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 46
    },
    {
      "name": "Saks Fifth Avenue",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 47
    },
    {
      "name": "The Webster",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 48
    },
    {
      "name": "Tiffany & Co.",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 49
    },
    {
      "name": "Valentino",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 50
    },
    {
      "name": "Van Cleef & Arpels",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 51
    },
    {
      "name": "Versace",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 52
    },
    {
      "name": "Carrie’s at Neiman Marcus",
      "cats": [
        "Bal Harbour Shops"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "inside Bal Harbour Shops",
      "n": 53
    },
    {
      "name": "Four Seasons Hotel at The Surf Club",
      "cats": [
        "5-Star Hotels",
        "Unique Landmarks"
      ],
      "lat": 25.877318,
      "lng": -80.121166,
      "x": 90.571,
      "y": 74.173,
      "how": "geocoded",
      "n": 54
    },
    {
      "name": "The Ritz-Carlton Bal Harbour, Miami",
      "cats": [
        "5-Star Hotels"
      ],
      "lat": 25.898609,
      "lng": -80.123405,
      "x": 87.625,
      "y": 52.45,
      "how": "inside The Ritz-Carlton Bal Harbour",
      "n": 55
    },
    {
      "name": "The St. Regis Bal Harbour Resort",
      "cats": [
        "5-Star Hotels"
      ],
      "lat": 25.888868,
      "lng": -80.122748,
      "x": 88.489,
      "y": 62.389,
      "how": "geocoded",
      "n": 56
    },
    {
      "name": "95th Street Park",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.885977,
      "lng": -80.132932,
      "x": 75.089,
      "y": 65.339,
      "how": "geocoded",
      "n": 57
    },
    {
      "name": "Bal Harbour Waterfront Park",
      "cats": [
        "Parks & Recreation",
        "Unique Landmarks"
      ],
      "lat": 25.887507,
      "lng": -80.127432,
      "x": 82.326,
      "y": 63.778,
      "how": "geocoded",
      "n": 58
    },
    {
      "name": "Haulover Dog Park",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.902596,
      "lng": -80.121945,
      "x": 89.546,
      "y": 48.382,
      "how": "geocoded",
      "n": 59
    },
    {
      "name": "Haulover Inlet & Jetty",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.904487,
      "lng": -80.126204,
      "x": 83.942,
      "y": 46.452,
      "how": "inside Haulover Inlet",
      "n": 60
    },
    {
      "name": "Haulover Marina",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.903658,
      "lng": -80.124437,
      "x": 86.267,
      "y": 47.298,
      "how": "geocoded",
      "n": 61
    },
    {
      "name": "Haulover Park",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.910944,
      "lng": -80.123238,
      "x": 87.845,
      "y": 39.863,
      "how": "geocoded",
      "n": 62
    },
    {
      "name": "Indian Creek Country Club",
      "cats": [
        "Parks & Recreation",
        "Unique Landmarks"
      ],
      "lat": 25.879245,
      "lng": -80.13641,
      "x": 70.513,
      "y": 72.207,
      "how": "geocoded",
      "n": 63
    },
    {
      "name": "North Beach Oceanside Park",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.864684,
      "lng": -80.120172,
      "x": 91.879,
      "y": 87.062,
      "how": "geocoded",
      "n": 64
    },
    {
      "name": "Officer Scott Winters Park",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.888886,
      "lng": -80.132086,
      "x": 76.203,
      "y": 62.371,
      "how": "geocoded",
      "n": 65
    },
    {
      "name": "Surfside Tennis Center",
      "cats": [
        "Parks & Recreation"
      ],
      "lat": 25.872779,
      "lng": -80.121951,
      "x": 89.538,
      "y": 78.804,
      "how": "geocoded",
      "n": 66
    },
    {
      "name": "St. Joseph Catholic Church",
      "cats": [
        "Places of Worship"
      ],
      "lat": 25.872266,
      "lng": -80.123533,
      "x": 87.457,
      "y": 79.327,
      "how": "geocoded",
      "n": 67
    },
    {
      "name": "The Shul of Bal Harbour",
      "cats": [
        "Places of Worship"
      ],
      "lat": 25.88603,
      "lng": -80.122931,
      "x": 88.249,
      "y": 65.285,
      "how": "geocoded",
      "n": 68
    },
    {
      "name": "Young Israel of Bal Harbour",
      "cats": [
        "Places of Worship"
      ],
      "lat": 25.886747,
      "lng": -80.124929,
      "x": 85.62,
      "y": 64.553,
      "how": "geocoded",
      "n": 69
    },
    {
      "name": "Miami Country Day School",
      "cats": [
        "Top-Rated Schools"
      ],
      "lat": 25.874262,
      "lng": -80.183936,
      "x": 7.979,
      "y": 77.291,
      "how": "geocoded",
      "n": 70
    },
    {
      "name": "Norman S. Edelcup / Sunny Isles Beach K-8",
      "cats": [
        "Top-Rated Schools"
      ],
      "lat": 25.944894,
      "lng": -80.12307,
      "x": 88.066,
      "y": 5.212,
      "how": "geocoded",
      "n": 71
    },
    {
      "name": "Bal Harbour Shops",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.888223,
      "lng": -80.124979,
      "x": 85.554,
      "y": 63.047,
      "how": "geocoded",
      "n": 72
    },
    {
      "name": "Haulover Inlet",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.904487,
      "lng": -80.126204,
      "x": 83.942,
      "y": 46.452,
      "how": "geocoded",
      "n": 73
    },
    {
      "name": "Kane Concourse",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.88661,
      "lng": -80.135208,
      "x": 72.095,
      "y": 64.693,
      "how": "geocoded",
      "n": 74
    },
    {
      "name": "The Ritz-Carlton Bal Harbour",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.898609,
      "lng": -80.123405,
      "x": 87.625,
      "y": 52.45,
      "how": "geocoded",
      "n": 75
    },
    {
      "name": "The St. Regis Bal Harbour Resort & Residences",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.888868,
      "lng": -80.122748,
      "x": 88.489,
      "y": 62.389,
      "how": "inside The St. Regis Bal Harbour Resort",
      "n": 76
    },
    {
      "name": "The Surf Club",
      "cats": [
        "Unique Landmarks"
      ],
      "lat": 25.877318,
      "lng": -80.121166,
      "x": 90.571,
      "y": 74.173,
      "how": "inside Four Seasons Hotel at The Surf Club",
      "n": 77
    }
  ];
