"use client";

import { useEffect, useState } from "react";

import ItemList from "./item-list";

export default function TodoList(props) {
  const [sortBy, setSortBy] = useState(undefined);
  const [filterBy, setFilterBy] = useState(undefined);
  const [sortedItems, setSortedItems] = useState(undefined);

  const sortedItemsByField = (sortBy, items) => {
    if (sortBy === "date") {
      return items.sort(
        (x, y) => new Date(x.data.date) - new Date(y.data.date),
      );
    } else if (sortBy === "priority") {
      var priorityLevel = {
        high: 2,
        medium: 1,
        low: 0,
      };
      return items.sort((x, y) => {
        return priorityLevel[y.data.priority] - priorityLevel[x.data.priority];
      });
    }
  };

  const handleSortedItems = (newSortBy) => {
    if (newSortBy !== sortBy) {
      setSortedItems(sortedItemsByField(newSortBy, sortedItems));
      setSortBy(newSortBy);
    }
  };

  const handleFilterItems = (newFilterBy) => {
    let filteredItems;
    if (newFilterBy !== filterBy) {
      filteredItems = props.items.filter((x) => {
        if (newFilterBy === "finished") {
          return x.data.finished;
        } else if (newFilterBy === "notFinished") {
          return !x.data.finished;
        } else if (
          newFilterBy === "high" ||
          newFilterBy === "medium" ||
          newFilterBy === "low"
        ) {
          return x.data.priority === newFilterBy;
        }
      });
      setFilterBy(newFilterBy);
    } else {
      filteredItems = props.items;
      setFilterBy(undefined);
    }
    if (sortBy !== undefined) {
      setSortedItems(sortedItemsByField(sortBy, filteredItems));
    } else {
      setSortedItems(filteredItems);
    }
  };

  useEffect(() => {
    setSortedItems(props.items);
  }, [props.items]);

  return (
    <div className="w-[90%] flex flex-wrap justify-center border-4 p-2 rounded-lg border-blue-800 mt-16">
      <div className="w-full grid grid-cols-2 ">
        <div>
          <label htmlFor="sort">Sort by: </label>
          <button
            className={`${sortBy === "date" ? "opacity-90 ring-2 ring-blue-500 text-white brightness-150" : " text-slate-400"} bg-cyan-950 p-1 m-2 w-28`}
            onClick={() => handleSortedItems("date")}
          >
            Date
          </button>
          <button
            className={`${sortBy === "priority" ? "opacity-90 ring-2 ring-blue-500 text-white brightness-150" : " text-slate-400"} bg-cyan-950 p-1 m-2 w-28`}
            onClick={() => handleSortedItems("priority")}
          >
            Priority
          </button>
        </div>
        <div className="inline-flex">
          <label htmlFor="filter" className="w-[100px] flex mr-2 mt-2">
            Filter by:{" "}
          </label>
          <div>
            <button
              className={`${filterBy === "finished" ? "opacity-90 ring-2 ring-yellow-200 text-black font-[500]" : " text-slate-500"} bg-lime-600 p-1 m-2 w-28`}
              onClick={() => handleFilterItems("finished")}
            >
              Finished
            </button>
            <button
              className={`${filterBy === "notFinished" ? "opacity-90 ring-2 ring-yellow-200 text-black font-[500]" : " text-slate-500"} bg-lime-600 p-1 m-2 w-28`}
              onClick={() => handleFilterItems("notFinished")}
            >
              Not Finished
            </button>
            <button
              className={`${filterBy === "high" ? "opacity-90 ring-2 ring-yellow-200 text-black font-[500]" : " text-slate-500"} bg-lime-600 p-1 m-2 w-28`}
              onClick={() => handleFilterItems("high")}
            >
              High
            </button>
            <button
              className={`${filterBy === "medium" ? "opacity-90 ring-2 ring-yellow-200 text-black font-[500]" : " text-slate-500"} bg-lime-600 p-1 m-2 w-28`}
              onClick={() => handleFilterItems("medium")}
            >
              Medium
            </button>
            <button
              className={`${filterBy === "low" ? "opacity-90 ring-2 ring-yellow-200 text-black font-[500]" : " text-slate-500"} bg-lime-600 p-1 m-2 w-28`}
              onClick={() => handleFilterItems("low")}
            >
              Low
            </button>
          </div>
        </div>
      </div>
      {sortedItems && (
        <ItemList
          items={sortedItems}
          handleShowDetails={props.handleShowDetails}
        />
      )}
    </div>
  );
}
