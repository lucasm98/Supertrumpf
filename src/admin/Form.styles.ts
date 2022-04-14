import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    padding: 3px;
  }
`;

export const Label = styled.label`
  width: 120px;
  display: inline-block;
`;

export const Row = styled.div`
  &:nth-child(2n) {
    background-color: #ccc;
  }
`;