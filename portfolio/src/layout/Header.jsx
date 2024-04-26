import React from "react";
import { styled } from "styled-components";

const HeaderDiv = styled.div`
  height: 10vh;
  background-color: #222831;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const StyledLink = styled.a`
  font-size: 2vh;
  color: #eeeeee;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #f05454;
`;

function Header() {
  return (
    <HeaderDiv>
      <div className="col">
        <StyledLink className="navbar nav-link" href="#">
          포트폴리오
        </StyledLink>
      </div>
      <div className="col text-end">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <StyledLink
              className="nav-link active"
              aria-current="page"
              href="#"
            >
              포트폴리오 관리
            </StyledLink>
          </li>
          <li className="nav-item">
            <StyledLink className="nav-link" href="#">
              방명록
            </StyledLink>
          </li>
          <li className="nav-item">
            <StyledLink className="nav-link" href="#">
              로그인
            </StyledLink>
          </li>
        </ul>
      </div>
    </HeaderDiv>
  );
}

export default Header;
