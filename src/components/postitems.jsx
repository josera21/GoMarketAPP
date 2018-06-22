import React from 'react';
import ReactDOM from 'react-dom';
import {Page, ListItem, Navigator} from 'react-onsenui';

export default class PostItems extends React.Component {

    openPost() {
        this.props.onPost();
    }

    render() {
        const number = Math.floor(Math.random()*(1000-950+1)+950)
        return(
            <ListItem onClick={this.openPost.bind(this)} modifier='chevron' key={this.props.post.id} tappable>
                <div className='left'>
                    <img src={`https://picsum.photos/200/300/?image=${number}`} className='list-item__thumbnail' />
                </div>
                <div className='center'>
                    {this.props.post.title}
                </div>
            </ListItem>
        );
    }
}