import { Timestamp } from "firebase/firestore";

//1. 농작물 데이터 타입
export interface CropData {
  cropId: string;
  cropName: string;
  level: number;
  step: number;
  studyTime: number;
  imageURL?: string;
}

// 2. 유저 데이터 타입
export interface UserData {
  uid: string;
  nickname: string;
  createdAt: Timestamp;
  currentCrop: string;
  level: number;
  cropCount: number;
  cropProgress: number;
  collectedCrops: string[];
}

// 3. 공부 기록 데이터 타입 (하위 컬렉션)
export interface StudyLog {
  id?: string;
  date: Timestamp;
  startTime: string;
  title: string;
  duration: number;
  memo: string;
}
