import React from 'react';
import styled from 'styled-components';


const Main = styled.div `
 padding: 1em;
  background: papayawhip;
`;

const Topnav = styled.ul`
   list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;



`;

const Link = styled.li `
    float:right;

`;

const Listitems = styled.a `
    display: inline-block;
    color: palevioletred;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.3s;
    font-size: 17px;

      &:hover {
    background-color: #ffffff;
  }

`;


class Header extends React.Component {
    render() {
        return (
            <Main>

                <Topnav>

                    <Link><Listitems href="#about">About</Listitems></Link>

                </Topnav>


            </Main>
        );
    }
}

export default Header;