import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, Button, BackButton, Card, Icon, Tab, Tabbar, 
        Input, List, ListItem, Checkbox, Row, Col, Switch, Select, Page} from 'react-onsenui';
import {notification} from 'onsenui';
import $ from 'jquery';

import Publication from '../publication';

export default class MyTab extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            categories: ['Productos','Servicios','Inmuebles', 'Subasta'],
            checked: false,
            post: [],
            payment: 'Seleccionar',
            user: "",
            title: "",
            description: "",
            price: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.editSelects = this.editSelects.bind(this);
        this.renderCheckboxRow = this.renderCheckboxRow.bind(this);
        this.render = this.render.bind(this);
    }

    openPublication() {
        var data = this.loadData();
        this.setState({post: JSON.parse(data)}, () => 
            this.props.onPublic(this.state.post)
        );
    }

    loadData() {
        var user = JSON.parse(sessionStorage.getItem("session"));
        var dataArticle = JSON.parse(sessionStorage.getItem("dataArticle"));
        var data = {
            "user": user.id,
            "title": dataArticle.title,
            "description": dataArticle.description,
            "price": dataArticle.price,
            "pay_type": this.state.payment
        }
        return JSON.stringify(data);
    }

    handleInput(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
        var dataArticle = {
            "title": this.state.title,
            "description": this.state.description,
            "price": this.state.price,
        }
        sessionStorage.setItem("dataArticle", JSON.stringify(dataArticle));
    }

    handleChange(e) {
        this.setState({checked: e.target.checked});
    }

    editSelects(event) {
        this.setState({payment: event.target.value});
    }

    uploadPost() {
        this.props.onPost();
        this.showToast();
    } 

    showToast() {
        notification.toast("!Bien! Haz Publicado con exito.", {timeout: 1000});
    }

    renderCheckboxRow(row) {
		return (
            <Card style={{with: '100%'}}>
                <div className="title">
                    {row} <span className='rigth'><Icon icon='md-info' /></span>
                </div>
                <div className="content">
                    <ListItem key={row} tappable>
                        <label className='left'>
                            <Checkbox inputId={'checkbox-${row}'}/>
                        </label>
                        <label htmlFor={'checkbox-${row}'} className='center'>
                            Seleccionar
                        </label>
                    </ListItem>
                </div>
            </Card>
		);
	}

    render() {
        const resp = this.props.step;
        switch(resp) {
            case 'categoria':
                return (
                    <Page>
                        <section style={{margin: '16px'}}>
                            <h1 className="center-this">Selecciona una categoria</h1>
                        
                                <List dataSource={this.state.categories}
                                    renderRow={this.renderCheckboxRow}>
                                </List>
                            
                        </section>
                    </Page>
                );
            break;
            case 'articulo':
                return (
                <Page>
                    <section style={{margin: '16px'}}>
                        <h1>Complete los campos</h1>
                        <p><Input name="title" value={this.state.title} onChange={evt => this.handleInput(evt)} className="input-reg" modifier="material"  float placeholder="Titulo de publicacion" /></p>
                        <br/><br/>
                        <Input name="description" value={this.state.description} onChange={evt => this.handleInput(evt)} className="input-reg" type="multiline" modifier="material" float placeholder="Descripcion" />
                        <br/><br/>
                        <Input name="price" value={this.state.price} onChange={evt => this.handleInput(evt)} className="input-reg" type="number" modifier="material" float placeholder="Precio" />
                    </section>
                </Page>
                );
            break;
            case 'publish':
                return (
                    <Page>
                    <section style={{margin: '16px'}}>
                        <h1>Estas a un paso de publicar</h1>
                        <div className="content top-space">
                            <h3>Subir imagen <span><Icon icon="md-cloud"></Icon></span></h3>
                            <Input type='file' />
                            <br/><br/>
                            <h3>Elige un metodo de pago:</h3>
                            <Select id="choose-sel" value={this.state.payment} modifier={this.state.payment} onChange={this.editSelects}>
                                <option value="acuerdo">Acuerdo con el comprador</option>
                                <option value="transferencia">Transferencia Bancaria</option>
                                <option value="efectivo">Dinero Efectivo</option>
                                <option value="tarjeta">Tarjeta de Credito</option>
                            </Select>
                            <h3>Garantia</h3>
                            <Switch checked={this.state.checked} onChange={this.handleChange}></Switch>
                        </div>
                        
                        <Button onClick={this.openPublication.bind(this)} className="btn-green top-space" modifier="large">Publicar</Button>
                    </section>
                    </Page>
                );
            break;
            default:
                return (
                    <Page>
                        <h1>Error</h1>
                    </Page>
                );
        }
    }
}