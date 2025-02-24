import type React from 'react'
import Header, { type HeaderProps } from './Header'

interface LayoutProps extends HeaderProps {
  children: React.ReactNode
}

export const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <>
      <Header title={title} description={description} keywords={keywords} />
      {children}
    </>
  )
}

export default Layout
