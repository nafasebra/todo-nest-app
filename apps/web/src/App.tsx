import Form from "./components/ui/Form";
import TodoItem from "./components/ui/TodoItem";

function App() {
  return (
    <div className="w-[90%] max-w-[750px] mx-auto flex flex-col gap-5 min-h-screen bg-neutral-800">
      <Form />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <TodoItem key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
