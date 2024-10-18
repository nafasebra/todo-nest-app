import { useState } from "react";
import { AddIcon } from "../icons";

function Form() {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: input.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Todo added:', result);
      setInput('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleInputChange}
        value={input}
        className="w-full bg-transparent border border-white rounded-full py-3  pl-4 pr-12 text-white"
        placeholder="Write anything that your mind..."
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
        <AddIcon />
      </button>
    </form>
  );
}

export default Form;
