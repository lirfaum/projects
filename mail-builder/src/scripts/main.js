import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return pug `
    span.text
      | Hi, brooooo!
    `;
};

ReactDOM.render(<Index />, document.getElementById("index"));