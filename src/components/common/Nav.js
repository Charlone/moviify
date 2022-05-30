import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import initialState from "../../redux/reducers/initialState";
import { connect } from "react-redux";
import { loadActiveSlug } from "../../redux/actions/activeSlugActions";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { loadMoviesData } from "../../redux/actions/moviesActions";
import { loadViewRequested } from "../../redux/actions/viewRequestedActions";
import { loadSeriesData} from "../../redux/actions/seriesActions";

const Nav = ({activeSlug, movies, loadMoviesData, viewRequested, loadViewRequested, series, loadSeriesData, loadActiveSlug}) => {
    const { nowPlaying, popularMovies, topMovies, upcoming, movie, movieImages } = movies;
    const { popularSeries, topSeries, onTheAir, airingToday, serie, serieImages } = series;

    useEffect(() => {
        let categoryToCheck;

        if (viewRequested === 'movies') {
            switch (activeSlug) {
                case "popularMovies": categoryToCheck = popularMovies; break;
                case "topMovies": categoryToCheck = topMovies; break;
                case "upcoming": categoryToCheck = upcoming; break;
                case "movie": categoryToCheck = movie; break;
                case "movieImages": categoryToCheck = movieImages; break;
                case "nowPlaying": categoryToCheck = nowPlaying; break;
                default: return;
            }

            if (categoryToCheck.length === 0) {
                setTimeout(() => {
                    loadMoviesData(activeSlug)
                        .catch(error => toast.error("Could not load movies: " + error, {
                                position: "top-right",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: true,
                            })
                        );
                }, 1000);
            }
        } else {
            switch (activeSlug) {
                case "popularSeries": categoryToCheck = popularSeries; break;
                case "topSeries": categoryToCheck = topSeries; break;
                case "onTheAir": categoryToCheck = onTheAir; break;
                case "airingToday": categoryToCheck = airingToday; break;
                case "serieImages": categoryToCheck = serieImages; break;
                case "serie": categoryToCheck = serie; break;
                default: return;
            }

            if (categoryToCheck.length === 0) {
                setTimeout(() => {
                    loadSeriesData(activeSlug)
                        .catch(error => toast.error("Could not load movies: " + error, {
                                position: "top-right",
                                autoClose: 10000,
                                hideProgressBar: false,
                                closeOnClick: true,
                            })
                        );
                }, 1000);
            }
        }
    }, [activeSlug, airingToday, loadMoviesData, loadSeriesData, movie, movieImages, nowPlaying, onTheAir, popularMovies, popularSeries, serie, serieImages, topMovies, topSeries, upcoming, viewRequested]);

    const handleClick = (e) => {
        e.preventDefault();
        const view = e.target.dataset.slug;

        switch (e.target.dataset.slug) {
            case 'actors': break;
            case 'home': loadViewRequested(viewRequested); break;
            case 'movies':
            case 'series':
                loadViewRequested(e.target.dataset.slug);
                view === 'series'
                    ? loadActiveSlug('popularSeries')
                    : loadActiveSlug('popularMovies');
            break;
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
            let activeTabStyle;

            if (window.innerWidth > 991) {
                activeTabStyle = {borderBottom: categoryTitle.slug === activeSlug ? "3px solid #E71" : (`/${categoryTitle.slug}` === location.pathname ? "3px solid #E71" : null)};
            } else {
                activeTabStyle = {borderLeft: categoryTitle.slug === activeSlug ? "3px solid #E71" : (`/${categoryTitle.slug}` === location.pathname ? "3px solid #E71" : null), paddingLeft: "0.2rem"};
            }

            if (categoryTitle.hasOwnProperty('href')) {
                headers.push(
                    <li key={key++} className={"nav-item animate__animated animate__fadeIn"} onClick={handleClick}>
                        <NavLink to={categoryTitle.href} className={"nav-link"} aria-current={"page"}>
                            <div className={"menu-item-container"} data-slug={categoryTitle.slug}>
                                <img className={"nav-icon"} src={categoryTitle.icon} alt={categoryTitle.slug} data-slug={categoryTitle.slug} />
                                <h6 data-slug={categoryTitle.slug} style={activeTabStyle}>
                                    {categoryTitle.label}
                                </h6>
                            </div>
                        </NavLink>
                    </li>
                );
            } else {
                headers.push(
                    <li key={key++} onClick={handleClick} className={"nav-item animate__animated animate__fadeIn"}>
                        <div className={"nav-link"} aria-current={"page"} data-slug={categoryTitle.slug}>
                            <div className={"menu-item-container"} data-slug={categoryTitle.slug}>
                                <img className={"nav-icon"} src={categoryTitle.icon} alt={categoryTitle.slug} data-slug={categoryTitle.slug}/>
                                <h6 data-slug={categoryTitle.slug} style={activeTabStyle}>
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
                <div className={"navbar-brand-container"} onClick={handleClick}>
                    <NavLink to={"/"} className={"navbar-brand"}>
                        <span className={"logo-main-text"} data-slug={"home"}>Moviify</span>
                        <span className={"logo-sub-text"} data-slug={"home"}>Movies & Series</span>
                    </NavLink>
                </div>
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
    series: PropTypes.object.isRequired,
    loadMoviesData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        activeSlug: state.activeSlug,
        viewRequested: state.viewRequested,
        movies: state.movies,
        series: state.series,
    }
}

const mapDispatchToProps = {
    loadActiveSlug,
    loadMoviesData,
    loadViewRequested,
    loadSeriesData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);