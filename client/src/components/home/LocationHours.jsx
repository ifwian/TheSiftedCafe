import SectionHeading from '../common/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { BUSINESS_INFO, getFullAddress } from '../../data/businessInfo.js'

/**
 * Address and hours come from data/businessInfo.js -- update that one
 * file with real details and this section (plus the Footer) picks it up
 * automatically.
 *
 * The map embed uses Google's keyless "output=embed" query format, which
 * works without an API key for a basic address search. If Google ever
 * requires a key for this in the future, switch to the official Maps
 * Embed API (console.cloud.google.com) and pass an API key instead.
 */
function LocationHours() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(getFullAddress())}&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(getFullAddress())}`

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-10 rounded-card bg-white p-8 shadow-soft md:grid-cols-2 md:p-12">
        <div className="flex flex-col gap-5">
          <SectionHeading eyebrow="Visit Us" title={BUSINESS_INFO.name} />
          <address className="not-italic leading-relaxed text-dark/70">
            {BUSINESS_INFO.address.line1}
            <br />
            {BUSINESS_INFO.address.line2}
          </address>
          <div className="flex flex-col gap-1">
            {BUSINESS_INFO.hours.map((hours) => (
              <div
                key={hours.day}
                className="flex justify-between gap-4 text-sm text-dark/70"
              >
                <span>{hours.day}</span>
                <span className="font-medium text-dark">{hours.time}</span>
              </div>
            ))}
          </div>
          <Button href={directionsUrl} variant="outline" className="self-start">
            Get Directions
          </Button>
        </div>
        <div className="overflow-hidden rounded-card">
          <iframe
            title={`Map to ${BUSINESS_INFO.name}`}
            src={mapEmbedUrl}
            className="h-full min-h-[280px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default LocationHours
