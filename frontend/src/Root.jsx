import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/about">Acerca</Link>
      </nav>
aaa
      <main>
        <Outlet />
      </main>
    </div>
  );
}