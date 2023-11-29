import styled from 'styled-components';

const Input = styled.button`
  width: 500px;
  height: 50px;
  outline: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f5;
  padding: 5px 10px;
  margin-top: 5px;
  &:focus {
    border: 2px solid #3dc19d;
  }
  transition: color 0.15s;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    width: 100%;
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;

export default Input;
