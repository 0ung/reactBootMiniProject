import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import styled from "styled-components";
import CustomButton from "../components/CustomButton";
import fetcher from "../fetcher";
import { CHECKID, SINGUP } from "../constants/api_constants";
import { MAIN } from "../constants/page_constants";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [vaildatePasswords, setVaildatePasswords] = useState("");
  const [email, setEmail] = useState("");
  const [signUp, isSignUp] = useState(false);
  const [dupilcate, setDupilcate] = useState(false);

  const navigation = useNavigate();
  // 유효성 검사
  const vaildateID = () => {
    const idRegExp = new RegExp(/^[a-zA-Z\d]{8,15}$/);
    return idRegExp.test(id);
  };
  const vaildatePassword = () => {
    const passwordRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>\/?])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣]).{8,20}$/;
    return passwordRegExp.test(password);
  };
  const vaildateSamePassword = (e) => {
    if (password === vaildatePasswords) {
      return true;
    }
    return false;
  };
  const vaildateEmail = (e) => {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(email);
  };

  const condition = () => {
    if (
      vaildateID() &&
      vaildatePassword() &&
      vaildateSamePassword() &&
      vaildateEmail() &&
      dupilcate
    ) {
      isSignUp(true);
      return true; // 반환값 추가
    }

    console.log("false");
    isSignUp(false);
    return false; // 반환값 추가
  };

  const validateDuplicate = async () => {
    try {
      const formdata = {
        memberId: id,
      };
      const response = await fetcher.post(CHECKID, formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDupilcate(true);
      return true;
    } catch (error) {
      if (error.status === 400) {
        alert("중복된 회원입니다.");
        setDupilcate(false);
        return false;
      }
    }
    alert("중복된 회원입니다.");
    return false;
  };

  const handleSignUp = async () => {
    console.log(signUp);
    if (!signUp) {
      alert("입력창을 확인해주세요");
      return;
    }
    try {
      const data = {
        id: id,
        password: password,
        email: email,
      };
      const response = await fetcher.post(SINGUP, data);
      alert(response.data);
      navigation(MAIN);
      return;
    } catch (error) {
      alert("회원가입 실패" + error);
      return; // 에러가 발생한 경우 함수를 즉시 종료합니다.
    }
  };

  useEffect(() => {
    condition();
  }, [id, password, vaildatePasswords, email, signUp, dupilcate]);

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="mt-5">회원가입</h2>
        <div className="input-group mb-3 mt-5">
          <span className="input-group-text" id="basic-addon1">
            아이디
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="아이디를 입력하세요 (영대문소자, 숫자로 이루어진 8~15자 사이)"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="id"
            onChange={(e) => {
              setId(e.target.value);
              vaildateID();
              setDupilcate(false);
            }}
          />
        </div>
        {dupilcate ? (
          <p style={{ color: "green" }}>회원가입 가능합니다.</p>
        ) : vaildateID() ? (
          <CustomButton
            type="button"
            className="btn btn-primary"
            onClick={validateDuplicate}
          >
            중복확인
          </CustomButton>
        ) : (
          <p style={{ color: "red" }}>입력을 확인해주세요</p>
        )}
        <div className="input-group mb-3 pt-3">
          <span className="input-group-text" id="basic-addon1">
            비밀번호
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호를 입력하세요 (특수문자, 영대소문자, 숫자를 하나씩 포함하여 8~20자 사이)"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {vaildatePassword() ? null : (
          <p style={{ color: "red" }}>입력을 확인해주세요</p>
        )}
        <div className="input-group mb-3 pt-3">
          <span className="input-group-text" id="basic-addon1">
            비밀번호
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호를 다시 입력하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setVaildatePasswords(e.target.value)}
          />
        </div>
        {vaildateSamePassword() ? null : (
          <p style={{ color: "red" }}>입력을 확인해주세요</p>
        )}
        <div className="input-group mb-3  pt-3">
          <span className="input-group-text" id="basic-addon1">
            이메일
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="이메일를 입력하세요"
            aria-label="Email"
            aria-describedby="basic-addon1"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {vaildateEmail() ? null : (
          <p style={{ color: "red" }}>입력을 확인해주세요</p>
        )}
        <div className="">
          <CustomButton
            type="button"
            className="btn btn-dark"
            onClick={handleSignUp}
          >
            생성
          </CustomButton>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUpPage;
