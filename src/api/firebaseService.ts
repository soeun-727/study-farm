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

export const firebaseService = {
  async getCurrentUser(uid: string): Promise<UserData | null> {
    if (!uid) return null;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  },

  async getStudyLogs(uid: string): Promise<StudyLog[]> {
    if (!uid) return [];
    const logsRef = collection(db, "users", uid, "study_logs");
    const querySnapshot = await getDocs(logsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as StudyLog[];
  },

  async saveStudyLog(
    uid: string,
    studyData: {
      startTime: string;
      title: string;
      duration: number;
      memo: string;
      currentCrop: string;
      cropProgress: number;
      level: number;
      cropCount: number;
    },
  ) {
    try {
      const logsRef = collection(db, "users", uid, "study_logs");
      await addDoc(logsRef, {
        title: studyData.title,
        startTime: studyData.startTime,
        duration: studyData.duration,
        memo: studyData.memo,
        date: serverTimestamp(),
      });

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const currentTotalMinutes = userData.totalStudyMinutes || 0;
        let collectedCrops = userData.collectedCrops || [];

        if (
          userData.currentCrop &&
          userData.currentCrop !== studyData.currentCrop
        ) {
          if (!collectedCrops.includes(userData.currentCrop)) {
            collectedCrops.push(userData.currentCrop);
          }
        }

        if (
          !collectedCrops.includes(studyData.currentCrop) &&
          studyData.cropProgress > 0
        ) {
          const previousCropIndex =
            CROP_SCHEME.findIndex((c) => c.id === studyData.currentCrop) - 1;
          if (previousCropIndex >= 0) {
            const previousCropId = CROP_SCHEME[previousCropIndex].id;
            if (!collectedCrops.includes(previousCropId)) {
              collectedCrops.push(previousCropId);
            }
          }
        }

        await setDoc(
          userRef,
          {
            currentCrop: studyData.currentCrop,
            cropProgress: studyData.cropProgress,
            totalStudyMinutes: currentTotalMinutes + studyData.duration,
            collectedCrops: collectedCrops,
            cropCount: studyData.cropCount,
            level: studyData.level,
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

  async updateStudyLog(
    uid: string,
    logId: string,
    updatedData: { title: string; memo: string },
  ) {
    try {
      const logRef = doc(db, "users", uid, "study_logs", logId);
      await updateDoc(logRef, {
        title: updatedData.title,
        memo: updatedData.memo,
      });
    } catch (error) {
      console.error("공부 기록 수정 실패:", error);
      throw error;
    }
  },

  async deleteStudyLog(uid: string, logId: string) {
    try {
      const logRef = doc(db, "users", uid, "study_logs", logId);
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

const CROP_SCHEME = [
  { id: "rice" },
  { id: "wheat" },
  { id: "potato" },
  { id: "sweetpotato" },
  { id: "corn" },
  { id: "apple" },
  { id: "strawberry" },
  { id: "blueberry" },
  { id: "watermelon" },
  { id: "banana" },
  { id: "mango" },
  { id: "passionfruit" },
  { id: "starfruit" },
];
