interface ColorMap {
  [category: string]: ColorConfig
}

interface ColorConfig {
  bgColor: string
  panelColor: string
}

export const theme = {
  orange: '#F26722',
  green: '#034a38',
  greenLight: '#3C6A28',
  blue: '#002ab2',
  pink: '#ED2385',
  yellow: '#fffa4d',
  yellowDark: '#f8ec00',
}

export const colorMap: ColorMap = {
  cosmetics: {
    bgColor: '#F26722',
    panelColor: '#FAE6D7',
  },
  facewash: {
    bgColor: '#034A38',
    panelColor: '#F7FAEE',
  },
  default: {
    bgColor: '#002AB2',
    panelColor: '#EDDEEF',
  },
}
