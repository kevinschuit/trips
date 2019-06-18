import React from "react";
import Form from "./common/form";
import Datepicker from "./common/datepicker";
import axios from "axios";
import BaseJoi from "joi-browser";
import JoiDateExtensions from "joi-date-extensions";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const Joi = BaseJoi.extend(JoiDateExtensions);

registerLocale("en-GB", enGB);

class TripForm extends Form {
  state = {
    data: {
      date: moment(new Date()).format("YYYY-MM-DD"),
      deviatingRoute: "file",
      endKms: "",
      endNumber: "",
      endZipcode: "",
      privateDetourKms: "",
      startKms: "",
      startNumber: "",
      startZipcode: "",
      type: ""
    },
    date: new Date(),
    errors: {},
    types: ["zakelijk", "prive"],
    id: ""
  };

  schema = {
    date: Joi.date(),
    startZipcode: Joi.string()
      .required()
      .label("Start - Zipcode"),
    startNumber: Joi.string()
      .required()
      .label("Start - Number"),
    startKms: Joi.number()
      .required()
      .label("Start - Kms")
      .min(0),
    endZipcode: Joi.string()
      .required()
      .label("End - Zipcode"),
    endNumber: Joi.string()
      .required()
      .label("End - Number"),
    endKms: Joi.number()
      .required()
      .label("End - Kms")
      .min(0),
    type: Joi.string()
      .required()
      .label("Type"),
    privateDetourKms: Joi.number()
      .required()
      .label("Private detour kms")
      .min(0),
    deviatingRoute: Joi.string()
      .required()
      .label("Deviating route")
  };

  async populateForm() {
    try {
      if (this.props.tripId) {
        await fetch(`/api/trip?_id=${this.props.tripId}`)
          .then(data => data.json())
          .then(res => {
            console.log('date collected:', res.data);
            this.setState({ id: res.data._id })
            delete res.data._id;
            delete res.data.__v;
            console.log('id removed', res.data);
            res.data.date = res.data.date.slice(0, 10);
            this.setState({ data: res.data, date: new Date(res.data.date) })
          });
      }

    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.log('Whoops, can\'t find it buddy');
    }
  }

  async componentDidMount() {
    await this.populateForm();
    console.log('props', this.props)
  }

  handleDateChange = date => {
    const data = { ...this.state.data };
    data["date"] = moment(date).format("YYYY-MM-DD");
    this.setState({ data, date: date });
  };

  doSubmit = () => {
    if (this.state.id) {
      axios.put(`/api/trip?id=${this.state.id}`, this.state.data)
        .then(res => {
          this.props.refreshData();
          res.status === 200 ? this.props.toggleForm() : alert("Something went wrong!");
        });
    }
    else {
      axios.post("/api/trip", this.state.data).then(res => {
        this.props.refreshData();
        res.status === 200 ? this.props.toggleForm() : alert("Something went wrong!");
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <DatePicker
          customInput={<Datepicker />}
          selected={this.state.date}
          onChange={this.handleDateChange}
          dateFormat="d MMM YYYY"
          locale="en-GB"
        />
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <h4>Vertrek</h4>
              {this.renderInput("startZipcode", "Postcode")}
              {this.renderInput("startNumber", "Huisnummer")}
              {this.renderInput("startKms", "Kilometerstand", "number")}
            </div>
            <div>
              <h4>Aankomst</h4>
              {this.renderInput("endZipcode", "Postcode")}
              {this.renderInput("endNumber", "Huisnummer")}
              {this.renderInput("endKms", "Kilometerstand", "number")}
            </div>
            <div>
              <h4>Overige</h4>
              {this.renderSelect("type", "Soort rit", this.state.types)}
              {this.renderInput(
                "privateDetourKms",
                "Privé-omrijkilometers",
                "number"
              )}
              {this.renderInput("deviatingRoute", "Afwijkende route")}
            </div>
          </div>
          {this.renderButton(`${this.state.id ? "Rit aanpassen" : "Rit toevoegen"}`)}
        </form>
      </React.Fragment>
    );
  }
}

export default TripForm;
