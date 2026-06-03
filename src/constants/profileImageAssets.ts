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

export const CROP_BACKGROUNDS: Record<string, string> = {
  쌀: riceBackground,
  밀: wheatBackground,
  고구마: sweetPotatoBackground,
  감자: potatoBackground,
  옥수수: cornBackground,
  사과: appleBackground,
  딸기: strawberryBackground,
  블루베리: blueberryBackground,
  수박: watermelonBackground,
  바나나: bananaBackground,
  망고: mangoBackground,
  패션후르트: passionFruitBackground,
  스타푸르트: starFruitBackground,
};

export const FARMER_COMPONENTS: Record<number, string> = {
  1: lvl1farmer,
  2: lvl2farmer,
  3: lvl3farmer,
  4: lvl4farmer,
};
