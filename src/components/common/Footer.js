import "../../styles/Footer.scss";
import {useEffect} from "react";

const Footer = ({isLoading}) => {
    return (
        <footer className={isLoading ? 'footer-container d-none' : "footer-container"} style={{top: document.body.outerHeight}}>
            <div className={"footer"}>
                <span>Developed by <strong>Charlone Agius</strong></span>
            </div>
        </footer>
    )
}

export default Footer;