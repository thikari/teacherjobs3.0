import React from 'react';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import TypeWriter from 'react-typewriter';

const Main = styled.div `
  padding: 4em;
  background: white;

`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 200px;
  letter-spacing: -0.8px;
  text-align: center;
  color: #484848;
  text-align: left;
  padding: 8px;
`;

const Heading =styled.span `
color:palevioletred
;
`



const Welcome = () => (

    <Main>
    <Container>
        <Title><Heading>Jobboard for Teachers and Educators <br/> </Heading>
            Find teaching jobs
            <TypeWriter typing={1}>in Thailand</TypeWriter>


        </Title>
    </Container>
        </Main>
)

export default Welcome

