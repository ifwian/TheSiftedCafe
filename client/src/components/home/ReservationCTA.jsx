import Button from '../ui/Button.jsx'

function ReservationCTA() {
  return (
    <section className="bg-coffee px-6 py-20 text-center text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
        <span className="text-eyebrow text-accent">Reserve a Table</span>
        <h2 className="text-white">Save your seat for something good.</h2>
        <p className="text-white/80">
          Whether it&apos;s a quiet morning or an evening catch-up, we&apos;ll
          have a table ready.
        </p>
        <Button to="/reservation" variant="accent" size="lg">
          Reserve a Table
        </Button>
      </div>
    </section>
  )
}

export default ReservationCTA
