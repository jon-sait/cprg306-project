"use client";

import { useEffect, useState } from "react";

import { useUserAuth } from "./_utils/auth-context";
import {
  getItems,
  addItem,
  removeItem,
  updateItemToFinished,
  getItemsByDate,
} from "./_services/todo-list-service";

import NewItem from "./new-item";
import TodoList from "./todo-list";
import TodayTask from "./today-task";
import ItemDetails from "./item-details";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const [items, setItems] = useState(undefined);
  const [currentDateItem, setCurrentDateItem] = useState(undefined);
  const [showpopup, setShowPopup] = useState(false);
  const [showDetailsItem, setShowDetailsItem] = useState(undefined);

  const loadItems = async () => {
    if (user) {
      const newItems = await getItems(user.uid);
      if (newItems !== undefined) {
        setItems(newItems);
      }
    }
  };

  const loadCurrentDateItem = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (user) {
      const currentDateItem = await getItemsByDate(user.uid, today);
      console.log(currentDateItem);
      if (currentDateItem !== undefined) {
        setCurrentDateItem(currentDateItem);
      }
    }
  };

  const handleAddItem = async (item) => {
    if (user.uid) {
      await addItem(user.uid, item);
      await loadItems();
    }
  };

  const handleDeleteItem = async (item) => {
    if (user.uid) {
      await removeItem(user.uid, item);
      await loadItems();
    }
  };

  const handleMarkItemFinish = async (item) => {
    if (user.uid) {
      await updateItemToFinished(user.uid, item);
      await loadItems();
    }
  };

  const handleShowDetails = (item) => {
    setShowDetailsItem(item);
  };

  useEffect(() => {
    loadItems();
    loadCurrentDateItem();
  }, [user]);

  return user ? (
    <main className="py-8 flex flex-wrap justify-center content-center">
      <button
        className="absolute right-2 top-2 p-2 bg-emerald-100 rounded-md text-black text-sm font-bold text-cyan-900 hover:opacity-90"
        onClick={firebaseSignOut}
      >
        Sign out
      </button>
      <h1 className="w-full text-center text-8xl font-bold my-8 bg-gradient-to-r from-yellow-600 via-lime-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        My To-do List
      </h1>

      <div className="w-full flex flex-wrap justify-center">
        <button
          className="w-max h-10 px-4 py-2 bg-emerald-100 rounded-md text-black text-lg font-bold text-cyan-900 hover:opacity-90 justify-self-end "
          onClick={() => {
            setShowPopup((oldState) => !oldState);
          }}
        >
          + Add New Task
        </button>
        <TodayTask
          items={currentDateItem}
          handleShowDetails={handleShowDetails}
        />
        {items !== undefined && (
          <TodoList
            items={items}
            removeItem={handleDeleteItem}
            markItemFinshed={handleMarkItemFinish}
            handleShowDetails={handleShowDetails}
          />
        )}
      </div>
      <div className="w-full flex justify-center content-center"></div>
      {showpopup && (
        <NewItem
          onAddItem={handleAddItem}
          onCloseBtnClick={() => setShowPopup(false)}
        />
      )}
      {showDetailsItem && (
        <ItemDetails
          item={showDetailsItem}
          onCloseBtnClick={() => setShowDetailsItem(undefined)}
          onRemoveBtnClick={() => {
            handleDeleteItem(showDetailsItem);
            setShowDetailsItem(undefined);
          }}
          onMarkBtnClick={() => {
            handleMarkItemFinish(showDetailsItem);
            setShowDetailsItem(undefined);
          }}
        />
      )}
    </main>
  ) : (
    <div className="w-screen h-screen flex flex-wrap justify-center items-center content-center">
      <p className="w-full text-center text-2xl">
        You need to be signed in to view this page.
      </p>
      <a
        className="mt-8 h-10 p-2 bg-emerald-100 rounded-md text-black text-sm font-bold text-cyan-900 hover:opacity-90"
        href="/"
      >
        Go to Sign in
      </a>
    </div>
  );
}
