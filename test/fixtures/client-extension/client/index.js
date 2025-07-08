import React, { Fragment, Component } from 'react';

import Fill from 'camunda-modeler-plugin-helpers/components/Fill';


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
