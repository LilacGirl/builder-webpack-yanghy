//import React from 'react';
// import ReactDOM from 'react-dom';
// import largeNumber from 'larger-number-yanghy';
// import './search.less';
// import '../../common';
// import { a } from './tree-shaking';

const React = require('react');
const ReactDOM = require('React-dom');
const largeNumber = require('larger-number-yanghy');
require('./search.less');
require('../../common')

class Search extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            Text: null
        }
    }
    loadComponent() {
        import('./text.js').then(Text => {
            this.setState({
                Text: Text.default
            })
        })
    }
    render() {
        const { Text } = this.state;
        console.log(largeNumber('999', '1'));
        return(
            <div onClick={this.loadComponent.bind(this)}>
                { Text ? <Text/> : null }
                搜索页面
            </div>
        );
    }
}

module.exports = <Search></Search>;