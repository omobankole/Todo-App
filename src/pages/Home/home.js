import { useMemo } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../components/modal/modal";
import StatusComponent from "../../components/status/status";
import TodoCard from "../../components/todoCard/todoCard";

const Home = () => {
  const [addModal, setAddModal] = useState(false);
  const [todo, setTodo] = useState([]);
  const data = JSON.parse(localStorage.getItem("payload"));
  const array = localStorage.getItem("todo");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const newTodo = JSON.parse(array);
    if (newTodo) {
      setTodo(newTodo);
    }
  }, [array]);

  const mappedArray = useMemo(() => {
    return JSON.parse(localStorage.getItem("todo"));
  }, [todo]);

  const completedTodo = useMemo(() => {
    return todo.filter((item) => item.status === "completed");
  }, [todo]);

  const progressTodo = useMemo(() => {
    return todo.filter((item) => item.status === "progress");
  }, [todo]);

  const handleSubmit = (e, value) => {
    e.preventDefault();
    if (value === "") {
      toast.error("Enter a todo");
    } else {
      const newTodo = [...todo];
      newTodo.unshift({
        value: value,
        status: "progress",
        date: new Date().toDateString(),
      });
      console.log(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      setTodo(newTodo);
      setAddModal(false);
    }
  };

  const handleRemove = (index) => {
    const updatedTodo = [...todo];
    updatedTodo.splice(index, 1);
    setTodo(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  return (
    <>
      <div className="w-full relative h-screen bg-image">
        {addModal && (
          <div className="fixed bg-[rgba(49,49,49,0.8)] z-10 inset-0">
            <Modal handleSubmit={handleSubmit} setAddModal={setAddModal} />
          </div>
        )}

        <div className="w-[min(550px,94%)] absolute left-0 right-0 ml-auto mr-auto top-[100px]">
          <h2 className="block text-[30px] font-poppins text-center mb-3">
            <span className="capitalize inline-block">{data.username}</span>'s
            Todo Lists
          </h2>
          <div className="h-[50vh] sm:h-[60vh] flex flex-col justify-between ">
            <div className="flex justify-center">
              <button
                className="bg-midnight flex justify-center items-center text-white w-[100%] p-1 font-poppins rounded-md"
                onClick={() => setAddModal(true)}
              >
                Create a new todo <span className="text-[26px] ml-2">+</span>
              </button>
            </div>

            {
              <div className="h-[70%] flex items-center flex-col overflow-y-auto w-full mx-auto scrollbar-track-[#e0dfdf] scrollbar-thumb-[#9d9494ac] scrollbar-thumb-rounded-full scrollbar-thin">
                {mappedArray && mappedArray.length > 0 ? (
                  <>
                    {status === "completed" &&
                      completedTodo.map((item, index) => (
                        <TodoCard
                          key={index}
                          todo={todo}
                          setTodo={setTodo}
                          index={index}
                          removeTodo={handleRemove}
                          {...item}
                        />
                      ))}
                    {status === "progress" &&
                      progressTodo.map((item, index) => (
                        <TodoCard
                          key={index}
                          todo={todo}
                          setTodo={setTodo}
                          index={index}
                          removeTodo={handleRemove}
                          {...item}
                        />
                      ))}
                    {status === "" &&
                      mappedArray.map((item, index) => (
                        <TodoCard
                          key={index}
                          todo={todo}
                          setTodo={setTodo}
                          index={index}
                          removeTodo={handleRemove}
                          {...item}
                        />
                      ))}
                  </>
                ) : (
                  <div className="p-5 text-center text-lg font-poppins">
                    No Todo Yet! 😔
                  </div>
                )}
              </div>
            }
            <div className="">
              <StatusComponent status={status} setStatus={setStatus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
