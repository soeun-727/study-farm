import { lvl1farmer, lvl2farmer, lvl3farmer, lvl4farmer } from "../assets";
import {
  riceBackground,
  wheatBackground,
  sweetPotatoBackground,
  potatoBackground,
  cornBackground,
  appleBackground,
  strawberryBackground,
  blueberryBackground,
  watermelonBackground,
  bananaBackground,
  mangoBackground,
  passionFruitBackground,
  starFruitBackground,
} from "../assets/cropBackground/cropBackgroundIndex";

export const CROP_DATA_MAP: Record<string, { bg: string; name: string }> = {
  rice: { bg: riceBackground, name: "쌀" },
  wheat: { bg: wheatBackground, name: "밀" },
  sweet_potato: { bg: sweetPotatoBackground, name: "고구마" },
  potato: { bg: potatoBackground, name: "감자" },
  corn: { bg: cornBackground, name: "옥수수" },
  apple: { bg: appleBackground, name: "사과" },
  strawberry: { bg: strawberryBackground, name: "딸기" },
  blueberry: { bg: blueberryBackground, name: "블루베리" },
  watermelon: { bg: watermelonBackground, name: "수박" },
  banana: { bg: bananaBackground, name: "바나나" },
  mango: { bg: mangoBackground, name: "망고" },
  passion_fruit: { bg: passionFruitBackground, name: "패션후르트" },
  star_fruit: { bg: starFruitBackground, name: "스타푸르트" },
};

export const FARMER_COMPONENTS: Record<number, string> = {
  1: lvl1farmer,
  2: lvl2farmer,
  3: lvl3farmer,
  4: lvl4farmer,
};
