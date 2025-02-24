import { useEffect, useState } from 'react'

export const useMatchMedia = ({
  mediaQuery,
  onChange,
}: {
  mediaQuery: string
  onChange?: (matches: boolean) => void
}) => {
  const [matching, setMatching] = useState(false)

  useEffect(() => {
    const matchMediaQuery = window.matchMedia(mediaQuery)

    const queryChangeHandler = ({ matches }: MediaQueryListEvent) => {
      setMatching(matches)
      onChange?.(matches)
    }

    matchMediaQuery.addEventListener('change', queryChangeHandler)

    return () => {
      matchMediaQuery.removeEventListener('change', queryChangeHandler)
    }
  }, [mediaQuery, onChange])

  return { matching }
}
