import { useEffect } from 'react'

/**
 * usePageTitle
 *
 * Sets document.title per page (spec section 63 -- "meaningful title").
 * Restores the previous title on unmount so navigating away doesn't
 * leave a stale title if something else expects the default.
 */
function usePageTitle(title) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title ? `${title} | The Sifted Cafe` : 'The Sifted Cafe'

    return () => {
      document.title = previousTitle
    }
  }, [title])
}

export default usePageTitle
