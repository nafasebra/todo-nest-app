import Form from "./Form";
import Tabbar from "./Tabbar";
import { useQuery } from "@tanstack/react-query";
import { useTodoContext } from "../context";
import { TABS } from "../../constant";

async function loadTodos(index: number) {
  let url = "";
  if (index === 1) {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo/complete`;
  } else if (index === 2) {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo/incomplete`;
  } else {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo`;
  }
  console.log(url)
  return fetch(url, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

function useLoadTodos(index: number) {
  console.log(TABS[index])
  return useQuery({
    queryKey: ["todos", TABS[index]],
    queryFn: () => loadTodos(index),
  });
}

function Main() {
  const { activeTab } = useTodoContext()
  const { data, isLoading } = useLoadTodos(activeTab);

  return (
    <div className="w-full max-w-[750px] mx-auto flex flex-col gap-10 px-8 text-white">
      <h3 className="text-center text-2xl font-bold">Todo list</h3>
      <Form />
      <Tabbar data={data} isLoading={isLoading} />
    </div>
  );
}

export default Main;
