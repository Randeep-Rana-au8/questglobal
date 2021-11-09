import React from "react";
import "./Card.css";

const Card = ({ data }) => {
  return (
    <div className="card">
      <img src={data.imgURL} className="imgCard" alt={data.mediaName} />
      <p>{data.mediaName}</p>
    </div>
  );
};

export default Card;
