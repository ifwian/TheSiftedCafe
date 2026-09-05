/**
 * SectionHeading
 *
 * The recurring "label above heading" pattern used throughout the site
 * (e.g. spec section 14 "OUR STORY" / "More than just coffee.", section 15
 * "CUSTOMER FAVORITES"). Centralizing it here keeps spacing and type
 * treatment consistent across every section instead of each page
 * re-implementing its own heading block.
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && <span className="text-eyebrow">{eyebrow}</span>}
      {title && <h2>{title}</h2>}
      {description && (
        <p className="max-w-xl text-base text-dark/70">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
