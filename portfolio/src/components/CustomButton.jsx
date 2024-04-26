import React from "react";
import styled from "styled-components";

const CButton = styled.button`
  background-color: #31363f;
  color: #eeeeee;
  border: 0px;
`;

function CustomButton({ children, ...rest }) {
  return (
    <>
      <CButton {...rest}>{children}</CButton>
    </>
  );
}

export default CustomButton;
