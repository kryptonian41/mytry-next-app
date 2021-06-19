import { Category } from "types/commons";

interface ColorMap {
  [category: string]: ColorConfig;
}

interface ColorConfig {
  bgColor: string;
  panelColor: string;
}

const theme = {
  orange: "#F26722",
  green: "#034a38",
  greenLight: "#3C6A28",
  blue: "#002ab2",
  pink: "#ED2385",
  yellow: "#fffa4d",
  yellowDark: "#f8ec00",
};

export const colorMap: ColorMap = {
  cosmetics: {
    bgColor: theme.blue,
    panelColor: theme.pink,
  },
  facewash: {
    bgColor: theme.green,
    panelColor: theme.orange,
  },
  default: {
    bgColor: theme.green,
    panelColor: theme.orange,
  },
};

export const newColorMaps = [
  {
    bgColor: "#F26722",
    panelColor: "#FAE6D7",
  },
  {
    bgColor: "#F26722",
    panelColor: "#FAE6D7",
  },
  {
    bgColor: "#F26722",
    panelColor: "#FAE6D7",
  },
];

export const getColorSchemeByCategory = (categories: Category[]) => {
  // for (let category of categories) {
  //   if (colorMap[category.name]) return colorMap[category.name];
  // }
  // return colorMap.default;
  return newColorMaps[0];
};

export const useTheme = () => {
  return theme;
};
