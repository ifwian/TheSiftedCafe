import { useMemo, useState } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import FilterPills from '../components/common/FilterPills.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import GalleryGrid from '../components/gallery/GalleryGrid.jsx'
import GalleryModal from '../components/gallery/GalleryModal.jsx'
import { GALLERY_CATEGORIES, MOCK_GALLERY_PHOTOS } from '../data/mockGallery.js'
import usePageTitle from '../hooks/usePageTitle.js'

/**
 * Gallery
 *
 * Full photo gallery with category filtering and a lightbox (spec section
 * 20). Reads from mock data for now (spec section 107).
 */
function Gallery() {
  usePageTitle('Gallery')

  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(null)

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return MOCK_GALLERY_PHOTOS
    return MOCK_GALLERY_PHOTOS.filter(
      (photo) => photo.category === activeCategory,
    )
  }, [activeCategory])

  const handleClose = () => setSelectedIndex(null)
  const handleNext = () =>
    setSelectedIndex((current) => (current + 1) % filteredPhotos.length)
  const handlePrev = () =>
    setSelectedIndex(
      (current) => (current - 1 + filteredPhotos.length) % filteredPhotos.length,
    )

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        align="center"
        eyebrow="Gallery"
        title="A peek inside The Sifted"
        description="Browse by category, or click any photo for a closer look."
        className="mx-auto mb-10 max-w-xl"
      />

      <div className="mb-10 flex justify-center">
        <FilterPills
          options={['All', ...GALLERY_CATEGORIES]}
          active={activeCategory}
          onChange={(category) => {
            setActiveCategory(category)
            setSelectedIndex(null)
          }}
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <EmptyState
          title="No photos in this category yet."
          description="Try another category."
        />
      ) : (
        <GalleryGrid items={filteredPhotos} onSelect={setSelectedIndex} />
      )}

      <GalleryModal
        items={filteredPhotos}
        selectedIndex={selectedIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}

export default Gallery
