import React from "react";
import {getWhatsappText} from "../utils/whatsappCode";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href={getWhatsappText()}
                  className="btn btn-custom btn-lg page-scroll"
                  target="_blank" rel="noopener noreferrer"
                >
                  Book here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
