import { Link } from 'react-router-dom'

/**
 * Button
 *
 * Central button component for the whole app. Every CTA in the spec
 * ("VIEW MENU", "RESERVE A TABLE", "REQUEST RESERVATION", etc.) should use
 * this component instead of one-off styled <button> tags, so the button
 * system stays consistent (spec section 109 — Design Consistency).
 *
 * Renders a react-router <Link> when `to` is provided, otherwise a native
 * <button>, so it works for both navigation CTAs and form actions.
 *
 * Variants:
 *  - primary   solid coffee-brown fill (default, highest emphasis)
 *  - accent    solid warm-accent fill (used sparingly, e.g. hero CTA)
 *  - outline   bordered, transparent fill (secondary emphasis)
 *  - outlineLight  bordered in white, for use on dark backgrounds (e.g. hero)
 *  - ghost     no border/fill, text-only (low emphasis, e.g. "Back to Menu")
 *  - danger    solid red fill, for destructive confirmations (e.g. "Delete")
 */
const VARIANT_STYLES = {
  primary:
    'bg-coffee text-white hover:bg-coffee-dark active:bg-coffee-dark disabled:bg-coffee/50',
  accent:
    'bg-accent text-dark hover:bg-accent-dark active:bg-accent-dark disabled:bg-accent/50',
  outline:
    'bg-transparent text-dark border border-dark/20 hover:border-dark/40 hover:bg-dark/[0.03] active:bg-dark/[0.06]',
  outlineLight:
    'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 active:bg-white/15',
  ghost:
    'bg-transparent text-coffee hover:text-coffee-dark hover:bg-coffee/5 active:bg-coffee/10',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-700 disabled:bg-red-600/50',
}

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const BASE_STYLES =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
  'tracking-wide transition-colors duration-200 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee ' +
  'disabled:cursor-not-allowed disabled:pointer-events-none'

function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = [
    BASE_STYLES,
    VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary,
    SIZE_STYLES[size] ?? SIZE_STYLES.md,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={props.type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
