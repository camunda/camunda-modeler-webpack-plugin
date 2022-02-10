import React, { Fragment, Component } from 'camunda-modeler-plugin-helpers/react';

import { Fill } from 'camunda-modeler-plugin-helpers/components';


export default class TestClient extends Component {

  render() {

    return (
      <Fragment>
        <Fill slot="status-bar__file">
          foo
        </Fill>
      </Fragment>
    );
  }

}
