import SectionHeading from '../components/common/SectionHeading.jsx'
import ReservationForm from '../components/reservation/ReservationForm.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function Reservation() {
  usePageTitle('Reservation')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading
        align="center"
        eyebrow="Reservation"
        title="Reserve your table"
        description="Tell us when you're coming and how many, and we'll take it from there. Your request starts as pending until we confirm it."
        className="mx-auto mb-10"
      />
      <ReservationForm />
    </div>
  )
}

export default Reservation
