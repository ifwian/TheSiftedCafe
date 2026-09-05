/**
 * TestimonialCard
 *
 * Reusable customer-quote card (spec section 21 and section 95).
 */
function TestimonialCard({ quote, name }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-card bg-white p-6 shadow-soft">
      <blockquote className="text-dark/80">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="text-sm font-semibold text-coffee">
        — {name}
      </figcaption>
    </figure>
  )
}

export default TestimonialCard
