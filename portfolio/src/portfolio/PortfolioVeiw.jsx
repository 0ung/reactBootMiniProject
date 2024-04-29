import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";

function PortfolioVeiw() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [introducedLine, setIntroducedLine] = useState("");
  const [techStack, setTechStack] = useState("");
  const [img, setImg] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [main, isMain] = useState("");
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="mt-5">포트폴리오 조회</h2>
        <div className="input-group mb-3 mt-5">
          <span className="input-group-text" id="basic-addon1">
            제목
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="제목을 입력하세요"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="name"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-floating mt-4">
          <textarea
            className="form-control"
            placeholder="프로젝트에 대해서 자세한 설명 작성해주세요!"
            id="floatingTextarea2"
            style={{ height: 200 }}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea2">상세 설명</label>
        </div>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            소개글
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="간단한 프로젝트 소개글 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setIntroducedLine(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            기술 스택
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="프로젝트에 사용된 기술 스택을 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label"></label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            연락처
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="연락처를 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            이름
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="이름을 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            메일 주소
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="이메일을 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            대표 프로젝트
          </label>
        </div>
        <div colSpan="5" style={{ textAlign: "right" }}>
          <CustomButton className="btn btn-primary">제출</CustomButton>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PortfolioVeiw;
