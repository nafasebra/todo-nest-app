import Form from "./Form";
import Tabbar from "./Tabbar";
import { useTodoContext } from "../context";
import { useLoadTodos } from "../../hooks/useFetch";

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
