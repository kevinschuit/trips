import React, { Component } from "react";
import TripCard from "./tripCard";
import moment from "moment";
import styled, { keyframes } from "styled-components";

class TripsOverview extends Component {
  render() {
    const Wrapper = styled.div`
      display: flex;
      align-items: flex-start;
      flex-flow: row wrap;
      justify-content: space-around;
      padding: 1em;
      background: #535554;
      padding-top: 64px;
      height: calc(100vh - 82px);
      flex: 1 1 auto;
      overflow: hidden;
    `;

    const moveStripes = keyframes`
      from { 
        background-position: 0 0;
      }
      to { 
        background-position: 0 -100%;
      }
    `;

    const Stripes = styled.div`
      width: 10px;
      height: 100%;
      background: linear-gradient(to bottom, #fff, #fff 30%, transparent 0%, transparent);
      background-size: 100% 100px;
      animation: ${moveStripes} 15s linear infinite;
      position: fixed;
      top: 0;
      z-index: 1;
    `;

    return (
      <Wrapper>
        <Stripes />
        {this.props.trips.map(tripsPerDay => (
          <TripCard
            key={moment(tripsPerDay._id.date).format("YYYY-MM-DD")}
            trips={tripsPerDay.trips}
            date={tripsPerDay._id.date}
            editTrip={this.props.editTrip}
            deleteTrip={this.props.deleteTrip}
          />
        ))}
      </Wrapper>
    );
  }
}

export default TripsOverview;
