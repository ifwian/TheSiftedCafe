/**
 * Single source of truth for the café's real-world details. Update these
 * once you have the actual business info -- every place that shows an
 * address, hours, or social link reads from here, so you only edit it
 * in one place.
 */
export const BUSINESS_INFO = {
  name: 'The Sifted Cafe',
  address: {
    line1: 'Unit 2, Pabs2men Building, Chipeco Ave, Brgy. 3',
    line2: 'Calamba, 4027 Laguna, Philippines',
  },
  hours: [
    { day: 'Monday – Friday', time: '7:00 AM – 9:00 PM' },
    { day: 'Saturday – Sunday', time: '8:00 AM – 10:00 PM' },
  ],
  social: {
    // Replace with the real profile URLs -- placeholders for now.
    instagram: 'https://www.instagram.com/thesiftedcafe',
    facebook: 'https://www.facebook.com/TheSiftedCafe',
  },
}

export function getFullAddress() {
  return `${BUSINESS_INFO.address.line1}, ${BUSINESS_INFO.address.line2}`
}