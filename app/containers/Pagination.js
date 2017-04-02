import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react'
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");


const Main = styled.div `
 width: 100%;
 margin-bottom: 1em;
 padding: 1em;
`;

export default class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageInfo: this.props.pageInfo
        };

        //
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(page) {
        const newState = Object.assign({}, this.state);
        newState.pageInfo.currentPage = page;
        this.setState(newState);
        this.props.onPaginate(page);
    }


    render() {
        return (
            <Pagination
                activePage={this.state.pageInfo.currentPage}
                itemsCountPerPage={20}
                totalItemsCount={this.state.pageInfo.pageSize * 20}
                pageRangeDisplayed={5}
                onChange={this.handleItemClick}
            />
        )
    }
}