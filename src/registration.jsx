import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, BackButton, Toolbar, Card, Input, Row, Col, Navigator} from 'react-onsenui';
import {notification} from 'onsenui';
import imgLogo from 'images/market-icon.png'
import Login from './login'
import $ from 'jquery';

export default class Registration extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            ced: "",
            phone_number: "",
            address: "",
            sex: ""
        };
    }

    validationAlert() {
        this.notification.alert("Faltan datos por ingresar");
    }

    pushLogin() {
        notification.alert("Ya puedes iniciar sesion!");
        this.props.navigator.pushPage({component: Login});
    }
    
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
        var actual = evt.target.name;
        console.log(this.state + actual);
    }

    createUser() {
        var data = {
            'user': {
                "username": this.state.username,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "password": this.state.password
            },
            "ced": this.state.ced,
            "phone_number": this.state.phone_number,
            "address": this.state.address,
            "sex": this.state.sex,
        }

        console.log(data);

        $.ajax({
            url:"http://localhost:8001/profiles/",
            type: "POST",
            dataType: "json",
            cache: false,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function() {
                this.pushLogin();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                this.validationAlert;
            }.bind(this)
        });
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton></BackButton>
                </div>
                <div className="center">GoMarket</div>
            </Toolbar>
        );
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Card>
                    <div className="center-this">
                        <h1>Registrate en
                            <display3 style={{color:'royalblue'}}> GoMarket</display3>
                        </h1>
                    </div>
                    <img style={{width: '40%', marginLeft:'6em'}} src={imgLogo} alt=""/>
                    <form action="">
                    <div className="login-form">
                        <p><Input name="first_name" value={this.state.first_name} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Nombre' /></p>
                        <p><Input name="last_name" value={this.state.last_name} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Apellido' /></p>
                        <p><Input name="email" value={this.state.email} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Email' /></p>
                        <p><Input name="ced" value={this.state.ced} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Cedula' /></p>
                        <p><Input name="username" value={this.state.username} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Username' /></p>
                        <p><Input name="password" value={this.state.password} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' type='password' float placeholder="password" /></p>
                        <p><Input name="phone_number" value={this.state.phone_number} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Telefono' /></p>
                        <p><Input name="address" value={this.state.address} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Direccion' /></p>
                        <p><Input name="sex" value={this.state.sex} onChange={evt => this.handleChange(evt)} className="input-reg" modifier='material' float placeholder='Sexo' /></p>
                        <p>
                            <Button type="submit" modifier="large" onClick={this.createUser.bind(this)}>Registrarse</Button>
                        </p>
                    </div>
                    </form>
                </Card>
            </Page>
        );
    }
}