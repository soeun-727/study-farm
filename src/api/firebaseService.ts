// src/services/firebaseService.ts 에 추가 또는 확인
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserData, StudyLog } from "../constants/firebase";

const TEMP_UID = "user_uid";

export const firebaseService = {
  // 유저 프로필 데이터 가져오기
  async getCurrentUser(): Promise<UserData | null> {
    const userRef = doc(db, "users", TEMP_UID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  },

  // 유저의 공부 기록 하위 컬렉션 전체 가져오기
  async getStudyLogs(): Promise<StudyLog[]> {
    const logsRef = collection(db, "users", TEMP_UID, "study_logs");
    const querySnapshot = await getDocs(logsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StudyLog[];
  },

  //타이머 api
  async saveStudyLog(studyData: {
    startTime: string;
    title: string;
    duration: number;
    memo: string;
  }) {
    try {
      const logsRef = collection(db, "users", TEMP_UID, "study_logs");
      await addDoc(logsRef, {
        title: studyData.title,
        startTime: studyData.startTime,
        duration: studyData.duration,
        memo: studyData.memo,
        date: serverTimestamp(),
      });

      const userRef = doc(db, "users", TEMP_UID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const currentProgress = userSnap.data().cropProgress || 0;
        await setDoc(
          userRef,
          {
            cropProgress: currentProgress + studyData.duration,
          },
          { merge: true },
        );

        console.log("DB 저장 및 누적 업데이트 완료!");
      }
    } catch (error) {
      console.error("타이머 데이터 저장 실패:", error);
      throw error;
    }
  },
};
