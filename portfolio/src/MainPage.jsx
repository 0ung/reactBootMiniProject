import React, { useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import styled from "styled-components";

const StyledParagraph = styled.p`
  font-family: "Dongle", sans-serif;
  font-weight: normal;
  font-size: 40px;
  font-style: normal;
  line-height: 1;
  color: #333;
`;
function InputTag({ children, value, disabled }) {
  return (
    <div className="form-floating mb-3">
      <input
        type="email"
        className="form-control"
        id="floatingInput"
        value={value}
        disabled={disabled}
      />
      <label htmlFor="floatingInput">{children}</label>
    </div>
  );
}

function MainPage() {
  const portfolio = {
    title: "돈벌레 친구들",
    projectIntroduction:
      "구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절구구절절절절",
    description: "RestAPI, jsp, spring등을 활용한 소비 관리 웹",
    techStack: "JAVA,SPRING,GIT...",
    email: "gupo941020@naver.com",
    phoneNumber: "010-7574-3839",
    name: "김영웅",
    img: "link",
  };
  const [data, setData] = useState(portfolio);

  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex flex-column">
          <div className="col m-5">
            {/* 부모 열에 align-items-center 클래스 추가 */}
            <div className="row ">
              {/* 이미지 열 */}
              <div className="col">
                <img src={data.img} width={450} height={600} />
              </div>
              {/* 내용 열 */}
              <div className="col d-grid gap-4">
                <InputTag value={data.title} disabled={true}>
                  제목
                </InputTag>
                <InputTag value={data.description} disabled={true}>
                  한줄 소개
                </InputTag>
                <InputTag value={data.techStack} disabled={true}>
                  기술 스택
                </InputTag>
                <InputTag value={data.email} disabled={true}>
                  메일주소
                </InputTag>
                <InputTag value={data.phoneNumber} disabled={true}>
                  연락처
                </InputTag>
                <InputTag value={data.name} disabled={true}>
                  이름
                </InputTag>
              </div>
            </div>
          </div>
          {/* 상세내용 열 */}
          <div className="col col m-5">
            <StyledParagraph>{data.projectIntroduction}</StyledParagraph>
          </div>
        </div>
        {/* 1 row */}
      </div>
      {/* 컨테이너 */}
      <Footer />
    </>
  );
}

export default MainPage;
