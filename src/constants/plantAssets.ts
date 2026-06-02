import * as backgrounds from "../assets/cropBackground/cropBackgroundIndex";

export const PLANT_BACKGROUNDS: Record<string, string> = {
  apple: backgrounds.appleBackground,
  banana: backgrounds.bananaBackground,
  blueberry: backgrounds.blueberryBackground,
  corn: backgrounds.cornBackground,
  mango: backgrounds.mangoBackground,
  passionfruit: backgrounds.passionFruitBackground,
  potato: backgrounds.potatoBackground,
  rice: backgrounds.riceBackground,
  starfruit: backgrounds.starFruitBackground,
  strawberry: backgrounds.strawberryBackground,
  sweetpotato: backgrounds.sweetPotatoBackground,
  watermelon: backgrounds.watermelonBackground,
  wheat: backgrounds.wheatBackground,
};

export const DEFAULT_BACKGROUND = backgrounds.appleBackground;
