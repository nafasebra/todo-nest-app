import { AddIcon } from "../icons";

function Form() {
  return (
    <form className="relative">
      <input
        type="text"
        className="border border-white rounded-full py-3 pl-3 pr-12"
        placeholder="Write anything that your mind..."
      />
      <button type="submit" className="text-white">
        <AddIcon />
      </button>
    </form>
  );
}

export default Form;
