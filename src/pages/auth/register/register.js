import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const data = localStorage.getItem("registerInfo");
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState([]);
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const details = JSON.parse(data);
    if (details) {
      setRegisterInfo(details);
    }
  }, [data]);
  const handleChange = (e) =>
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payload.username === "" && payload.password === "") {
      toast.error("Please fill in the form");
    } else {
      const findData = registerInfo.find(
        (item) => item.username === payload.username
      );
      if (findData) {
        console.log(findData);
        toast.error("username already exist");
      } else {
        const newInfo = [...registerInfo];
        newInfo.push(payload);
        setRegisterInfo(newInfo);
        localStorage.setItem("registerInfo", JSON.stringify(newInfo));
        toast.success(`${payload.username} has been registered 🥳`);
        navigate("/login");
      }
    }
  };

  return (
    <form className="w-[350px] p-8 font-poppins shadow-normal flex-col bg-white">
      <h3 className="font-poppins font-medium ">Create account</h3>
      <input
        value={payload.username}
        onChange={handleChange}
        type="text"
        name="username"
        placeholder="Username"
        className="block w-full p-2 rounded-sm my-3 text-sm border-[#a09a9a] border"
      />
      <input
        value={payload.password}
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="Password"
        className="block w-full p-2 rounded-sm border text-sm border-[#a09a9a] my-3"
      />
      <button
        className="block w-full p-2 rounded-sm border-none bg-midnight text-white border-slate-300 mb-3"
        onClick={handleSubmit}
      >
        Register
      </button>
      <div className="flex items-center">
        <p className="text-sm">Already have an account?</p>
        <a href="/login" className="text-spring text-[12px] ml-1">
          Login
        </a>
      </div>
    </form>
  );
};

export default Register;
