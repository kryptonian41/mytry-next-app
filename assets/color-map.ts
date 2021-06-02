import { Category } from "types/commons"

interface ColorMap {
  [category: string]: ColorConfig
}

interface ColorConfig {
  bgColor: string
  panelColor: string
}


export const colorMap: ColorMap = {
  'cosmetics': {
    bgColor: '#004C37',
    panelColor: '#F26722'
  },
  'facewash': {
    bgColor: '#002AB2',
    panelColor: '#ED2385'
  },
  default: {
    bgColor: '#002AB2',
    panelColor: '#ED2385'
  }
}

export const getColorSchemeByCategory = (categories: Category[]) => {
  for (let category of categories) {
    if (colorMap[category.name]) return colorMap[category.name]
  }
  return colorMap.default
}