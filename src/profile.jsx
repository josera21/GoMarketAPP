import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, BottomToolbar, Page, Button, BackButton, List, ListItem, ListHeader, 
		Icon, Card, Select, Row, Col, ProgressCircular} from 'react-onsenui';
import {notification} from 'onsenui'

import pubimage from 'images/publication1.jpg';
import Configuration from './configuration';

import $ from 'jquery';

export default class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			modifier: "",
			user: {},
			loading: true
		};
		this.renderBottomToolbar = this.renderBottomToolbar.bind(this);
	} 

	consumeProfile() {
        var user = JSON.parse(sessionStorage.getItem("session"));
        $.ajax({
            url: 'http://localhost:8001/profiles/'+user.id+'/',
            dataType:'json',
            cache: false,
            success: function(data) {
				this.setState({user: data, loading: false});
				console.log(this.state.user);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
	}
	
	// Execute when the component start
    componentDidMount(){
        this.consumeProfile();
    }

	popPage() {
		this.props.navigator.popPage(); 
	}

	pushConfig() {
		this.props.navigator.pushPage({component: Configuration});
	}

	pushMessages() {
		notification.alert("Opcion no disponible aun.");
	}

	pushEditProfile() {
		notification.alert("Opcion no disponible aun.");
	}

	renderToolbar() {
		return (
			<Toolbar>
				<div className="left"><BackButton></BackButton></div>
				<div className="center">Mi perfil</div>
				<div className="right">
					<ToolbarButton>
						Cerrar sesion
					</ToolbarButton>
				</div>
			</Toolbar>
		);
	}

	renderBottomToolbar() {
        return (
			<BottomToolbar className="bottom-toolbar">
				<Row>
					<Col width="30%">
						<ToolbarButton onClick={this.pushEditProfile}>
							<Icon className="left-space" icon="ion-edit"/>
							<div className="left-space">Perfil</div>
						</ToolbarButton>
					</Col>
					<Col width="40%">
						<ToolbarButton onClick={this.pushMessages}>
							<Icon style={{marginLeft: "2.2em"}} icon="ion-paper-airplane" />
							<div className="left-space">Mensajes</div>
						</ToolbarButton>
					</Col>
					<Col width="30%">
						<ToolbarButton onClick={this.pushConfig.bind(this)}>
							<Icon style={{marginLeft: "2.2em"}} icon="ion-wrench"/>
							<div className="left-space">Config</div>
						</ToolbarButton>
					</Col>
				</Row>
			</BottomToolbar>
        );
    }

	render() {
		if (this.state.loading) {
			return <ProgressCircular indeterminate></ProgressCircular>
		}
		return (
			<Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
				<Card>
					<img className="center-content" src={pubimage} alt="Onsen UI"/>
					<div className="title">
						{this.state.user.user.first_name} {this.state.user.user.last_name}
					</div>
					<div className="content">
						<div>
                            <Button modifier='quiet'>
							Mis publicaciones<Icon className="left-space" icon="ion-pricetags"></Icon>
							</Button>
                        </div>
						<ListHeader className="list-head"></ListHeader>
						<ListItem className="list-item">Cedula: {this.state.user.ced}</ListItem>
						<ListItem className="list-item">Usuario: {this.state.user.user.username}</ListItem>
						<ListItem className="list-item">Telefono: {this.state.user.phone_number}</ListItem>
						<ListItem className="list-item">Correo: {this.state.user.user.email}</ListItem>
					</div>
				</Card>
			</Page>
		);
	}
}