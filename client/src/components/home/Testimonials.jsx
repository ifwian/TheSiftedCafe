import SectionHeading from '../common/SectionHeading.jsx'
import TestimonialCard from '../common/TestimonialCard.jsx'
import LoadingState from '../common/LoadingState.jsx'
import useFetch from '../../hooks/useFetch.js'
import { getPublishedReviews } from '../../services/reviewService.js'

/**
 * Testimonials homepage section. Fetches published reviews from
 * GET /api/reviews -- no mock data (replaced once Reviews management
 * shipped).
 */
function Testimonials() {
  const { data: reviews, isLoading } = useFetch(getPublishedReviews, [])

  if (!isLoading && (!reviews || reviews.length === 0)) {
    return null
  }

  return (
    <section className="bg-white/60 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What our customers say"
          className="mx-auto mb-12 max-w-xl"
        />

        {isLoading ? (
          <LoadingState label="Loading reviews…" />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <TestimonialCard
                key={review.id}
                quote={review.comment}
                name={review.customerName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
