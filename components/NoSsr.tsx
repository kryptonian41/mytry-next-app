import dynamic from 'next/dynamic'
import React from 'react'

const NoSsrWrapper: React.FunctionComponent<{ children: React.ReactNode }> = (
  props
) => <React.Fragment>{props.children}</React.Fragment>

export const NoSsr = dynamic(() => Promise.resolve(NoSsrWrapper), {
  ssr: false,
})
