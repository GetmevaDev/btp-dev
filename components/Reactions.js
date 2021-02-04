import React from "react";
import Image from "next/image";

const Reactions = () => {
  return (
    <div className="reactions-wrapper">
      <div className="box">
        <input type="checkbox" id="like" className="field-reactions" />
        <h3 className="text-desc">
          Press space and after tab key to navigation
        </h3>
        <label for="like" className="label-reactions">
          Like
        </label>
        <label className="overlay" for="l ike"></label>
        <div className="toolbox">
          <button className="reaction-like">
            <Image src="/icons/like.svg" alt="" width={500} height={500} />
            <span className="legend-reaction">Like</span>
          </button>
          <button className="reaction-care">
            <Image src="/icons/care.svg" alt="" width={500} height={500} />
            <span className="legend-reaction">Care</span>
          </button>
          <button className="reaction-wow">
            <Image src="/icons/wow.svg" alt="" width={500} height={500} />
            <span className="legend-reaction">Wow</span>
          </button>
          <button className="reaction-sad">
            <Image src="/icons/sad.svg" alt="" width={500} height={500} />
            <span className="legend-reaction">Sad</span>
          </button>
        </div>
      </div>
      <div className="reactions-count">
        <div className="reactions-count-wrapper">
          <Image
            className="reactions-count__icon"
            src="/icons/like.svg"
            alt=""
            width={500}
            height={500}
          />
          <span className="reactions-count__amount">1</span>
        </div>
        <div className="reactions-count-wrapper">
          <Image
            className="reactions-count__icon"
            src="/icons/care.svg"
            alt=""
            width={500}
            height={500}
          />
          <span className="reactions-count__amount">1</span>
        </div>
        <div className="reactions-count-wrapper">
          <Image
            className="reactions-count__icon"
            src="/icons/wow.svg"
            alt=""
            width={500}
            height={500}
          />
          <span className="reactions-count__amount">1</span>
        </div>
        <div className="reactions-count-wrapper">
          <Image
            className="reactions-count__icon"
            src="/icons/sad.svg"
            alt=""
            width={500}
            height={500}
          />
          <span className="reactions-count__amount">1</span>
        </div>
      </div>
    </div>
  );
};

export default Reactions;
