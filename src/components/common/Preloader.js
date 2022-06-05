import "../../styles/Preloader.scss";

const Preloader = () => {
    return (
        <div className={"modal"}>
            <div className={"brand"}>
                <span className={"logo-main-text"}>Moviify</span>
                <span className={"logo-sub-text"}>Movies & Series</span>
            </div>
            <div className={"preloader"}></div>
        </div>
    )
}

export default Preloader;