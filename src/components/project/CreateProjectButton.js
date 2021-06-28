import React from "react";
import { Link, link } from "react-router-dom";

const CreateProjectButton = () => {
  return (
    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-secondary">
        Create a Project
      </Link>
    </React.Fragment>
  );
};

export default CreateProjectButton;
