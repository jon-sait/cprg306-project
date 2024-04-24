import Item from "./item";

export default function ItemList(props) {
  return (
    <ul className="w-full max-h-[500px] mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
      {props.items.map((item) => (
        <Item
          key={item.data.id}
          title={item.data.title}
          content={item.data.content}
          priority={item.data.priority}
          date={item.data.date}
          finished={item.data.finished}
          onDetailsBtnClick={() => props.handleShowDetails(item)}
        />
      ))}
    </ul>
  );
}
