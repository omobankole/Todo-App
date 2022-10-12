import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const EditModal = ({
  setEditModal,
  todo,
  setTodo,
  index,
  defaultValue,
  // status,
}) => {
  const ref = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
    ref.current.focus();
  }, []);
  const handleSubmit = (e, value) => {
    e.preventDefault();
    if (value === "") {
      toast.error("Enter a todo");
    } else {
      const newTodo = [...todo];
      newTodo.splice(index, 1, {
        value: value,
        status: "progress",
        date: new Date().toDateString(),
      });
      setTodo(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      setEditModal(false);
    }
  };

  return (
    <>
      <div className="fixed bg-[rgba(49,49,49,0.8)] w-full h-screen z-10 inset-0"></div>

      <form
        className="animate__animated animate__zoomIn
    bg-[#ebecf0] w-[min(350px,90%)] px-4 py-10 rounded-md fixed top-[50%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] z-10 m-auto"
      >
        <input
          className="block w-full border-2 border-midnight outline-none mb-3 focus:border-midnight focus:ring-0 focus:ring-offset-0"
          type="text"
          name="input"
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="w-full flex align-center">
          <button
            className="block bg-white text-midnight mr-4 p-2 rounded-md font-poppins"
            onClick={(e) => handleSubmit(e, value)}
          >
            Edit Todo
          </button>
          <button
            className="block text-[26px]"
            onClick={() => setEditModal(false)}
          >
            &#10005;
          </button>
        </div>
      </form>
    </>
  );
};

export default EditModal;
