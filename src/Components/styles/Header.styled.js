import styled from "styled-components";

export const Header = styled.h1`
  text-align: center;
  font-weight: bold;
  padding: 30px;
  padding-top: 60px;
  top: 60px;
  background-color: ${({ theme }) => theme.colors.header};
  font-weight: bold;
`;
