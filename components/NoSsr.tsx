import dynamic from 'next/dynamic'
import type React from 'react'

const NoSsrWrapper: React.FunctionComponent<{ children: React.ReactNode }> = (
  props
) => props.children

export const NoSsr = dynamic(() => Promise.resolve(NoSsrWrapper), {
  ssr: false,
})
