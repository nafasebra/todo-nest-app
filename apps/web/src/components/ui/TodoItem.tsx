import { DeleteIcon, EditIcon } from "../icons";

interface TodoItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  refetch: () => void;
}

function TodoItem({ item, refetch }: TodoItemProps) {
  const deleteTodo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/todo/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Todo deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-neutral-800 shadow-md shadow-neutral-800">
      <p>{item.title}</p>
      <div className="flex items-center justify-between gap-3">
        <button onClick={deleteTodo}>
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
