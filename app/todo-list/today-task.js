import Item from "./item";

export default function TodayTask(props) {
  return (
    <div className="w-full py-4 inline-flex justify-between items-center mt-8 bg-slate-800 px-8">
      <h2 className="w-max text-5xl uppercase font-bold bg-gradient-to-r from-lime-600 via-blue-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Today's target :
      </h2>
      <ul className="w-2/3 max-h-[200px] mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 justify-center content-center">
        {props.items?.map((item) => (
          <Item
            key={item.data.id}
            title={item.data.title}
            content={item.data.content}
            priority={item.data.priority}
            hideDate={true}
            finished={item.data.finished}
            onDetailsBtnClick={() => props.handleShowDetails(item)}
          />
        ))}
      </ul>
    </div>
  );
}
