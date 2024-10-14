import { DeleteIcon, EditIcon } from "../icons";

function TodoItem() {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-neutral-700 shadow-md shadow-black">
      <p>Learning js</p>
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
