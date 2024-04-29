import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import CustomButton from "../components/CustomButton";
import Pagination from "../components/Pagnation";
import fetcher from "../fetcher";
import {
  GUESTBOOK_ALL_API,
  GUESTBOOK_DELETE_API,
  GUESTBOOK_SAVE_API,
  GUESTBOOK_TOTAL_API,
  GUESTBOOK_UPDATE_API,
} from "../constants/api_constants";
import { useNavigate } from "react-router-dom";
import { GUESTBOOK } from "../constants/page_constants";
import jwtParser from "../jwtParser";

function GuestBookPage() {
  const [totalPages, setTotalPages] = useState(1);
  const [guestData, setGuestData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState("");
  const [editedComment, setEditedComment] = useState(""); // 수정된 코멘트를 저장하는 상태
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 코멘트의 인덱스

  // 수정 버튼을 클릭할 때 해당 인덱스를 설정하고, 수정 중인 코멘트를 입력창에 표시합니다.
  const handleEdit = (index, comment) => {
    setEditingIndex(index);
    setEditedComment(comment);
  };

  // 취소 버튼을 클릭할 때 수정 모드를 해제하고, 입력창에 있는 내용을 초기화합니다.
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedComment("");
  };

  const navigation = useNavigate();
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLoggin = () => {
    let username = jwtParser(localStorage.getItem("access_token"));
    if (username) {
      // username이 존재하면 로그인된 상태
      setLoggedInUser(true);
    } else {
      setLoggedInUser(false);
    }
  };
  const handlePage = async () => {
    try {
      let page = currentPage - 1;
      const response = await fetcher.get(GUESTBOOK_ALL_API + page);
      setGuestData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleTotalElement = async () => {
    const response = await fetcher.get(GUESTBOOK_TOTAL_API);
    let pages = response.data;
    setTotalPages(Math.floor(pages / 10) + 1);
  };

  const handleSaveGuestBook = async () => {
    const data = { comment: comment };
    try {
      const response = await fetcher.post(
        GUESTBOOK_SAVE_API,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data);
      handlePage(); // 데이터를 다시 불러와서 상태 업데이트
      setComment(" "); // 입력 필드 초기화
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateComment = async (id) => {
    const data = {
      id: id,
      comment: editedComment,
    };
    try {
      const response = await fetcher.patch(
        GUESTBOOK_UPDATE_API,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handlePage(); // 데이터를 다시 불러와서 상태 업데이트
      setEditingIndex(null); // 수정 모드 해제
      setEditedComment(""); // 수정된 코멘트 초기화
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      let api = GUESTBOOK_DELETE_API + id;
      const response = await fetcher.delete(api);
      alert(response.data);
      handlePage(); // 데이터를 다시 불러와서 상태 업데이트
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    handleTotalElement();
    handlePage();
    handleLoggin(); // handleLoggin 함수 호출 추가
  }, [currentPage, loggedInUser, totalPages, comment]);
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea">Comments</label>
        </div>
        <div colSpan="5" style={{ textAlign: "right" }}>
          <CustomButton
            className="btn btn-primary mt-3"
            onClick={handleSaveGuestBook}
          >
            제출
          </CustomButton>
        </div>

        {/* 방명록 등록 */}
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">ID</th>
              <th scope="col">코멘트</th>
              <th scope="col">작성일</th>
              <th scope="col">수정일</th>
            </tr>
          </thead>
          <tbody>
            {guestData.map((guest, index) => (
              <React.Fragment key={guest.id}>
                <tr>
                  <td>{guest.id}</td>
                  <td>{guest.memberId}</td>
                  <td>
                    {index === editingIndex ? (
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="수정할 코멘트 입력..."
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                      </div>
                    ) : (
                      guest.comment
                    )}
                  </td>
                  <td>{guest.regTime}</td>
                  <td>{guest.updateTime || "-"}</td>
                </tr>
                {loggedInUser && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "right" }}>
                      {index === editingIndex ? (
                        <>
                          <CustomButton
                            className="btn btn-primary"
                            onClick={() => handleUpdateComment(guest.id)}
                          >
                            확인
                          </CustomButton>
                          <CustomButton
                            className="btn btn-danger ms-1"
                            onClick={() => handleCancelEdit()}
                          >
                            취소
                          </CustomButton>
                        </>
                      ) : (
                        <>
                          <CustomButton
                            className="btn btn-primary"
                            onClick={() => handleEdit(index, guest.comment)}
                          >
                            수정
                          </CustomButton>
                          <CustomButton
                            className="btn btn-danger ms-1"
                            onClick={() => handleDeleteComment(guest.id)}
                          >
                            삭제
                          </CustomButton>
                        </>
                      )}
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
