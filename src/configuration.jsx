import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, BackButton, List, ListItem, Checkbox, Card, 
	Switch, Page} from 'react-onsenui';

export default class Configuration extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			configures: ['Perfil privado','Verificacion de dos pasos','Ver intereses primero',],
			checked: false
		};

		this.renderCheckboxRow = this.renderCheckboxRow.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({checked: e.target.checked});
	}

	renderToolbar() {
		return (
			<Toolbar>
				<div className="left"><BackButton></BackButton></div>
				<div className="center">GoMarket</div>
			</Toolbar>
		);
	}
	
	renderCheckboxRow(row) {
		return (
			<ListItem key={row} tappable>
				<label className='left'>
					<Checkbox inputId={'checkbox-${row}'}/>
				</label>
				<label htmlFor={'checkbox-${row}'} className='center'>
					{row}
				</label>
			</ListItem>
		);
	}

	render() {
		return (
			<Page renderToolbar={this.renderToolbar}>
				<h1 style={{marginLeft:'6px'}}>Configuracion</h1>
				<Card>
					<List dataSource={this.state.configures}
						renderRow={this.renderCheckboxRow}>
					</List>
					<p>Notificaciones</p>
					<Switch checked={this.state.checked} onChange={this.handleChange}></Switch>
				</Card>
			</Page>
		);
	}
}

