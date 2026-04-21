import { Link, Outlet } from "react-router-dom";

function Layout() {

    return (
        <>
            <h1>Postboard</h1>
            <nav>
                <Link to='/'>Home Page</Link>
                <Link to='/new'>New Post Page</Link>
            </nav>
            <Outlet />
        </>
    );
}

export default Layout;