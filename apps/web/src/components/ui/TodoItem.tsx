import { DeleteIcon, EditIcon } from "../icons";

interface TodoItemProps {
  item: {
    id: string;
    title: string;
    completed: boolean;
  };
}

function TodoItem({ item }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-neutral-800 shadow-md shadow-neutral-800">
      <p>{item.title}</p>
      <div className="flex items-center justify-between gap-3">
        <button>
          <DeleteIcon />
        </button>
        <button>
          <EditIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
