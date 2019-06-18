import React from "react";
// import styled from "styled-components";

const Select = ({ name, label, error, options, ...rest }) => {
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
      <select {...rest} name={name} id={name}>
        <option defaultValue />
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Select;
