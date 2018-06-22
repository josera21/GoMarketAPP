import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarButton, BackButton, List, ListItem, ListHeader, Icon, Page} from 'react-onsenui';

export default class Following extends React.Component {
	
	renderToolbar() {
		return (
			<Toolbar>
				<div className="left"><BackButton></BackButton></div>
				<div className="center">GoMarket <span><Icon Icon="md-store"></Icon></span></div>
			</Toolbar>
		);
	}
	
	renderRow(name) {
		const number = Math.floor(1000 * Math.random());
        return (
            <ListItem modifier='chevron' key={name} tappable>
                <div className='left'>
                    <img src={`https://picsum.photos/200/300/?image=${number}`} className='list-item__thumbnail' />
                </div>
                <div className='center'>
                    {name}
                </div>
            </ListItem>
        );
	}

	render() {
		return (
			<Page renderToolbar={this.renderToolbar}>
				<List 
					dataSource={['josera', 'carlosz', 'A_mendoza', 'k-terin']}
					renderRow={this.renderRow}
					renderHeader={() => <ListHeader><h3>Siguiendo</h3></ListHeader>}
				/>
			</Page>
		);
	}
}