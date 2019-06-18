import React, { Component } from "react";
import TripsOverview from "./components/tripsOverview";
import Takeover from "./components/takeover";
import Filter from "./components/filter"
import moment from "moment";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "./App.css";

library.add(faChevronDown);
library.add(faChevronUp);

class App extends Component {
  state = {
    trips: [
      {
        _id: {},
        trips: []
      }
    ],
    tripIdToEdit: "",
    takeoverStatus: "closed",
    startDate: moment(new Date()).startOf('month').format("YYYY-MM-DD"),
    endDate: moment(new Date()).endOf('month').format("YYYY-MM-DD")
  };

  editTrip = id => {
    this.setState({ tripIdToEdit: id });
    this.toggleForm();
  }

  deleteTrip = id => {
    axios.delete(`/api/trip?id=${id}`)
      .then(res => {
        this.refreshData();
        if (res.status !== 200) alert("Something went wrong!");
      });
  }

  toggleForm = () => {
    let takeoverStatus = ""
    if (this.state.takeoverStatus === "closed") {
      takeoverStatus = "open"
    } else {
      takeoverStatus = "closed"
      this.setState({ tripIdToEdit: "" });
    }
    this.setState({ takeoverStatus });
  };

  handleDate = (type, date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (type === "start") {
      this.setState({ startDate: formattedDate });
      this.fetchData(formattedDate);
    } else {
      this.setState({ endDate: formattedDate });
      this.fetchData(this.state.startDate, formattedDate);
    }
  }

  refreshData = () => {
    this.fetchData();
  }

  fetchData(startDate = this.state.startDate, endDate = this.state.endDate) {
    axios.get(`api/trips/fromTo?greaterThan=${startDate}&lessThan=${endDate}`)
      .then(res => {
        console.log(res.data.data, 'fetched')
        this.setState({ trips: res.data.data });
      });
  }

  componentDidMount() {
    // Filter usage
    this.fetchData();
  }

  render() {

    const FlexBox = styled.div`
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      position: fixed;
      top: 0;
      padding: 18px 0;
      width: 100vw;
      z-index: 3;
      & >div+div{
        margin-left: 5em;
      }
    `;

    return (
      <React.Fragment>
        <FlexBox>
          <Filter date={this.state.startDate} onChange={(e) => this.handleDate("start", e)} labelText={'begin datum'} />
          <Filter date={this.state.endDate} onChange={(e) => this.handleDate("end", e)} labelText={'eind datum'} />
        </FlexBox>
        <Takeover tripIdToEdit={this.state.tripIdToEdit} toggleForm={this.toggleForm} status={this.state.takeoverStatus} refreshData={this.refreshData} />
        <TripsOverview trips={this.state.trips} editTrip={this.editTrip} deleteTrip={this.deleteTrip} />
      </React.Fragment>
    );
  }
}

export default App;
