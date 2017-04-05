import React, { Component } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import jobsService from '../services/jobs.js';

export default class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countryOptions: [],
            cityOptions:  [],
            categoryOptions:  []
        };

        this.countryCitymap = {};

        //Bind fuctions correctly to this class
        this.handleChange = this.handleChange.bind(this);
    }
    
    // We get the filters information once this component has mounted
    componentDidMount() {
        jobsService.getFilterObj((err, data) => {
            if(data) {
                console.log('filters loaded');
                this.countryCitymap = data.countryCitymap;
                let countries = Object.keys(data.countryCitymap);
                let cities = data.countryCitymap[countries[0]];
                let categories = data.categories;

                this.updateFilters(countries, cities, categories);
            } else {
                alert('Could not setup filters options');
            }
        });
    }

    // This method sets the categories for the filters in this state
    updateFilters(countries, cities, categories) {
        const newState = Object.assign({}, this.state);
        newState.categoryOptions = this.formatData(categories);
        newState.cityOptions = this.formatData(cities);
        newState.countryOptions= this.formatData(countries);
        this.setState(newState);
    }

    // This method updates the city filters based on the country selected
    updateCities(country) {
        const newState = Object.assign({}, this.state);
        newState.cityOptions = this.formatData(this.countryCitymap[country]);
        this.setState(newState);
    }

    // this formats the data to the way it can be used by the filters
    formatData(data) {
        return data.map((item) => {
            return { 
                key: item,
                value: item,
                text: item,
            };
        });
    }
    
    // This method is called when ever the filters are changed
    handleChange(value, type) {
        if(type == 'country') {
            this.updateCities(value);
        }
        this.props.onFilter(value, type);
    }

    render() {
        return (
            <div>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Dropdown
                                placeholder='Select Country'
                                fluid
                                search
                                selection
                                options={this.state.countryOptions}
                                onChange={ (e, { value }) => { this.handleChange(value, 'country') } }
                                 />
                        </Grid.Column>
                        <Grid.Column>
                            <Dropdown
                                placeholder='Select State'
                                search 
                                fluid
                                selection 
                                options={this.state.cityOptions} 
                                onChange={ (e, { value }) => { this.handleChange(value, 'city') } }
                                />
                        </Grid.Column>
                        <Grid.Column>
                            <Dropdown
                                placeholder='Select Categories'
                                fluid
                                multiple
                                selection
                                options={this.state.categoryOptions}
                                onChange={ (e, { value }) => { this.handleChange(value, 'categories') } }
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}