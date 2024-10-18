import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoProvider } from "./components/context/TodoContext";
import Main from "./components/ui/Main";

const queryClient = new QueryClient();

function App() {
  return (
    <TodoProvider>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </TodoProvider>
  );
}

export default App;
