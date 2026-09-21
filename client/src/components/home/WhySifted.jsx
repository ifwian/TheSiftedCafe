import SectionHeading from '../common/SectionHeading.jsx'

const REASONS = [
  {
    title: 'Thoughtfully Roasted',
    description:
      'Beans sourced and roasted with care, brewed the way they deserve to be.',
  },
  {
    title: 'Made Fresh Daily',
    description:
      'Pastries and food prepared fresh each morning, never sitting around.',
  },
  {
    title: 'A Place to Stay Awhile',
    description:
      'Comfortable seating and a calm atmosphere, whether you are working or catching up with friends.',
  },
  {
    title: 'Warm, Familiar Service',
    description:
      'A team that remembers your order and genuinely enjoys having you here.',
  },
]

function WhySifted() {
  return (
    <section className="bg-white/60 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          align="center"
          eyebrow="Why The Sifted"
          title="What makes it feel like home"
          className="mx-auto mb-12 max-w-xl"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col gap-2 border-t-2 border-coffee pt-4"
            >
              <h3 className="text-lg">{reason.title}</h3>
              <p className="text-sm text-dark/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhySifted
