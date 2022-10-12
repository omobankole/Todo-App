import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import EditModal from "../editModal/editModal";
import "animate.css";
import { useEffect } from "react";

const TodoCard = ({
  value,
  status,
  removeTodo,
  index,
  todo,
  setTodo,
  date,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  // const [isHovering, setIsHovering] = useState(false);

  // const handleMouseOver = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseOut = () => {
  //   setIsHovering(false);
  // };

  const confirmDelete = () => {
    removeTodo(index);
    setDeleteModal(false);
  };

  const handleCheckbox = (e) => {
    const position = todo.find(
      (item) => item.value === value && item.status === status
    );
    if (e.target.checked) {
      const newTodo = [...todo];
      newTodo.splice(todo.indexOf(position), 1, {
        value: value,
        status: "completed",
        date: new Date().toDateString(),
      });
      setTodo(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
    } else {
      const newTodo = [...todo];
      newTodo.splice(todo.indexOf(position), 1, {
        value: value,
        status: "progress",
        date: new Date().toDateString(),
      });
      setTodo(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
    }
  };

  return (
    <>
      {deleteModal && (
        <div className="fixed bg-[rgba(49,49,49,0.8)] w-full h-screen z-10 inset-0"></div>
      )}

      <div className="w-[94%] flex justify-between items-center py-5 px-3 shadow-normal rounded my-1 bg-white cursor-pointer relative">
        <label
          className={`w-[90%] flex items-center font-poppins ${
            status === "completed" && "line-through text-[#979494]"
          }`}
        >
          <input
            type="checkbox"
            onChange={handleCheckbox}
            checked={status === "completed" ? true : false}
            data-status={status}
            className={`block ${
              status === "completed" && "bg-spring hover:bg-spring"
            } enabled:hover:border-spring bg-[#eee] focus:ring-0 focus:ring-offset-0 text-spring w-5 h-5 rounded-[50%] mr-2`}
          />
          {value}
          <p
            className={`w-[35%] font-poppins text-[10px] absolute bottom-[5px] ${
              status === "completed" && "text-[#979494] line-through"
            }`}
          >
            {date}
          </p>
        </label>

        <div className="flex item-center">
          <button
            className="block text-[20px]"
            onClick={() => setEditModal(true)}
          >
            <FiEdit />
          </button>
          <button
            className="block text-[#3b3a3a] ml-1 text-[20px]"
            onClick={() => setDeleteModal(true)}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          confirmDelete={confirmDelete}
          value={value}
        />
      )}
      {editModal && (
        <EditModal
          setEditModal={setEditModal}
          todo={todo}
          defaultValue={value}
          index={index}
          setTodo={setTodo}
        />
      )}
    </>
  );
};

export default TodoCard;

const DeleteModal = ({ setDeleteModal, confirmDelete, value }) => (
  <div className="animate__animated animate__zoomIn bg-[#ebecf0] w-[min(350px,90%)] px-4 py-10 rounded-md z-10 fixed top-[50%] left-[50%] flex flex-col translate-x-[-50%] translate-y-[-50%]">
    <p className="text-center break-words">Do you want to delete {value}?</p>
    <div className="flex justify-between mt-5 px-7">
      <button className="text-[red]" onClick={confirmDelete}>
        Yes
      </button>
      <button className="text-spring" onClick={() => setDeleteModal(false)}>
        No
      </button>
    </div>
  </div>
);
