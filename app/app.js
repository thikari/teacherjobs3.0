import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import { Link } from 'react-router';
import styled from 'styled-components';


const Main = styled.div `
 padding-right: 10em;
 padding-left: 10em;
 padding-top: 4em;
 padding-bottom: 2em;
    width:100%;

`;


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;
