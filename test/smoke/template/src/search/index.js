import React from 'react';
import ReactDOM from 'react-dom';
import largeNumber from 'larger-number-yanghy';
import './search.less';
import '../../common';
import { a } from './tree-shaking';

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
            <div>
                { Text ? <Text/> : null }
                搜索页面
            </div>
        );
    }
}
ReactDOM.render(
    <Search/>,
    document.getElementById('root')
);