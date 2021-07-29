import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import AddressDataService from "../../services/address.data.service";
import { Redirect } from "react-router-dom";

class AddressEdit extends Component {
  state = {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
    edited: false,
    id: "",
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    AddressDataService.view(id)
      .then(({ data: address }) =>
        this.setState({
          address_line_1: address[0].address_line_1,
          address_line_2: address[0].address_line_2,
          city: address[0].city,
          state: address[0].state,
          zip: address[0].zip,
        })
      )
      .catch(console.error);
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  // REFACTORED INTO ONE FUNCTION (on top: handleInputChange)

  // handleAddressLine1 = (event) => {
  //   this.setState({
  //     address_line_1: event.target.value,
  //   });
  // };

  // handleAddressLine2 = (event) => {
  //   this.setState({
  //     address_line_2: event.target.value,
  //   });
  // };

  // handleCity = (event) => {
  //   this.setState({
  //     city: event.target.value,
  //   });
  // };
  // handleState = (event) => {
  //   this.setState({
  //     state: event.target.value,
  //   });
  // };
  // handleZip = (event) => {
  //   this.setState({
  //     zip: event.target.value,
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const params = {
      id: id,
      address_line_1: this.state.address_line_1,
      address_line_2: this.state.address_line_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    };
    AddressDataService.put(id, params)
      .then((res) => {
        this.setState({
          edited: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.edited) {
      return <Redirect to={{ pathname: `/addresses/${this.state.id}` }} />;
    }
    return (
      <section>
        <h2>Address Details</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Card>
              <Card.Body>
                <Card.Text>
                  <div>Address Line 1:</div>
                  <input
                    type="text"
                    name="address_line_1"
                    value={this.state.address_line_1}
                    onChange={this.handleInputChange}
                  ></input>

                  <div>Address Line 2:</div>
                  <input
                    type="text"
                    name="address_line_2"
                    value={this.state.address_line_2}
                    onChange={this.handleInputChange}
                  ></input>

                  <div>City:</div>
                  <input
                    type="text"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleInputChange}
                  ></input>

                  <div>State:</div>
                  <input
                    type="text"
                    name="state"
                    value={this.state.state}
                    onChange={this.handleInputChange}
                  ></input>

                  <div>Zip:</div>
                  <input
                    type="text"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleInputChange}
                  ></input>
                </Card.Text>
              </Card.Body>
            </Card>
            <Button type="submit" value="submit">
              Submit
            </Button>
            <Button>Clear</Button>
          </form>
        </div>
      </section>
    );
  }
}

export default AddressEdit;
