import {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import initialState from "../../redux/reducers/initialState";
import { connect } from "react-redux";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";

const Nav = ({activeSlug, viewRequested, movies, loadMoviesData, loadViewRequested, loadActiveSlug}) => {
    const { nowPlaying, popular, top, upcoming, movie, images } = movies;
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        let categoryToCheck;

        switch (activeSlug) {
            case "popular": categoryToCheck = popular; break;
            case "top": categoryToCheck = top; break;
            case "upcoming": categoryToCheck = upcoming; break;
            case "movie": categoryToCheck = movie; break;
            case "images": categoryToCheck = images; break;
            case "nowPlaying": categoryToCheck = nowPlaying; break;
        }

        if (categoryToCheck.length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                loadMoviesData(activeSlug)
                    .then(() => {
                        setIsLoading(false);
                    })
                    .catch(error => toast.error("Could not load movies: " + error, {
                            position: "top-right",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                        })
                    );
            }, 1000);
        }
    }, [popular, top, upcoming, nowPlaying, isLoading, activeSlug]);

    const handleClick = (e) => {
        e.preventDefault();

        switch (e.target.dataset.slug) {
            case 'actors': break;
            case 'movies':
            case 'series': loadViewRequested(e.target.dataset.slug); break;
            default: loadActiveSlug(e.target.dataset.slug); break;
        }
    }

    const Headers = () => {
        const location = useLocation();
        let headers = [],
            cleanArray,
            categoryArray,
            key = 0;

        viewRequested === 'movies' ? categoryArray = initialState.headers.movies: categoryArray = initialState.headers.series;

        switch (location.pathname) {
            case "/": cleanArray = categoryArray.slice(0, 5); break;
            default: cleanArray = categoryArray.slice(4); break;
        }

        cleanArray.forEach(categoryTitle => {
            if (categoryTitle.hasOwnProperty('href')) {
                headers.push(
                    <li className={"nav-item"} key={key++} className={"animate__animated animate__fadeIn"} onClick={handleClick}>
                        <NavLink to={categoryTitle.href} className={"nav-link"} aria-current={"page"}>
                            <div className={"menu-item-container"}>
                                <img className={"nav-icon"} src={categoryTitle.icon} alt={categoryTitle.slug} />
                                <h6 data-slug={categoryTitle.slug}>
                                    {categoryTitle.label}
                                </h6>
                            </div>
                        </NavLink>
                    </li>
                );
            } else {
                headers.push(
                    <li className={`nav-item`} key={key++} onClick={handleClick}
                        className={"animate__animated animate__fadeIn"}>
                        <div className={"nav-link"} aria-current={"page"}>
                            <div className={"menu-item-container"}>
                                <img className={"nav-icon"} src={categoryTitle.icon} alt={categoryTitle.slug}/>
                                <h6 data-slug={categoryTitle.slug}>
                                    {categoryTitle.label}
                                </h6>
                            </div>
                        </div>
                    </li>
                );
            }
        });

        return headers;
    }

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
                        <Headers />
                    </ul>
                    <form className="d-flex search-container">
                        <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" />
                        <button className={"btn search-button"} type="submit">
                            <svg fill="#E71" width={"25px"} height={"25px"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 53.627 53.627" style={{enableBackground:"new 0 0 53.627 53.627"}}>
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

Nav.propTypes = {
    activeSlug: PropTypes.string.isRequired,
    viewRequested: PropTypes.string.isRequired,
    movies: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
        movies: state.movies,
    }
}

const mapDispatchToProps = {
    loadActiveSlug,
    loadMoviesData,
    loadViewRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);