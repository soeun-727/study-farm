import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase"; // 이전에 만든 firebase.ts에서 db 가져오기
import type { UserData, CropData, StudyLog } from "../constants/firebase";

//임시 uid
const TEMP_UID = "test_user_123";

export const firebaseService = {
  // 1. 현재 유저 정보 가져오기
  async getCurrentUser(): Promise<UserData | null> {
    const userRef = doc(db, "users", TEMP_UID);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  },

  // 2. 전체 농작물 도감 정보 가져오기
  async getAllCrops(): Promise<CropData[]> {
    const cropsRef = collection(db, "crops");
    const querySnapshot = await getDocs(cropsRef);

    return querySnapshot.docs.map((doc) => doc.data() as CropData);
  },

  // 3. 공부 기록 추가하기 및 유저의 cropProgress 누적하기
  async addStudyLog(log: Omit<StudyLog, "date">, minutes: number) {
    try {
      // A. 유저의 study_logs 하위 컬렉션에 기록 추가
      const userLogRef = collection(db, "users", TEMP_UID, "study_logs");
      await addDoc(userLogRef, {
        ...log,
        duration: minutes,
        date: new Date(), // 현재 시간 저장
      });

      // B. 유저의 현재 농작물 진행도(cropProgress) 업데이트를 위해 유저 정보 호출
      const userRef = doc(db, "users", TEMP_UID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as UserData;
        const newProgress = userData.cropProgress + minutes;

        // C. 업데이트 진행
        await setDoc(userRef, { cropProgress: newProgress }, { merge: true });
        return newProgress;
      }
    } catch (error) {
      console.error("공부 기록 저장 실패:", error);
      throw error;
    }
  },
};
