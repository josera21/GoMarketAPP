import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, ToolbarButton, Icon, Navigator} from 'react-onsenui';
import {notification} from 'onsenui';

import Timeline from './timeline'
import Registration from './registration'

import $ from 'jquery';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      session: null
    };
    this.incorrectPopup = this.incorrectPopup.bind(this);
  }
  
  alertPopup() {
    notification.toast('¡Bien! haz iniciado sesion.', {timeout: 2000});
  }

  incorrectPopup() {
    notification.alert("Credenciales incorrectas!");
  }

  pushPopup() {
    notification.confirm('Estas seguro que deseas continuar ?')
  }

  pushPage() {
    this.alertPopup();
    this.props.navigator.pushPage({component: Timeline, props: {user: this.state.session}});
  }
  
  pushReg() {
    this.props.navigator.pushPage({component: Registration})
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    var actual = evt.target.name;
    console.log(this.state + actual);
  }

  setSession(resp, key) {
    sessionStorage.setItem(key, JSON.stringify(resp));
    this.setState({ session: resp });
  }

  loginRequest() {
    var data = {
      "email": this.state.email,
      "password": this.state.password
    }

    const session = sessionStorage.getItem(this.state.session);
    if (session) {
      this.setState({session: JSON.parse(session)});
      return;
    }

    $.ajax({
      url:"http://localhost:8001/login/",
      type: "POST",
      dataType: "json",
      cache: false,
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(response) {
          console.log("response: "+ JSON.stringify(response));
          this.setSession(response, "session");
          this.pushPage();
      }.bind(this),
      error: function(xhr, status, err) {
          console.log(err);
          this.incorrectPopup();
      }.bind(this)
    });
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>GoMarket</div>
        <div className='right'>
          <ToolbarButton>
            Cerrar
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <form action="">
        <div className="login-form">
          <input name="email" value={this.state.email} onChange={evt => this.handleChange(evt)} type="email" className="text-input--underbar" placeholder="Email" />
          <input name="password" value={this.state.password} onChange={evt => this.handleChange(evt)} type="password" className="text-input--underbar" placeholder="Password" />
          <br/><br/>
          <Button type="submit" modifier="large" className='login-button' onClick={this.loginRequest.bind(this)}>
            Iniciar sesion
          </Button>
          <br/><br/>
          <Button modifier="quiet" className='forgot-password' onClick={this.pushPopup}>
            ¡Olvide mi contraseña!
          </Button>
          <Button modifier="quiet" onClick={this.pushReg.bind(this)}>
            Registrarse
          </Button>
        </div>
        </form>
      </Page>
    );
  }
}