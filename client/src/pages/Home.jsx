import usePageTitle from '../hooks/usePageTitle.js'
import Hero from '../components/home/Hero.jsx'
import AboutPreview from '../components/home/AboutPreview.jsx'
import FeaturedMenuSection from '../components/menu/FeaturedMenuSection.jsx'
import WhySifted from '../components/home/WhySifted.jsx'
import GalleryPreviewGrid from '../components/gallery/GalleryPreviewGrid.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import LocationHours from '../components/home/LocationHours.jsx'
import ReservationCTA from '../components/home/ReservationCTA.jsx'

/**
 * Homepage section order follows spec section 10:
 * Navbar (in PublicLayout) -> Hero -> About preview -> Featured menu ->
 * Why The Sifted -> Gallery preview -> Testimonials -> Location and hours
 * -> Reservation CTA -> Footer (in PublicLayout).
 */
function Home() {
  usePageTitle()

  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedMenuSection />
      <WhySifted />
      <GalleryPreviewGrid />
      <Testimonials />
      <LocationHours />
      <ReservationCTA />
    </>
  )
}

export default Home
