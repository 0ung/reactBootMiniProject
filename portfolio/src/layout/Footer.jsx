import React from "react";
import { styled } from "styled-components";

const FooterDiv = styled.footer`
  background-color: #222831;
  color: #fff;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

function Footer() {
  return (
    <FooterDiv>
      <div className="py-3">
        Designed by Youngung&#169;. All rights reserved.
      </div>
    </FooterDiv>
  );
}

export default Footer;
