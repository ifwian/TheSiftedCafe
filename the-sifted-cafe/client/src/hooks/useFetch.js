import { useEffect, useRef, useState } from 'react'

/**
 * useFetch
 *
 * Runs an async fetcher on mount (and whenever `deps` changes), exposing
 * the states every API-driven view needs (spec section 53): loading,
 * data, error, and a `refetch` escape hatch for retry buttons.
 *
 * The "latest ref" pattern below keeps `fetcher` fresh across re-renders
 * without listing it in the effect's dependency array (it's often a new
 * function reference every render) and without mutating a ref during
 * render itself.
 */
function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [reloadToken, setReloadToken] = useState(0)

  const fetcherRef = useRef(fetcher)
  useEffect(() => {
    fetcherRef.current = fetcher
  })

  useEffect(() => {
    let cancelled = false

    fetcherRef
      .current()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setError(null)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadToken])

  function refetch() {
    setIsLoading(true)
    setError(null)
    setReloadToken((token) => token + 1)
  }

  return { data, error, isLoading, refetch }
}

export default useFetch
