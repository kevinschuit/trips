import React, { Component } from "react";
import moment from "moment";
import Trip from "./trip";
import styled from "styled-components";

class TripCard extends Component {

  render() {
    let totalKms = 0;

    this.props.trips.forEach(trip => {
      totalKms += trip.endKms - trip.startKms;
    });

    const TripContainer = styled.div`
      border: 5px solid #FFF;
      border-radius: 5px;
      padding: 1em;
      padding-top: 3em;
      position: relative;
    `;

    const Wrapper = styled.div`
      border-radius: 5px;
      width: 200px;
      margin: 30px 0;
      padding: 5px;
      background: #008033;
      z-index: 2;
    `;

    const Title = styled.h3`
      margin: 0;
      text-align: left;
      background: #d40000;
      position: absolute;
      left: 5px;
      top: 5px;
      border: 2px solid #fff;
      color: #fff;
      font-size: 1em;
      text-transform: uppercase;
      padding: 0.25em;
    `;

    return (
      <Wrapper>
        <TripContainer>
          <Title> {moment(this.props.date).format("D MMM YYYY")} </Title>
          {this.props.trips.map(trip => (
            <React.Fragment key={trip._id}>
              <Trip trip={trip} groupId={this.props.date} editTrip={this.props.editTrip} deleteTrip={this.props.deleteTrip} />
              <hr />
            </React.Fragment>
          ))}
          <span>{totalKms} KMs</span>
        </TripContainer>
      </Wrapper>
    );
  }
}

export default TripCard;
