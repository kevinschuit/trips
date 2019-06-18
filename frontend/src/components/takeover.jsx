import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

import TripForm from "./tripForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

class Takeover extends Component {

  render() {
    const fade = () => {
      if (this.props.status === "closed") {
        return keyframes`
            from{
              opacity: 0.9;
    
            }
            to{
              opacity: 0;
              visibility: hidden;
            }
            `;
      } else {
        return keyframes`
            from{
              opacity: 0;
            }
            to{
              opacity: 0.9;
            }
          `;
      }
    };

    const FullScreenFade = styled.div`
      width: 100vw;
      height: 100vh;
      background: #000;
      opacity: 0;
      position: fixed;
      top: 0;
      left: 0;
      animation: ${fade} 1s forwards;
      z-index: 4;
    `;

    const ComponentWrapper = styled.div`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 4em;
      border-radius: 5px;
      text-align: center;
      z-index: 4;
    `;

    const AddTripButton = styled.button`
      font-size: 3em;
      position: fixed;
      top: 0;
      left: 0;
      cursor: pointer;
      border: none;
      background: none;
      color: ${this.props.status === "closed" ? "#000000" : "#FFFFFF"};
      z-index: 4;
      outline: none;
      &:hover{
        opacity: 0.7;
      }
    `;

    return (
      <React.Fragment>
        <FullScreenFade />
        <AddTripButton onClick={this.props.toggleForm}>
          <FontAwesomeIcon
            icon={this.props.status === "closed" ? faPlusSquare : faWindowClose}
          />
        </AddTripButton>
        {this.props.status !== "closed" && (
          <ComponentWrapper>
            <TripForm tripId={this.props.tripIdToEdit} refreshData={this.props.refreshData} toggleForm={this.props.toggleForm} />
          </ComponentWrapper>
        )}
      </React.Fragment>
    );
  }
}

export default Takeover;
