import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, BottomToolbar,Page, Button, BackButton, List, ListItem, ListHeader, Icon} from 'react-onsenui';

import Publication from './publication'

export default class MyPosts extends React.Component {
    constructor(props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    
    pushPage() {
        this.props.navigator.pushPage({component: Publication, param: "Hello"});
    }

    popPage() {
        this.props.navigator.popPage();
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left"><BackButton></BackButton></div>
                <div className="center">Mis publicaciones</div>
                <div className="right">
                    <ToolbarButton onClick={this.popPage.bind(this)}>
                        Cerrar
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    renderRow(name, index) {
        const number = Math.floor(Math.random()*(1000-950+1)+950)
        return (
            <ListItem onClick={this.pushPage.bind(this)} modifier='chevron' key={index} tappable>
                <div className='left'>
                    <img src={`https://picsum.photos/200/300/?image=${number}`} className='list-item__thumbnail' />
                </div>
                <div className='center'>
                    {name}
                </div>
                <div className="right">
                    <Icon icon="md-edit" />
                </div>
            </ListItem>
        );
    }

    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <List 
                    dataSource={['Samsung S7', 'PS4', 'MacBook Pro', 'Memoria RAM', 'Disco duro Toshiba 1Tb']}
                    renderRow={this.renderRow}
                    renderHeader={() => <ListHeader><h3>Mis Publicaciones</h3></ListHeader>}
                />
            </Page>
        );
    }
}