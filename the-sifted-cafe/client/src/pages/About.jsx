import PagePlaceholder from '../components/common/PagePlaceholder.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function About() {
  usePageTitle('About')

  return (
    <PagePlaceholder
      eyebrow="About"
      title="More than just coffee."
      description="Our brand story lands in an upcoming milestone. This route confirms navigation is wired up correctly."
    />
  )
}

export default About
