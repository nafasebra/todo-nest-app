import { useQuery } from "@tanstack/react-query";
import { TABS } from "../constant";

async function loadTodos(index: number) {
  let url = "";
  if (index === 1) {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo/complete`;
  } else if (index === 2) {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo/incomplete`;
  } else {
    url = `${import.meta.env.VITE_SERVER_API_URL}/todo`;
  }
  return fetch(url, {
    method: "GET",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  });
}

export function useLoadTodos(index: number) {
  console.log(TABS[index])
  return useQuery({
    queryKey: ["todos", TABS[index]],
    queryFn: () => loadTodos(index),
  });
}