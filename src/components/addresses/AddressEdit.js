import React, { Component, Modal } from "react";
import { Card, Button, Container } from "react-bootstrap";
import AddressDataService from "../../services/address.data.service";
import Form from "react-bootstrap/Form";
import http from "../../utils/http-common";

class AddressEdit extends Component {
  state = {
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip: "",
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
          address_line_1: address.address_line_1,
          address_line_2: address.address_line_2,
          city: address.city,
          state: address.state,
          zip: address.zip,
        })
      )
      .catch(console.error);
  }
  // to access different address IDs
  // view(id) {
  //   return http.get(`/addresses/${id}`);
  // }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("test", this.state, this.props);
    http.put(`/addresses/${this.props.match.params.id}`, this.state);
  };

  handleAddressLine1 = (event) => {
    this.setState({
      address_line_1: event.target.value,
    });
  };

  handleAddressLine2 = (event) => {
    this.setState({
      address_line_2: event.target.value,
    });
  };

  handleCity = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  handleState = (event) => {
    this.setState({
      state: event.target.value,
    });
  };
  handleZip = (event) => {
    this.setState({
      zip: event.target.value,
    });
  };

  render() {
    return (
      <section>
        {/* <>
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>

          <Modal show={false} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </> */}
        <div>
          {/* Bootstrap test */}
          <Container>
            <Card>
              <Card.Body>
                <Card.Title className="text-center font-weight-bold">
                  Address Details
                </Card.Title>
                <Form
                  // onLoad={this.handleAddressLine1}
                  onSubmit={this.handleSubmit}
                >
                  {/* Address 1 */}
                  <Form.Group className="mb-3" controlId="formAddress_1">
                    <Form.Label>Address 1</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.address_line_1}
                      onChange={this.handleAddressLine1}
                      placeholder="Street Address or P.O. Box"
                    />
                    <Form.Text className="text-muted">
                      Include full address
                    </Form.Text>
                  </Form.Group>
                  {/* Address 2 */}
                  <Form.Group className="mb-3" controlId="formAddress_2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.address_line_2}
                      onChange={this.handleAddressLine2}
                      placeholder="Apt, Suite, Unit, Building Floor, Etc."
                    />
                    {/* City */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAddress_2">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.city}
                      onChange={this.handleCity}
                      placeholder="Deluth"
                    />
                  </Form.Group>
                  {/* State */}
                  <Form.Group className="mb-3" controlId="formAddress_2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.state}
                      onChange={this.handleState}
                      placeholder="Minnesota"
                    />
                  </Form.Group>
                  {/* Zip */}
                  <Form.Group className="mb-3" controlId="formAddress_2">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.zip}
                      onChange={this.handleZip}
                      placeholder="111111"
                    />
                  </Form.Group>
                  {/* Confirm Check Box */}
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Confirm Edit" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
          {/* accepted */}
          {/* <form>
            <Card>
              <Card.Body>
                <Card.Text>
                  <p>Address Line 1:</p>
                  <input
                    type="text"
                    value={this.state.address_line_1}
                    onChange={this.handleAddressLine1}
                  ></input>

                  <p>Address Line 2:</p>
                  <input
                    type="text"
                    value={this.state.address_line_2}
                    onChange={this.handleAddressLine2}
                  ></input>

                  <p>City:</p>
                  <input
                    type="text"
                    value={this.state.city}
                    onChange={this.handleCity}
                  ></input>

                  <p>State:</p>
                  <input
                    type="text"
                    value={this.state.state}
                    onChange={this.handleState}
                  ></input>

                  <p>Zip:</p>
                  <input
                    type="text"
                    value={this.state.zip}
                    onChange={this.handleZip}
                  ></input>
                </Card.Text>
              </Card.Body>
            </Card>
            <Button>Submit</Button>
            <Button>Clear</Button>
            {/* <Card>
              <Card.Text>
                <h2>Order History</h2>
              </Card.Text> */}
          {/* </Card> */}
          {/* </form> */}
        </div>
      </section>
    );
  }
}

export default AddressEdit;

// to access this page
// http://localhost:3000/addresses/1/edit
