import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

class Datepicker extends Component {
  render() {
    const Button = styled.button`
      font-size: 1.2em;
      background: none;
      border-radius: 5px;
      position: relative;
      // &:hover {
      //   cursor: pointer;
      //   top: -2px;
      //   box-shadow: 0px 2px #ccc;
      // }
    `;

    return <Button onClick={this.props.onClick}>{this.props.value}</Button>;
  }
}

Datepicker.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string
};

export default Datepicker;
