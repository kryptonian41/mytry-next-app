import { useTheme } from 'utils/color-map'
import React from 'react'

interface Props {
  textPosition?: 'top' | 'bottom',
  rootContainerClasses?: string,
  imageClasses?: string
  imageSrc: string
  title: string,
  subtitle: string
}

const defaultProps: Props = {
  textPosition: 'bottom',
  imageSrc: null,
  subtitle: null,
  title: null
}

export const HomeProductTile = ({ textPosition = 'bottom', imageSrc, subtitle, title }: Props = defaultProps) => {
  const theme = useTheme()

  const textContent = <div className="textContent py-4">
    {title && <p style={{
      color: theme.orange
    }} className="lowercase text-2xl sm:text-3xl mb-3">
      {title}
    </p>}

    {subtitle && <p style={{
      color: theme.green
    }} className="uppercase text-sm sm:text-lg">{subtitle}</p>}
  </div>

  return (
    <div>
      {textPosition === 'top' && textContent}
      {imageSrc && <img src={imageSrc} className="block w-full h-auto" />}
      {textPosition === 'bottom' && textContent}
    </div>
  )
}
