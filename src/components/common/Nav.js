import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <div className={"App-header"}>
            <nav className={"navbar navbar-expand-lg navbar-light"}>
                <NavLink to={"/"} className={"navbar-brand"}>
                    <span className={"logo-main-text"}>Moviify</span>
                    <span className={"logo-sub-text"}>Movies & Series</span>
                </NavLink>
                <button className={"navbar-toggler"} type={"button"} data-bs-toggle={"collapse"}
                        data-bs-target={"#navbarSupportedContent"} aria-controls={"navbarSupportedContent"}
                        aria-expanded={"false"} aria-label={"Toggle navigation"}>
                    <span className={"navbar-toggler-icon"}></span>
                </button>
                <div className={"collapse navbar-collapse"} id={"navbarSupportedContent"}>
                    <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
                        <li className={"nav-item"}>
                            <NavLink to={"/"} className={"nav-link"} aria-current={"page"}>
                                Home
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/movies"} className={"nav-link"} aria-current={"page"}>
                                Movies
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/series"} className={"nav-link"} aria-current={"page"}>
                                Series
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/actors"} className={"nav-link"} aria-current={"page"}>
                                Actors
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light search-button" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Nav;