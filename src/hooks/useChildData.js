import { useEffect, useState } from "react";
import {
  doc, setDoc, onSnapshot, collection, addDoc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const DEFAULT_PROFILE = { name: "", birthDate: "", gender: "girl" };

export function useChildData(uid) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [logs, setLogs] = useState([]);
  const [milestoneChecked, setMilestoneChecked] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "child", "profile");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setProfile(snap.data());
      setLoading(false);
    });
    return () => unsub();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "users", uid, "logs"), orderBy("date"));
    const unsub = onSnapshot(q, (snap) => {
      setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [uid]);

  useEffect(() => {
    if (!uid) return;
    const ref = doc(db, "users", uid, "child", "milestones");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setMilestoneChecked(snap.data());
    });
    return () => unsub();
  }, [uid]);

  async function saveProfile(newProfile) {
    const ref = doc(db, "users", uid, "child", "profile");
    await setDoc(ref, newProfile, { merge: true });
  }

  async function addLog(newLog) {
    await addDoc(collection(db, "users", uid, "logs"), {
      ...newLog,
      createdAt: serverTimestamp(),
    });
  }

  async function toggleMilestone(id, currentValue) {
    const ref = doc(db, "users", uid, "child", "milestones");
    await setDoc(ref, { [id]: !currentValue }, { merge: true });
  }

  return { profile, logs, milestoneChecked, loading, saveProfile, addLog, toggleMilestone };
                    }
