import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, Page, Button, BackButton, List, ListItem, ListHeader, Icon,
        Card} from 'react-onsenui';

import pubimage from 'images/publication1.jpg';

export default class Publish extends React.Component {
    
    renderToolbar() {
        return (
            <Toolbar>
                <div className="center">GoMarket</div>
                <div className="left"><BackButton></BackButton></div>
            </Toolbar>
        );
    }
    
    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Card>
                    <img className="center-content" src={pubimage} alt="Onsen UI"/>
                    <div className="title">
                        {this.props.post.title}
                    </div>
                    <div className="content">
                        <div>
                            <Button modifier='quiet'><Icon icon="ion-thumbsup"></Icon></Button>
                            <Button modifier='quiet'><Icon icon="ion-share"></Icon></Button>
                        </div>
                        <ListHeader className="list-head">Datos</ListHeader>
                        <ListItem className="list-item">Precio: {this.props.post.price}</ListItem>
                        <ListItem className="list-item">Descripcion: {this.props.post.description}</ListItem>
                        <ListItem className="list-item">Propietario: {this.props.post.user}</ListItem>
                    </div>
                </Card>
            </Page>
        );
    }
}