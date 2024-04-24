export default function ItemDetails(props) {
  return (
    <div className="w-[400px] h-[500px] flex flex-wrap content-between py-8 px-4 rounded-md absolute top-1/4 bg-emerald-900 shadow-xl">
      <div className="w-full inline-flex">
        <h2 className="w-full text-center text-xl font-bold text-lime-300 capitalize">
          {props.item.data.title}
        </h2>
        <button
          className="text-[28px] absolute right-4 top-2 hover:text-yellow-300"
          onClick={props.onCloseBtnClick}
        >
          &times;
        </button>
      </div>
      <p className="w-full h-2/3 mt-6 text-center">{props.item.data.content}</p>
      <div className="w-full grid grid-cols-2 gap-2">
        <button
          disabled={props.item.data.finished}
          className={`w-full h-[40px] rounded-md ${props.item.data.finished ? "bg-slate-600 text-slate-400  cursor-not-allowed" : "bg-lime-900 cursor-pointer text-slate-200 hover:text-white hover:bg-lime-800"}`}
          onClick={() => {
            if (!props.item.data.finished) {
              props.onMarkBtnClick();
            }
          }}
        >
          Mark as complete
        </button>
        <button
          className="w-full h-[40px] rounded-md bg-lime-900 cursor-pointer text-slate-200 hover:text-white hover:bg-lime-800"
          onClick={props.onRemoveBtnClick}
        >
          Delete this task
        </button>
      </div>
    </div>
  );
}
