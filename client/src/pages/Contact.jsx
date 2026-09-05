import SectionHeading from '../components/common/SectionHeading.jsx'
import ContactForm from '../components/contact/ContactForm.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function Contact() {
  usePageTitle('Contact')

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading
        align="center"
        eyebrow="Contact"
        title="Let's talk soon."
        description="Questions, feedback, or a special request? Send us a message and we'll get back to you."
        className="mx-auto mb-10"
      />
      <ContactForm />
    </div>
  )
}

export default Contact
