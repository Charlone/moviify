import "../../styles/Spinner.scss";

const Spinner = () => (
    <div className="d-flex justify-content-center align-content-center align-items-center">
        <div className="spinner-border spinner-setup" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default Spinner;