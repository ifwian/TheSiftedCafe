import SectionHeading from '../common/SectionHeading.jsx'
import Button from '../ui/Button.jsx'

function AboutPreview() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
      <div className="overflow-hidden rounded-card shadow-soft md:order-2">
        <img
          src="https://placehold.co/800x900/C89B6D/211C18?text=Cafe+Interior"
          alt="Interior of The Sifted Cafe"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-5 md:order-1">
        <SectionHeading
          eyebrow="Our Story"
          title="More than just coffee."
          description="A cozy neighborhood cafe made for slow mornings, good conversations, and cups worth coming back for. Whether you are here to relax, meet friends, get some work done, or enjoy a good meal, there is a seat with your name on it."
        />
        <Button to="/about" variant="ghost" className="self-start">
          Learn Our Story →
        </Button>
      </div>
    </section>
  )
}

export default AboutPreview
