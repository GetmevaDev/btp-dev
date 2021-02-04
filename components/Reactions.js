import React from "react";

const Reactions = () => {
  return (
    <div className="box">
      <input type="checkbox" id="like" className="field-reactions" />
      <h3 className="text-desc">Press space and after tab key to navigation</h3>
      <label for="like" className="label-reactions">
        Like
      </label>
      <div className="toolbox"></div>
      <label className="overlay" for="l ike"></label>

      <button className="reaction-like">
        <span className="legend-reaction">Like</span>
      </button>
      <button className="reaction-care">
        <span className="legend-reaction">Care</span>
      </button>
      <button className="reaction-wow">
        <span className="legend-reaction">Wow</span>
      </button>
      <button className="reaction-sad">
        <span className="legend-reaction">Sad</span>
      </button>
    </div>
  );
};

export default Reactions;
