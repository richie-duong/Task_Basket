import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
        <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/dashboard'>General</Link></li>
            <li><Link to='/tasks'>Tasks</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
        </ul>
        </nav>
    </>
  );
}