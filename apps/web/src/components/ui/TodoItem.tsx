import { useRef, useState } from "react";
import { DeleteIcon, EditIcon, CheckIcon, CancelIcon } from "../icons";
import { useLoadTodos } from "../../hooks/useFetch";
import { useTodoContext } from "../context";
import { useMutation } from "@tanstack/react-query";

interface TodoItemProps {
  item: {
    _id: string;
    title: string;
    done: boolean;
  };
}

const saveTodoEdition = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_API_URL}/todo/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const toggleTodoCompletion = async ({
  id,
  done,
}: {
  id: string;
  done: boolean;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_API_URL}/todo/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: !done }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const deleteTodoById = async ({ id }: { id: string }) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_API_URL}/todo/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

function TodoItem({ item }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const { activeTab } = useTodoContext();
  const { refetch } = useLoadTodos(activeTab);

  const handleEditMutation = useMutation({
    mutationFn: saveTodoEdition,
    onSuccess: () => {
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });

  const handleToggleComplete = useMutation({
    mutationFn: toggleTodoCompletion,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error updating todo completion status:", error);
    },
  });

  const handleDeleteTodo = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(item.title);
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
        <label
          htmlFor={item._id}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="checkbox"
            id={item._id}
            onChange={() =>
              handleToggleComplete.mutate({ id: item._id, done: item.done })
            }
            checked={item.done}
            className="w-5 h-5 rounded-full border-2 border-white bg-transparent checked:bg-green-500 checked:border-green-500 cursor-pointer transition-all duration-150 ease-in-out hover:border-green-400 appearance-none"
          />
          <p
            className={`pointer-events-none ${item.done ? "line-through text-neutral-400" : ""}`}
          >
            {item.title}
          </p>
        </label>
      )}
      <div className="flex items-center justify-between gap-4">
        {isEditing ? (
          <>
            <button onClick={handleCancelEdit}>
              <CancelIcon />
            </button>
            <button
              onClick={() =>
                handleEditMutation.mutate({
                  id: item._id,
                  title: editedTitle,
                })
              }
            >
              <CheckIcon />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleDeleteTodo.mutate({ id: item._id })}>
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
