import React, { Component } from 'react';

import { IconButton } from '@carbon/react';
import { Add } from '@carbon/icons-react';

export default class TestClient extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconButton label="Add">
        <Add />
      </IconButton>
    );
  }
}
