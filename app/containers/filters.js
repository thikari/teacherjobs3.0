import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react'

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

        //Bind fuctions correctly to this class
        this.handleCategoryChange = this.handleChange.bind(this);
    }

    handleChange(e, { value }) {
        console.log(value);
    }

    render() {
        return (
            <Grid columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Select Country'
                            fluid
                            search
                            selection
                            options={this.state.countryOptions} />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                             placeholder='State'
                             search 
                             fluid
                             selection 
                             options={this.state.stateOptions} />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                            placeholder='Skills'
                            fluid
                            multiple
                            selection
                            options={this.state.categories}
                            onChange={this.handleChange}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}