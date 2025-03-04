import React, { Component } from 'camunda-modeler-plugin-helpers/react';

import { Modal } from 'camunda-modeler-plugin-helpers/components';

import { Button, Theme, IconButton, TextInput } from 'camunda-modeler-plugin-helpers/@carbon/react';
import { Add } from 'camunda-modeler-plugin-helpers/@carbon/icons-react';

export default class TestClient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  close = () => {
    this.setState({ modalOpen: false });
  };

  render() {

    return (
      <CarbonModal onClose={ close } />
    );
  }

}

function CarbonModal({ onClose }) {

  return (
    <Modal className="modal-test-carbon">
      <Modal.Title>Test Carbon</Modal.Title>
      <Modal.Body>
        <h1>Carbon</h1>
        <Theme theme="g90">
          <p className="carbon-padding">Carbon is cool</p>
        </Theme>
        <p className="carbon-color">Carbon is colorful</p>
        <div>
          <TextInput
            className="input-test-class"
            defaultWidth={ 300 }
            helperText="Helper text"
            id="text-input-1"
            invalidText="Error message goes here"
            labelText="Label text"
            placeholder="Placeholder text"
            size="md"
            type="text"
          />
          <IconButton label="Add">
            <Add />
          </IconButton>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ onClose }>OK</Button>
      </Modal.Footer>
    </Modal>
  );
}
