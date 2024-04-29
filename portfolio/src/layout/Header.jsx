import React, { useState } from "react";
import { styled } from "styled-components";
import {
  GUESTBOOK,
  LOGIN,
  MAIN,
  PORTFOLIO_VIEWS,
} from "../constants/page_constants";
import fetcher from "../fetcher";
import { LOGOUT_API } from "../constants/api_constants";
import { useNavigate } from "react-router-dom";

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
  const navigation = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const handleLogout = async () => {
    const data = {
      refreshToken: localStorage.getItem("refresh_token"),
    };
    try {
      const response = await fetcher.post(LOGOUT_API, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.clear();
      alert("로그아웃 되었습니다.");
      window.location.href = MAIN;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HeaderDiv>
      <div className="col">
        <StyledLink className="navbar nav-link" href={MAIN}>
          포트폴리오
        </StyledLink>
      </div>
      <div className="col text-end">
        <ul className="nav justify-content-end">
          {role === "ADMIN" ? (
            <li className="nav-item">
              <StyledLink
                className="nav-link active"
                aria-current="page"
                href={PORTFOLIO_VIEWS}
              >
                포트폴리오 관리
              </StyledLink>
            </li>
          ) : null}
          <li className="nav-item">
            <StyledLink className="nav-link" href={GUESTBOOK}>
              방명록
            </StyledLink>
          </li>

          <li className="nav-item">
            {accessToken == null ? (
              <StyledLink className="nav-link" href={LOGIN}>
                로그인
              </StyledLink>
            ) : (
              <StyledLink className="nav-link" onClick={handleLogout}>
                로그아웃
              </StyledLink>
            )}
          </li>
        </ul>
      </div>
    </HeaderDiv>
  );
}

export default Header;
