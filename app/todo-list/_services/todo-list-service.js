import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  doc,
  where,
} from "firebase/firestore";

export const getItems = async (userId) => {
  const q = query(collection(db, "users", userId, "items"));
  const querySnapshot = await getDocs(q);
  let items = [];
  querySnapshot.forEach((doc) => {
    items.push({ data: doc.data(), id: doc.id });
  });
  return items;
};

export const getItemsByDate = async (userId, date) => {
  const q = query(
    collection(db, "users", userId, "items"),
    where("date", "==", date),
  );
  const querySnapshot = await getDocs(q);
  let items = [];
  querySnapshot.forEach((doc) => {
    items.push({ data: doc.data(), id: doc.id });
  });
  return items;
};

export const addItem = async (userId, item) => {
  const newAddedItem = await addDoc(
    collection(db, "users", userId, "items"),
    item,
  );
  console.log(newAddedItem, "new add items");
};

export const removeItem = async (userId, item) => {
  const docRef = doc(db, "users", userId, "items", item.id);
  await deleteDoc(docRef);
};

export const updateItemToFinished = async (userId, item) => {
  const docRef = doc(db, "users", userId, "items", item.id);
  await updateDoc(docRef, {
    finished: true,
  });
};
