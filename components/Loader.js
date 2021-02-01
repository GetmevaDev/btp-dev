import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <img
        src="https://btpnecrology.com/wp-content/themes/btp/assets/images/loading.gif"
        alt="loading"
      />
    </div>
  );
};

export default Loader;
