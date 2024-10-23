import TodoItem from "../TodoItem";
import { TodoType } from "../../../types";
import { useTodoContext } from "../../context";
import { TABS } from "../../../constant";

interface Props {
  data: TodoType[];
  isLoading: boolean;
}

function Tabbar({ data, isLoading }: Props) {
  const { activeTab, setActiveTab } = useTodoContext();

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-center gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            key={index}
            className={`border border-green-500 px-4 py-2 ${activeTab === index ? "bg-green-500" : "bg-transparent"} hover:bg-green-700 text-white font-semibold rounded-md transition-all shadow-md`}
            onClick={() => handleTabChange(index)}
          >
            {TABS[index]}
          </button>
        ))}
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green-500"></div>
          </div>
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`${activeTab === index ? "flex flex-col gap-3" : "hidden"}`}
            >
              {data &&
                data.map((item, index) => <TodoItem item={item} key={index} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Tabbar.displayName = "Tabbar";

export default Tabbar;
