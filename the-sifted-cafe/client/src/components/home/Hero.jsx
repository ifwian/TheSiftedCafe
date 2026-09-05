import { motion } from 'framer-motion'
import Button from '../ui/Button.jsx'

/**
 * Hero
 *
 * `-mt-20` pulls the section up to cover PublicLayout's `pt-20` spacer, so
 * the hero sits flush at the top of the viewport, under the transparent
 * fixed Navbar, instead of leaving a visible gap above it.
 */
function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-[85vh] items-center justify-center overflow-hidden bg-dark text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://placehold.co/1600x1000/211C18/6F4E37?text=The+Sifted+Cafe')",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-32 text-center"
      >
        <span className="text-eyebrow text-accent">The Sifted Cafe</span>
        <h1 className="text-display text-white">
          Good coffee.
          <br />
          Good food.
          <br />
          Good people.
        </h1>
        <p className="max-w-md text-base text-white/80">
          A cozy space to slow down, sip something good, and enjoy the
          moment.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button to="/menu" variant="accent" size="lg">
            View Menu
          </Button>
          <Button to="/reservation" variant="outlineLight" size="lg">
            Reserve a Table
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
