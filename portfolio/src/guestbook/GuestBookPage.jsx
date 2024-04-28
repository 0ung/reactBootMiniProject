import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";
import Pagination from "../components/Pagnation";

const totalPages = 100;

const guestData = [
  {
    id: "1",
    name: "더미",
    comment: "덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤",
    createdAt: "2024-04-26",
    updatedAt: undefined,
  },
  {
    id: "2",
    name: "김영웅",
    comment: "덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤",
    createdAt: "2024-04-27",
    updatedAt: undefined,
  },
  {
    id: "3",
    name: "김웅영",
    comment: "덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤",
    createdAt: "2024-04-28",
    updatedAt: "2024-04-29",
  },
  {
    id: "4",
    name: "김형웅",
    comment: "덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤덤",
    createdAt: "2024-04-30",
    updatedAt: "2024-05-01",
  },
];

function GuestBookPage() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLoggin = () => {
    setLoggedInUser(true);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="m-5">방명록</h2>
        <div className="h3 text-center">방명록 작성</div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            name="comment"
          ></textarea>
          <label htmlFor="floatingTextarea">Comments</label>
        </div>
        <CustomButton className="btn btn-primary mt-3">제출</CustomButton>

        {/* 방명록 등록 */}
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">이름</th>
              <th scope="col">코멘트</th>
              <th scope="col">작성일</th>
              <th scope="col">수정일</th>
            </tr>
          </thead>
          <tbody>
            {guestData.map((guest) => (
              <React.Fragment key={guest.id}>
                <tr>
                  <td>{guest.id}</td>
                  <td>{guest.name}</td>
                  <td>{guest.comment}</td>
                  <td>{guest.createdAt}</td>
                  <td>{guest.updatedAt || "-"}</td>
                </tr>
                {loggedInUser && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "right" }}>
                      <CustomButton className="btn btn-primary mr-2">
                        수정
                      </CustomButton>
                      <CustomButton className="btn btn-danger">
                        삭제
                      </CustomButton>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Footer />
    </>
  );
}

export default GuestBookPage;
