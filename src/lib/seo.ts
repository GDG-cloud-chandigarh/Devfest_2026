import { CONTACT_EMAIL, SITE_NAME, SOCIAL_LINKS, TICKETS_URL } from "@/lib/constants";

/**
 * Canonical origin for metadata, the sitemap and structured data.
 *
 * Always the production domain, in every environment: a Vercel preview then
 * points its canonical at the live site instead of competing with it in
 * search. NEXT_PUBLIC_SITE_URL overrides it if the domain ever moves.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devfest.gdgcloudchandigarh.com";

/** Search result snippet: about 155 characters, the length engines display. */
export const SITE_DESCRIPTION =
  "DevFest Chandigarh 2026 by GDG Cloud Chandigarh on 24 October: talks, workshops and a hackathon on AI, Google Cloud, Android, Web and Firebase.";

export const KEYWORDS = [
  "DevFest Chandigarh",
  "DevFest 2026",
  "GDG Cloud Chandigarh",
  "Google Developer Groups",
  "Cloud Community Day",
  "tech conference Chandigarh",
  "developer conference Punjab",
  "Google Cloud",
  "Gemini",
  "Android",
  "Firebase",
];

const ORGANIZER = {
  "@type": "Organization",
  name: "GDG Cloud Chandigarh",
  url: "https://gdg.community.dev/gdg-cloud-chandigarh/",
  email: CONTACT_EMAIL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: Object.values(SOCIAL_LINKS),
};

/*
  Venue as listed on the AllEvents ticketing page, the one source for it so
  far. Event rich results need a location, so it has to be here; confirm it.
*/
const VENUE = {
  "@type": "Place",
  name: "Chandigarh University",
  address: {
    "@type": "PostalAddress",
    streetAddress: "NH-05, Ludhiana - Chandigarh Highway",
    addressLocality: "Mohali",
    addressRegion: "Punjab",
    postalCode: "140413",
    addressCountry: "IN",
  },
};

function event(name: string, start: string, description: string) {
  return {
    "@type": "Event",
    name,
    description,
    startDate: start,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: VENUE,
    image: [`${SITE_URL}/opengraph-image`],
    url: SITE_URL,
    organizer: ORGANIZER,
    // No price: prices are kept off the site, AllEvents shows them.
    offers: {
      "@type": "Offer",
      url: TICKETS_URL,
      availability: "https://schema.org/InStock",
    },
  };
}

/** One JSON-LD graph for the page: the organiser and both ticketed events. */
export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    ORGANIZER,
    // Both start at 9:30 IST. Search results show it; the page deliberately does not.
    event(SITE_NAME, "2026-10-24T09:30:00+05:30", SITE_DESCRIPTION),
    event(
      "Cloud Community Day Chandigarh 2026",
      "2026-10-23T09:30:00+05:30",
      "A full day on Google Cloud and AI from GDG Cloud Chandigarh, the day before DevFest."
    ),
  ],
};
