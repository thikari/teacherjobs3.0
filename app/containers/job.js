import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.div `
 width: 100%;
 margin-bottom: 1em;
 padding: 1em;
`;

export default class Job extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <Main>
                <p>{ this.props.data.description }</p>
            </Main>
        );
    }
}