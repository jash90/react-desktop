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
padding:16px;
justify-content:space-evenly;
`;

const Card = styled.div<{ horizontal?: boolean }>(({ horizontal }) => ({
    display: "flex",
    flexDirection: horizontal ? "row" : "column",
    justifyContent: horizontal ? "space-evenly" : "center",
    alignItems: "center",
    height: horizontal ? 50 : 100,
    padding: 10,
}));

const Row = styled.div`
display:flex;
flex-direction: column;
justify-content:flex-start;
flex:1
`


export { EmptyItem, Container, Card as Col, Row };
