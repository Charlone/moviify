import "../../styles/Footer.scss";

const Footer = ({isLoading}) => {
    return (
        <footer className={isLoading ? 'footer-container d-none' : "footer-container"} style={{top: document.body.outerHeight}}>
            <div className={"footer"}>
                <span>Developed by <strong><a href={"https://charlone-portfolio.vercel.app"} target={"_blank"} rel={"nofollow"}>Charlone Agius</a></strong></span>
            </div>
        </footer>
    )
}

export default Footer;