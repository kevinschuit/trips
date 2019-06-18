import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Trip extends Component {

  handleEditTrip = () => {
    this.props.editTrip(this.props.trip._id)
  }

  handleDeleteTrip = () => {
    this.props.deleteTrip(this.props.trip._id)
  }

  render() {
    const { trip, groupId } = this.props;

    const FlexBox = styled.div`
      display: flex;
      flex-flow: ${props => (props.column ? "column wrap" : "row wrap")};
    `;

    const TripWrapper = styled.div`
      max-height: 18px;
      overflow: hidden;
      transition: max-height 0.1s ease;
      & svg {
        margin: auto 0;
      }
      color: #fff;
    `;

    const RadioButton = styled.input`
      display: none;
      &:checked + ${TripWrapper} {
        max-height: 500px;
        transition: max-height 0.25s ease;
        & ${FlexBox}:first-child svg {
          transform: rotate(180deg);
        }
      }
      & + ${TripWrapper} ${FlexBox}:first-child svg {
        transition: transform 0.25s ease;
      }
    `;

    const Label = styled.label`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    `;

    const Header = styled.h3`
      background: #ffcc00;
      color: #000;
      width: fit-content;
      padding: 0.1em;
      font-size: 1em;
      margin: 0.3em 0;
      margin-left: auto;
    `;

    const InfoWrapper = styled.div`
      display: flex;
    `;

    const InfoSpan = styled.span`
      margin-left: auto;
    `;


    return (
      <React.Fragment>
        <RadioButton type="radio" name={groupId} id={trip._id} onClick={this.toggleFold} />
        <TripWrapper>
          <FlexBox>
            <Label htmlFor={trip._id}>
              <FontAwesomeIcon icon="chevron-down" />
              <span>{trip.endKms - trip.startKms} KMs</span>
            </Label>
          </FlexBox>

          <Header>Route</Header>
          <InfoWrapper>
            van: <InfoSpan>{trip.startZipcode}, {trip.startNumber}</InfoSpan>
          </InfoWrapper>
          <InfoWrapper>
            afwijkend: <InfoSpan>{trip.deviatingRoute}</InfoSpan>
          </InfoWrapper>
          <InfoWrapper>
            naar: <InfoSpan>{trip.endZipcode}, {trip.endNumber}</InfoSpan>
          </InfoWrapper>

          <Header>Kilometerteller</Header>
          <InfoWrapper>beginstand: <InfoSpan>{trip.startKms}</InfoSpan></InfoWrapper>
          <InfoWrapper>eindstand: <InfoSpan>{trip.endKms}</InfoSpan></InfoWrapper>

          <Header>Overig</Header>
          <div>Type rit: {trip.type}</div>
          <div>Privé-omrijkms: {trip.privateDetourKms}</div>
          <button onClick={this.handleEditTrip}>Edit me</button>
          <button onClick={this.handleDeleteTrip}>Delete me</button>
        </TripWrapper>
      </React.Fragment>
    );
  }
}

export default Trip;
