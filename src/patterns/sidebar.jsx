import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar-header">
        <span></span>
      </div>
      <div className="navigation">
        <nav>
          <ul>
            <NavLink to="/">
              <li>Dashboard</li>
            </NavLink>
            <NavLink to="/add">
              <li>Add task</li>
            </NavLink>
            <li>Úkoly</li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
