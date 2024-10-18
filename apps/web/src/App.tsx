import { useEffect, useState } from "react";
import Form from "./components/ui/Form";
import TodoItem from "./components/ui/TodoItem";

function App() {
  const [data, setData] = useState([]);
  
  const loadAllTodos = () => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_API_URL}/todo`, {
        method: "GET"
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }).then((data) => {
        setData(data);
        console.log(data);
      }).catch((err) => {
        console.error("Error fetching todos:", err);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error in loadAllTodos:", err.message);
      } else {
        console.error("An unknown error occurred in loadAllTodos");
      }
    }
  }

  useEffect(() => {
    loadAllTodos()
  }, [])

  return (
    <div className="w-full max-w-[750px] mx-auto flex flex-col gap-10 px-8 text-white">
      <h3 className="text-center text-2xl font-bold">Todo list</h3>
      <Form refetch={loadAllTodos} />
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <TodoItem item={item} key={index} refetch={loadAllTodos} />
        ))}
      </div>
    </div>
  );
}

export default App;
