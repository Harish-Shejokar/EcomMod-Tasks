import React, { useRef } from "react";
import classes from "./Form.module.css";
const Form = () => {
  const titleRef = useRef();
  const textRef = useRef();
  const release_dateRef = useRef();
  const addMoviesHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const text = textRef.current.value;
    const release = release_dateRef.current.value;
    console.log(title, text, release)
    
    
    titleRef.current.value = "";
    textRef.current.value = "";
    release_dateRef.current.value = "";
  };

  return (
    <form className={classes.form}>
      <label>Title</label>
      <input ref={titleRef} type="text" />
      <label>Opening Text</label>
      <input ref={textRef} className={classes["open-text"]} type="text" />
      <label>Release_date</label>
      <input ref={release_dateRef} type="date" />
      <button onClick={addMoviesHandler}>Add Movie</button>
    </form>
  );
};

export default Form;
