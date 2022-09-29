const StatusComponent = ({ status, setStatus }) => {
  return (
    <div className="flex w-full justify-center p-3 mt-2 shadow-normal bg-midnight text-white rounded-md font-poppins">
      <div className="flex justify-between w-2/4">
        <button
          className={`block ${
            status === "" && "text-spring border-2 p-1 rounded-md"
          }`}
          onClick={() => setStatus("")}
        >
          All
        </button>
        <button
          className={`block ${
            status === "progress" && "text-spring border-2 p-1 rounded-md"
          }`}
          onClick={() => setStatus("progress")}
        >
          Progress
        </button>
        <button
          className={`block ${
            status === "completed" && "text-spring border-2 p-1 rounded-md"
          }`}
          onClick={() => setStatus("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default StatusComponent;
