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
                                <div className={"menu-item-container"}>
                                    <img src={"/home.svg"} alt={"home"} />
                                    <h6>Home</h6>
                                </div>
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/movies"} className={"nav-link"} aria-current={"page"}>
                                <div className={"menu-item-container"}>
                                    <img className={"nav-icon"} src={"/movie.svg"} alt={"movie"} />
                                    <h6>Movies</h6>
                                </div>
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/series"} className={"nav-link"} aria-current={"page"}>
                                <div className={"menu-item-container"}>
                                    <img className={"nav-icon"} src={"/monitor.svg"} alt={"series"} />
                                    <h6>Series</h6>
                                </div>
                            </NavLink>
                        </li>
                        <li className={"nav-item"}>
                            <NavLink to={"/actors"} className={"nav-link"} aria-current={"page"}>
                                <div className={"menu-item-container"}>
                                    <img className={"nav-icon"} src={"/actors.svg"} alt={"actors"} />
                                    <h6>Actors</h6>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex search-container">
                        <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
                        <button className={"btn search-button"} type="submit">
                            <svg fill="#E71" width={"25px"} height={"25px"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 53.627 53.627" style={{enableBackground:"new 0 0 53.627 53.627;"}}>
<path d="M53.627,49.385L37.795,33.553C40.423,30.046,42,25.709,42,21C42,9.42,32.58,0,21,0S0,9.42,0,21s9.42,21,21,21
	c4.709,0,9.046-1.577,12.553-4.205l15.832,15.832L53.627,49.385z M2,21C2,10.523,10.523,2,21,2s19,8.523,19,19s-8.523,19-19,19
	S2,31.477,2,21z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>
                        </button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Nav;