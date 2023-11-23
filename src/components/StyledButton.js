import styled, {css} from 'styled-components'

const StyledButton = styled.button`
    background-color: green;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    ${(props) =>
    props.disabled &&
    css`
      background-color: lightgray;
      cursor: not-allowed;
    `}
`

export default StyledButton
