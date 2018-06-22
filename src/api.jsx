import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Toolbar, List, BackButton} from 'react-onsenui';

import PostItems from './components/postitems';

export default class Api extends React.Component {
    renderToolbar() {
        return(
            <Toolbar>
                <div className="left"><BackButton></BackButton></div>
                <div className="center">Testing API</div>
            </Toolbar>
        );
    }
    
    render() {
        let postItems = this.props.posts;
        if(this.props.posts) {
            postItems = this.props.posts.map(post => {
                return(
                    <PostItems key={post.id} post = {post} />
                );
            })
        }
        return(
            <Page renderToolbar={this.renderToolbar}>
                <h1>User lists</h1>
                <List>
                    {postItems}
                </List>
            </Page>
        );
    }
}