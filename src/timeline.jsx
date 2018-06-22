import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, Page, Button, BackButton, List, ListItem, ListHeader, Icon, Splitter,
        SplitterContent, SplitterSide, Fab, PullHook} from 'react-onsenui';
import {notification} from 'onsenui';

import Publication from './publication'
import Profile from './profile'
import Following from './following'
import Configuration from './configuration'
import Post from './post'
import MyPosts from './myposts';
import PostItems from './components/postitems';
// For test API Consume
import $ from 'jquery';
import Api from './api';

export default class Timeline extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            pull_estate: 'initial',
            posts: [],
            session: {}
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.renderFixed = this.renderFixed.bind(this);
        this.render = this.render.bind(this);
    }

    consumeAPI() {
        $.ajax({
            url: 'http://localhost:8001/posts/',
            dataType:'json',
            cache: false,
            success: function(data) {
                this.setState({posts: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
            }
        });
    }

    // Execute when the app start
    componentDidMount(){
        this.consumeAPI();
        this.setState({session: JSON.parse(sessionStorage.getItem("session"))});
        var user = JSON.parse(sessionStorage.getItem("session"));
        console.log("session: "+ user.email);
    }

    handlePullChange(e) {
        console.log(e.state);
        this.setState({pull_estate: e.state});
    }

    handleLoad(done) {
        console.log(done);
        setTimeout(() => {this.consumeAPI()}, 500);
    }

    getContent() {
        switch (this.state.pull_estate) {
            case 'initial':
                return 'Desliza para recargar';
            case 'preaction':
                return "Soltar";
            case 'action':
                return 'Cargando...';
        }
    }

    pushPage(post) {
        this.props.navigator.pushPage({component: Publication, props: {post}});
    }

    popPage() {
        this.props.navigator.popPage();
    }

    pushSpliPages(item) {
        var item_sel = item.toLowerCase();
        if (item_sel == "perfil") {
            this.props.navigator.pushPage({component: Profile, props: {name: "usuario"}});
        }
        else if (item_sel == "seguidores") {
            this.props.navigator.pushPage({component: Following});
        }
        else if (item_sel == "configuracion") {
            this.props.navigator.pushPage({component: Configuration});
        }
        else if(item_sel == "mis publicaciones") {
            this.props.navigator.pushPage({component: MyPosts})
        }
        else if(item_sel == 'api') {
            this.props.navigator.pushPage({component: Api, props: {posts: this.state.posts}});
        }
    }

    pushPost() {
        this.props.navigator.pushPage({component: Post})
    }

    hide() {
        this.setState({isOpen: false});
    }

    show() {
        this.setState({isOpen: true});
    }

    renderToolbar() {
        return (
            <Toolbar>
                <div className="left">
                <ToolbarButton onClick={this.show}>
                    <Icon icon='ion-navicon, material:md-menu' />
                </ToolbarButton>
                </div>
                <div className="center">Publicaciones</div>
                <div className="right">
                    <ToolbarButton onClick={this.popPage.bind(this)}>
                        Cerrar
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    renderFixed() {
        return (
          <Fab
            onClick={this.pushPost.bind(this)}
            position='bottom right'>
            <Icon icon='md-store'/>
          </Fab>
        );
      }

    render() {
        let postItems = this.state.posts;
        if(this.state.posts) {
            postItems = this.state.posts.map(post => {
                return(
                    <PostItems onPost={this.pushPage.bind(this, post)} key={post.id} post = {post} />
                );
            })
        }
        return (
            <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed} >
                <Splitter>
                    <SplitterSide
                        style={{
                            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                        }}
                        side='left'
                        width={200}
                        collapse={true}
                        swipeable={true}
                        isOpen={this.state.isOpen}
                        onClose={this.hide}
                        onOpen={this.show}
                    >
                    <Page>
                        <List
                            dataSource={['Perfil', 'Seguidores', 'Mis publicaciones','Configuracion', 'API']}
                            renderRow={(title) => (
                                <ListItem key={title} onClick={this.pushSpliPages.bind(this, title)} tappable>{title}</ListItem>
                            )}
                        />
                    </Page>
                    </SplitterSide>
                    <SplitterContent>
                        <Page>
                            <PullHook onChange={this.handlePullChange.bind(this)} onLoad={this.handleLoad.bind(this)}>
                                {this.getContent()}
                            </PullHook>
                            <List>
                                { postItems }
                            </List>
                        </Page>
                    </SplitterContent>
                </Splitter>
            </Page>
        );
    }
}