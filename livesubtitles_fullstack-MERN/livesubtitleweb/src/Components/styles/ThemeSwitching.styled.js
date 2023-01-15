import styled from "styled-components";

//container for theme selection buttons
export const ThemeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-top: 35px;
`;

//styling for theme selection butttons
export const ThemeButton = styled.button`
  margin: 0 5px;
  padding: 10px;
  font-size: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 2px ${({ theme }) => theme.colors.border};
`;
