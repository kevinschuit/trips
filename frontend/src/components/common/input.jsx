import React from "react";
// import styled from "styled-components";

const Input = ({ name, label, error, ...rest }) => {
  // const FormGroup = styled.div`
  //   display: flex;
  //   flex-flow: column wrap;
  //   padding: 0.25em 0;
  // `;
  let style = {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "row wrap",
    padding: "0.25em 0",
  }

  return (
    <div style={style}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} />
      {error && <div>{error}</div>}
    </div>
  );
};

export default Input;
