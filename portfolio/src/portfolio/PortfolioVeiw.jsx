import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function PortfolioVeiw() {
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
          />
        </div>
        <div className="form-floating mt-4">
          <textarea
            className="form-control"
            placeholder="프로젝트에 대해서 자세한 설명 작성해주세요!"
            id="floatingTextarea2"
            style={{ height: 200 }}
          ></textarea>
          <label htmlForfor="floatingTextarea2">상세 설명</label>
        </div>
        <div className="input-group mb-3 mt-4">
          <span className="input-group-text" id="basic-addon1">
            소개글
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="간단한게 프로젝트 소개글 작성해주세요!"
            aria-label="Username"
            aria-describedby="basic-addon1"
            name="name"
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
            name="name"
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label"></label>
          <input class="form-control" type="file" id="formFile" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PortfolioVeiw;
