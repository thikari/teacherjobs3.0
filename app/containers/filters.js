import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components';

const Main = styled.div `
 width: 200px;
 float: left;
 margin-right: 2em;
`;

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryOptions: [
                { key: 'ch', value: 'ch', flag: 'ch', text: 'China' },
                { key: 'us', value: 'us', flag: 'us', text: 'United States' },
                { key: 'es', value: 'es', flag: 'es', text: 'Spain' }
            ],
            stateOptions:  [ { key: 'AL', value: 'AL', text: 'Alabama' }],
            categories:  [
                { key: 'teacher', text: 'teacher', value: 'teacher' },
                { key: 'english', text: 'english', value: 'english' }
            ]
        };
    }

    handleChange(event) {
        console.log(event.target.innerHTML);
    }

    render() {
        return (
            <div>
                <Main>
                    <Dropdown
                        placeholder='Select Country'
                        fluid
                        search
                        selection
                        options={this.state.countryOptions} />
                </Main>

                <Main>
                    <Dropdown placeholder='State' search selection options={this.state.stateOptions} />
                </Main>

                <Main>
                    <Dropdown
                        placeholder='Skills'
                        fluid
                        multiple
                        selection
                        options={this.state.categories}
                        onChange={this.handleChange.bind(this)}
                    />
                </Main>
            </div>
        );
    }
}