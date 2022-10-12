import { useEffect, useRef, useState } from "react";
import 'animate.css';


const Modal = ({ handleSubmit, setAddModal }) => {
  const [value, setValue] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <form className="animate__animated animate__zoomIn
    bg-[#ebecf0] w-[min(350px,90%)] px-4 py-10 rounded-md fixed top-[50%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%] z-10 m-auto">
      <input
        className="block w-full border-2 border-spring outline-none mb-3 p-1 focus:border-spring focus:ring-0 focus:ring-offset-0"
        type="text"
        name="input"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="w-full flex align-center">
        <button
          className="block bg-spring text-white mr-4 p-2 rounded-md font-poppins"
          onClick={(e) => handleSubmit(e, value)}
        >
          Add Todo
        </button>
        <button className="block text-[26px]" onClick={() => setAddModal(false)}>
          &#10005;
        </button>
      </div>
    </form>
  );
};

export default Modal;
