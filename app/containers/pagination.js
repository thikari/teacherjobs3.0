import React, { Component } from 'react';
import styled from 'styled-components';
import { Menu } from 'semantic-ui-react'
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

export default class Job extends Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(page) {
       this.props.onPaginate(page);
    }

    render() { 
        return (
            <Pagination
                activePage={this.props.pagination.page}
                itemsCountPerPage={this.props.pagination.pageSize}
                totalItemsCount={this.props.pagination.totalItems}
                pageRangeDisplayed={5}
                onChange={this.handleItemClick}
            />
        )
    }
}