import React from "react";
import {Link} from "react-router-dom";

export const MainComponent: React.FC = () => {

    return (
        <>
            <div className="page_wrapper">
                <div className="main">
                    <Link to="/uncontrolled-form">Uncontrolled Form</Link>
                    <Link to="/hook-form">React Hook Form</Link>
                </div>
            </div>
        </>
    );
}

