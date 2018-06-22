import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, Button, BackButton, Card, Icon, Tab, Tabbar, 
        Input, List, ListItem, Checkbox, Row, Col, Switch, Select, Navigator, Page} from 'react-onsenui';
import {notification} from 'onsenui';
import $ from 'jquery';

import Publication from './publication';
import MyTab from './components/mytab';

export default class Post extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            post: []
        };

        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    createPost(data_post) {
        console.log(data_post);
        $.ajax({
            url:"http://localhost:8001/posts/",
            type: "POST",
            dataType: "json",
            cache: false,
            data: JSON.stringify(data_post),
            contentType: "application/json",
            success: function(response) {
                this.setState({post: response});
                this.handlePost();
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("error:"+err+"status: "+ status+"xhr: "+xhr);
                this.validationAlert();
            }.bind(this)
        });
    }

    handlePost() {
        var post = this.state.post;
        this.props.navigator.pushPage({component: Publication, props: {post}});
    }

    validationAlert() {
        notification.alert("Ha ocurrido un error!");
    }

    renderToolbar() {
        const titles = ['Seleccion de categoria', 'Datos de publicacion', 'Publicar'];
        return (
            <Toolbar>
                <div className="left"><BackButton></BackButton></div>
                <div className="center">{titles[this.state.index]}</div>
            </Toolbar>
        );
    }

    renderTabs() {
        return [
            {
                content: <MyTab step="categoria" />,
                tab: <Tab label='Categoria' icon='md-bookmark' />
            },
            {
                content: <MyTab step="articulo" />,
                tab: <Tab label='Datos' icon='md-assignment' />
            },
            {
                content: <MyTab step="publish" onPublic={this.createPost.bind(this)} />,
                tab: <Tab label='Publicar' icon='md-forward' /> 
            }
        ];
    }
    
    render() {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <Tabbar
                    swipeable={true}
                    position='bottom'
                    index={this.state.index}
                    onPreChange={(event) => {
                            if (event.index != this.state.index) {
                                this.setState({index: event.index});
                            }
                        }
                    }
                    renderTabs={this.renderTabs}
                />
            </Page>
        );
    }
}