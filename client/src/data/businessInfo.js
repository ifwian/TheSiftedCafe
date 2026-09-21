export const BUSINESS_INFO = {
  name: 'The Sifted Café',
  address: {
    line1: 'Unit 2, Pabs2men Building, Chipeco Ave, Brgy. 3',
    line2: 'Calamba, 4027 Laguna, Philippines.',
  },
  hours: [
    { day: 'Cabuyao - Monday to Sunday', time: '10:00 AM - 10:00 PM' },
    { day: 'Calamba - Monday to Sunday', time: '9:00 AM - 9:00 PM' },
  ],
  social: {
    instagram: 'https://www.instagram.com/thesiftedcafe',
    facebook: 'https://www.facebook.com/TheSiftedCafe',
  },
}

export function getFullAddress() {
  return `${BUSINESS_INFO.address.line1}, ${BUSINESS_INFO.address.line2}`
}