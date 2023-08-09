import { NavLink } from "react-router-dom";

const Nav: React.FC = () => (
  <div className="relative w-full mt-6 max-w-sm overflow-y-scroll ">
    <nav className="container fixed inset-x-0 bottom-0 mx-auto flex justify-between text-dark font-bold text-2xl p-3">
      <NavLink to="/welcome">Home</NavLink>

      <NavLink to="/stats">Stats</NavLink>

      <NavLink to="/help">Help</NavLink>

      <NavLink to="/settings">Settings</NavLink>
    </nav>
  </div>
);

export default Nav;
