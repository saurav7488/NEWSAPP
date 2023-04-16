  import React, { Component } from "react";

  export default class NewsItem extends Component {
    render() {
      let {title,description,imageurl,newsurl}=this.props;
      return (
        <div className="my-3">
        <div>
          <div className="card">
            <img src={imageurl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a
                href={newsurl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
