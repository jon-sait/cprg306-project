export default function Item(props, hideDate) {
  return (
    <>
      <li
        className={`w-full h-[88px] px-4 py-2 m-4 rounded-md ${props.finished ? "bg-slate-600 text-slate-400" : "bg-lime-600"} max-w-sm justify-self-center`}
      >
        <div className="w-full h-full grid grid-rows-2">
          <div className="w-full inline-flex justify-between">
            <h2 className="w-2/3 text-xl font-bold uppercase">{props.title}</h2>

            <button
              className="cursor-pointer text-sm hover:text-yellow-300"
              onClick={props.onDetailsBtnClick}
            >
              View details
            </button>
          </div>
          <div className="inline-flex justify-between items-center">
            <div className="inline-flex justify-center content-center items-center">
              {!props.hideDate && (
                <span
                  className={`${props.finished ? "line-through" : ""} text-sm`}
                >
                  Before: {props.date}{" "}
                </span>
              )}

              {props.finished && (
                <span className="text-sm ml-1 bg-lime-700 text-white p-1 uppercase rounded-md">
                  Finished
                </span>
              )}
            </div>

            <span
              className={`h-6 text-xs p-1 uppercase rounded-md ${props.priority == "high" ? "bg-red-500" : props.priority == "medium" ? "bg-orange-500" : "bg-yellow-500"}`}
            >
              {props.priority}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
