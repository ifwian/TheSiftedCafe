import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { MOCK_GALLERY_PREVIEW } from '../../data/mockGallery.js'

/**
 * A small preview grid linking through to the full Gallery page (with
 * lightbox + categories), which is built in Milestone 06.
 */
function GalleryPreviewGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        align="center"
        eyebrow="Gallery"
        title="A peek inside"
        className="mx-auto mb-12 max-w-xl"
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {MOCK_GALLERY_PREVIEW.map((photo) => (
          <Link
            key={photo.id}
            to="/gallery"
            className="group aspect-square overflow-hidden rounded-card"
          >
            <img
              src={photo.image}
              alt={photo.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button to="/gallery" variant="outline">
          View Full Gallery
        </Button>
      </div>
    </section>
  )
}

export default GalleryPreviewGrid
