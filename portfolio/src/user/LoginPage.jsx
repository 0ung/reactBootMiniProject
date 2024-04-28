import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { SING_UP } from "../constants/page_constants";

function LoginPage() {
  const navigation = useNavigate();
  const handleSignUp = () => {
    navigation(SING_UP);
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
            name="id"
          />
        </div>
        <div className="input-group mb-3 mt-5">
          <span className="input-group-text" id="basic-addon1">
            비밀번호
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="비밀번호를 입력하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="password"
          />
        </div>
        <CustomButton
          type="button"
          className="btn btn-primary"
          onClick={handleSignUp}
        >
          회원가입
        </CustomButton>
        <CustomButton type="button" className="btn btn-primary m-3">
          로그인
        </CustomButton>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
