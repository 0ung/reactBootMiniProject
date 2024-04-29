import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { MAIN, SING_UP } from "../constants/page_constants";
import fetcher from "../fetcher";
import { LOGIN_API } from "../constants/api_constants";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleSignUp = () => {
    navigation(SING_UP);
  };
  const handleLogin = async () => {
    const data = {
      id: id,
      password: password,
    };
    try {
      const response = await fetcher.post(LOGIN_API, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      let accessToken = response.data.accessToken;
      // accessToken의 페이로드 부분 추출
      let payloadBase64 = accessToken.split(".")[1];

      // Base64 디코딩 후 JSON으로 파싱하여 페이로드 얻기
      let payloadJson = JSON.parse(atob(payloadBase64));

      // 페이로드에서 원하는 데이터 얻기 (예: auth 필드)
      let auth = payloadJson.auth;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      localStorage.setItem("role", auth);
      navigation(MAIN);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="mt-5">로그인</h2>
        <div className="input-group mb-3 mt-5">
          <span className="input-group-text" id="basic-addon1">
            아이디
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="아이디를 입력하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 mt-5">
          <span className="input-group-text" id="basic-addon1">
            비밀번호
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호를 입력하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <CustomButton
          type="button"
          className="btn btn-primary"
          onClick={handleSignUp}
        >
          회원가입
        </CustomButton>
        <CustomButton
          type="button"
          className="btn btn-primary m-3"
          onClick={handleLogin}
        >
          로그인
        </CustomButton>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
