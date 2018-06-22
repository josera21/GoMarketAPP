import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, ToolbarButton, Icon, Navigator} from 'react-onsenui';
import {notification} from 'onsenui';

import Login from './login';

export default class App extends React.Component {
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, props);
  }

  render() {
    return (
      <Navigator initialRoute={{component: Login}} renderPage={this.renderPage} />
    );
  }
}