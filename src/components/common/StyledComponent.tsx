import styled from 'styled-components';

const EmptyItem = styled.div`
 @media (max-width: 900px) {
  width:100%;
 }
 width:40%;
 min-height:200px;
 border-radius: 30px;
 background-color: black;
 margin:10px;
 padding:20px;
 color:white;
`;

const Container = styled(EmptyItem)`
display:flex;
flex-direction:column;
flex-wrap:wrap;
padding:16px;
justify-content:space-evenly;
`;

const Col = styled.div`
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
max-width:250px;
min-height:100px;
margin:10px;
`
const Row = styled.div`
display:flex;
flex-direction: Row;
flex-wrap:wrap;
`


export { EmptyItem, Container, Col, Row };
