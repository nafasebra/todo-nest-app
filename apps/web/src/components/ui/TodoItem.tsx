import { useRef, useState } from "react";
import { DeleteIcon, EditIcon, CheckIcon, CancelIcon } from "../icons";

interface TodoItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  refetch: () => void;
}

function TodoItem({ item, refetch }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/todo/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: editedTitle }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Todo updated successfully");
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(item.title);
  };

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
    <div className="flex items-center justify-between gap-3 py-3 px-4 bg-neutral-800 shadow-md shadow-neutral-800">
      {isEditing ? (
        <input
          type="text"
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full bg-transparent text-white "
          placeholder="Edit your todo..."
        />
      ) : (
        <p>{item.title}</p>
      )}
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <>
            <button onClick={handleCancel}>
              <CancelIcon />
            </button>
            <button onClick={handleSave}>
              <CheckIcon />
            </button>
          </>
        ) : (
          <>
            <button onClick={deleteTodo}>
              <DeleteIcon />
            </button>
            <button onClick={handleEdit}>
              <EditIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
