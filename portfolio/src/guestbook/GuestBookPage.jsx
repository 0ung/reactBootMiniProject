import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";

const guestData = {
  content: {
    1: {
      name: "더미",
      comment: "히히",
      createdAt: "2024-04-26",
      updatedAt: undefined,
    },
    2: {
      name: "김영웅",
      comment: "허허",
      createdAt: "2024-04-27",
      updatedAt: undefined,
    },
    3: {
      name: "김웅영",
      comment: "후후",
      createdAt: "2024-04-28",
      updatedAt: "2024-04-29",
    },
    3: {
      name: "김형웅",
      comment: "훠훠",
      createdAt: "2024-04-30",
      updatedAt: "2024-05-01",
    },
  },
};

function GuestBookPage() {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="m-5">방명록</h2>
        <div className="h3 text-center">방명록 작성</div>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            name="comment"
          ></textarea>
          <label for="floatingTextarea">Comments</label>
        </div>
        <CustomButton className="btn btn-primary mt-3">제출</CustomButton>
      </div>

      <Footer />
    </>
  );
}

export default GuestBookPage;
