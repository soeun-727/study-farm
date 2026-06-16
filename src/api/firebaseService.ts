import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserData, StudyLog } from "../constants/firebase";

const TEMP_UID = "user_uid";

export const firebaseService = {
  async getCurrentUser(): Promise<UserData | null> {
    const userRef = doc(db, "users", TEMP_UID);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  },

  async getStudyLogs(): Promise<StudyLog[]> {
    const logsRef = collection(db, "users", TEMP_UID, "study_logs");
    const querySnapshot = await getDocs(logsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StudyLog[];
  },

  async saveStudyLog(studyData: {
    startTime: string;
    title: string;
    duration: number;
    memo: string;
    currentCrop: string;
    cropProgress: number;
  }) {
    try {
      // 1. 하위 컬렉션에 공부 로그 쌓기
      const logsRef = collection(db, "users", TEMP_UID, "study_logs");
      await addDoc(logsRef, {
        title: studyData.title,
        startTime: studyData.startTime,
        duration: studyData.duration,
        memo: studyData.memo,
        date: serverTimestamp(),
      });

      // 2. 유저 정보 최종 스냅샷 반영
      const userRef = doc(db, "users", TEMP_UID);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentTotalMinutes = userData.totalStudyMinutes || 0;
        const createdAtValue = userData.createdAt || serverTimestamp();

        // 기존 수확 완료한 작물 리스트 가져오기 (없으면 빈 배열)
        let collectedCrops = userData.collectedCrops || [];
        if (
          userData.currentCrop &&
          userData.currentCrop !== studyData.currentCrop
        ) {
          if (!collectedCrops.includes(userData.currentCrop)) {
            collectedCrops.push(userData.currentCrop);
          }
        }

        const calculatedLevel = Math.floor(collectedCrops.length / 3) + 1;
        const finalLevel = calculatedLevel > 4 ? 4 : calculatedLevel;
        await setDoc(
          userRef,
          {
            currentCrop: studyData.currentCrop, // 실시간 최종 작물 ID 반영
            cropProgress: studyData.cropProgress, // 실시간 이월 잔여 분 반영
            totalStudyMinutes: currentTotalMinutes + studyData.duration, // 총 누적 공부 시간
            collectedCrops: collectedCrops, // 업데이트된 수확 배열
            level: finalLevel, // 계산된 최종 레벨
            createdAt: createdAtValue,
          },
          { merge: true },
        );

        console.log("DB 저장 및 최종 동기화 완료!");
      }
    } catch (error) {
      console.error("타이머 데이터 저장 실패:", error);
      throw error;
    }
  },

  // 공부 기록 수정 API
  async updateStudyLog(
    logId: string,
    updatedData: { title: string; memo: string },
  ) {
    try {
      const logRef = doc(db, "users", TEMP_UID, "study_logs", logId);
      await updateDoc(logRef, {
        title: updatedData.title,
        memo: updatedData.memo,
      });
    } catch (error) {
      console.error("공부 기록 수정 실패:", error);
      throw error;
    }
  },

  // 공부 기록 삭제 API
  async deleteStudyLog(logId: string) {
    try {
      const logRef = doc(db, "users", TEMP_UID, "study_logs", logId);
      await deleteDoc(logRef);
    } catch (error) {
      console.error("공부 기록 삭제 실패:", error);
      throw error;
    }
  },

  // 랭킹 페이지용 API (이전 코드 유지)
  async getRankingList() {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("totalStudyMinutes", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc, index) => {
        const data = doc.data();

        return {
          id: doc.id,
          rank: index + 1,
          nickname: data.nickname || "익명의 농부",
          totalStudyMinutes: data.totalStudyMinutes || 0,
          createdAt: data.createdAt,
          level: data.level || 1,
          crops: data.collectedCrops || [],
        };
      });
    } catch (error) {
      console.error("랭킹 데이터 가져오기 실패:", error);
      throw error;
    }
  },
};
