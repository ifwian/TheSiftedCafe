import SectionHeading from './SectionHeading.jsx'

/**
 * PagePlaceholder
 *
 * Temporary content for public routes whose real UI hasn't been built yet.
 * Used only during incremental development (spec section 6 — build in
 * stages) so each route is reachable and testable before its milestone
 * lands, without faking finished functionality (spec section 106).
 */
function PagePlaceholder({ eyebrow, title, description }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <SectionHeading
        align="center"
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
    </div>
  )
}

export default PagePlaceholder
