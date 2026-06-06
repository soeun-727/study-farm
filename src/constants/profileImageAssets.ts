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
  rice: riceBackground, // 쌀
  wheat: wheatBackground, // 밀
  sweet_potato: sweetPotatoBackground, // 고구마 (또는 본인이 정한 영문 ID)
  potato: potatoBackground, // 감자
  corn: cornBackground, // 옥수수
  apple: appleBackground, // 사과
  strawberry: strawberryBackground, // 딸기
  blueberry: blueberryBackground, // 블루베리
  watermelon: watermelonBackground, // 수박
  banana: bananaBackground, // 바나나
  mango: mangoBackground, // 망고
  passion_fruit: passionFruitBackground, // 패션후르트
  star_fruit: starFruitBackground, // 스타푸르트
};

export const FARMER_COMPONENTS: Record<number, string> = {
  1: lvl1farmer,
  2: lvl2farmer,
  3: lvl3farmer,
  4: lvl4farmer,
};
