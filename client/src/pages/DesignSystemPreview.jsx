import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'

/**
 * DesignSystemPreview
 *
 * Internal reference page for the Milestone 02 design tokens and base
 * components. Not linked from the Navbar or Footer — reachable directly at
 * /design-system for development/QA purposes only.
 */
function Swatch({ name, className, textClass = 'text-white' }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card shadow-soft">
      <div className={`h-20 ${className}`} />
      <div className="bg-white px-3 py-2">
        <p
          className={`text-xs font-semibold ${
            textClass === 'text-white' ? 'text-dark' : textClass
          }`}
        >
          {name}
        </p>
      </div>
    </div>
  )
}

function DesignSystemPreview() {
  return (
    <div className="px-6 py-16 text-dark">
      <div className="mx-auto flex max-w-4xl flex-col gap-16">
        <header>
          <span className="text-eyebrow">Milestone 02</span>
          <h1 className="mt-2">Design System Preview</h1>
          <p className="mt-3 max-w-xl text-dark/70">
            A quick reference for the tokens and base components introduced
            in this milestone.
          </p>
        </header>

        {/* Color palette */}
        <section className="flex flex-col gap-4">
          <SectionHeading eyebrow="Tokens" title="Color palette" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            <Swatch name="Cream (bg)" className="bg-cream border border-dark/10" />
            <Swatch name="Dark" className="bg-dark" />
            <Swatch name="Coffee" className="bg-coffee" />
            <Swatch name="Accent" className="bg-accent" textClass="text-dark" />
            <Swatch name="White" className="bg-white border border-dark/10" />
          </div>
        </section>

        {/* Typography */}
        <section className="flex flex-col gap-4">
          <SectionHeading eyebrow="Tokens" title="Typography" />
          <div className="flex flex-col gap-3 rounded-card bg-white p-6 shadow-soft">
            <p className="text-display">Good coffee.</p>
            <h1>Heading 1 — Playfair Display</h1>
            <h2>Heading 2 — Playfair Display</h2>
            <h3>Heading 3 — Playfair Display</h3>
            <p className="text-dark/80">
              Body text uses Inter for maximum readability across menu
              descriptions, forms, and paragraphs.
            </p>
            <span className="text-eyebrow">Eyebrow label style</span>
          </div>
        </section>

        {/* Buttons */}
        <section className="flex flex-col gap-4">
          <SectionHeading eyebrow="Components" title="Buttons" />
          <div className="flex flex-wrap items-center gap-4 rounded-card bg-white p-6 shadow-soft">
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </section>

        {/* SectionHeading */}
        <section className="flex flex-col gap-4">
          <SectionHeading eyebrow="Components" title="Section heading" />
          <div className="rounded-card bg-white p-6 shadow-soft">
            <SectionHeading
              align="center"
              eyebrow="Our Story"
              title="More than just coffee."
              description="A cozy neighborhood café made for slow mornings, good conversations, and cups worth coming back for."
              className="mx-auto"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystemPreview
