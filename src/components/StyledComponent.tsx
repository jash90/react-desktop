import styled from "styled-components";

const EmptyItem = styled.div`
 @media (max-width: 700px) {
  width:100%;
 }
 width:40%;
 height:200px;
 border-radius: 30px;
 background-color: black;
 margin:10px;
 padding:20px;
 color:white;
`;

const Contener = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:16px;
justify-content:space-evenly;
`;


export { EmptyItem, Contener };
