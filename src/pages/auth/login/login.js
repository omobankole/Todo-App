import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("registerInfo");
  const [info, setInfo] = useState({});
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const details = JSON.parse(data);
    if (details) {
      setInfo(details);
    }
  }, [data]);

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctInfo = info.find(
      (item) =>
        item.username === payload.username && item.password === payload.password
    );
    if (correctInfo) {    
      navigate("/home");
      toast.success(`welcome ${payload.username}`, { theme: "dark" });
    } else {
      toast.error("invalid username or password");
    }
    localStorage.setItem("payload", JSON.stringify(payload));
  };

  return (
    <form className="w-[350px] p-8 font-poppins shadow-normal flex-col bg-white">
      <h3 className="font-poppins font-medium ">Login to your account</h3>
      <input
        value={payload.username}
        onChange={handleChange}
        name="username"
        type="text"
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
        Login
      </button>
      <div className="flex items-center">
        <p className="text-sm">Don't have an account?</p>
        <a href="/register" className="text-sm text-spring text-[12px] ml-1">
          Register
        </a>
      </div>
    </form>
  );
};

export default Login;
