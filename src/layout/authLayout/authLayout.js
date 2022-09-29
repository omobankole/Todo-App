import { Outlet } from "react-router-dom";
import Images from "../../assets/images/pattern.png";

const AuthLayout = () => {
  return (
    <div
      className="w-full h-screen mx-auto flex justify-center items-center"
      style={{ backgroundImage: `url(${Images})` }}
    >
      <main className="w-full mx-auto flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
