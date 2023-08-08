import { NavLink } from "react-router-dom";

const Nav: React.FC = () => (
  <div className="relative w-full max-w-sm overflow-y-scroll ">
    <nav className="container mx-auto flex justify-between text-dark font-bold">
      <NavLink to="/home">Home</NavLink>

      <NavLink to="/stats">Stats</NavLink>

      <NavLink to="/help">Help</NavLink>

      <NavLink to="/settings">Settings</NavLink>
    </nav>
  </div>
);

export default Nav;
