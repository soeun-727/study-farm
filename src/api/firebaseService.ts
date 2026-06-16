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
        const currentTotalMinutes = userSnap.data().totalStudyMinutes || 0;
        await setDoc(
          userRef,
          {
            cropProgress: currentProgress + studyData.duration,
            totalStudyMinutes: currentTotalMinutes + studyData.duration,
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
          createdAt: data.createAt,
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
