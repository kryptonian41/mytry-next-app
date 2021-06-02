import { useState } from "react"
import { Category } from "types/commons"

interface ColorMap {
  [category: string]: ColorConfig
}

interface ColorConfig {
  bgColor: string
  panelColor: string
}


const appTheme = {
  orange: '#F26722',
  green: '#034a38',
  blue: '#002ab2',
  pink: '#ED2385',
  yellow: '#fffa4d',
  yellowDark: '#f8ec00'
}


export const colorMap: ColorMap = {
  'cosmetics': {
    bgColor: appTheme.blue,
    panelColor: appTheme.pink
  },
  'facewash': {
    bgColor: appTheme.green,
    panelColor: appTheme.orange
  },
  default: {
    bgColor: appTheme.green,
    panelColor: appTheme.orange
  }
}

export const getColorSchemeByCategory = (categories: Category[]) => {
  for (let category of categories) {
    if (colorMap[category.name]) return colorMap[category.name]
  }
  return colorMap.default
}

export const useTheme = () => {
  const [theme, setTheme] = useState(appTheme)
  return theme
}