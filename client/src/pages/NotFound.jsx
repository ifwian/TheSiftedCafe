import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function NotFound() {
  usePageTitle('Page Not Found')

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <SectionHeading
        align="center"
        eyebrow="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
      />
      <Button to="/">Back to Home</Button>
    </div>
  )
}

export default NotFound
