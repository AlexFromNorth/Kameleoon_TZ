import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className={style.label}>404 Error Page</h1>
      <p className={style.zoom__area}>
        <b>CSS</b> animations to make a cool 404 page.{" "}
      </p>
      <section className={style.error__container}>
        <span className={style.four}>
          <span className={style.screen__reader_text}>4</span>
        </span>
        <span className={style.zero}>
          <span className={style.screen__reader_text}>0</span>
        </span>
        <span className={style.four}>
          <span className={style.screen__reader_text}>4</span>
        </span>
      </section>
      <div className={style.link__container}>
        <Link
          to='/'
          className={style.more__link}
        >
          Visit the main page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
