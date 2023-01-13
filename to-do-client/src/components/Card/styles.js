import styled from "styled-components";

export const Box = styled.div`
    background:white;
    padding:0px;
`;

export const Title = styled.p`
    background:${({ bg }) => bg};
    color:white;
    text-align:center;
    padding:10px;
    margin:0
`;

export const Item = styled.p`
    display:flex;
    ${'' /* space between sides of column */}
    gap:4px;
    justify-content:space-between;
`;

export const Arrow = styled.button`
    color:${({ disabled }) => disabled ? "grey" : "skyblue"};
    background: none;
    height:25px;
    width:25px;
`;

export const Task = styled.span`
    width:80%
    text-align: right;
    flex-grow:1;
`;

export const DivButton = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:10px
`;

export const Button = styled.button`
    background:##edeff2;
    padding:4px 10px;
    margin-top:10px;
    margin-bottom:20px;
    border: 1px solid grey;
`;