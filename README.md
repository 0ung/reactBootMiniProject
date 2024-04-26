### 기능 정의서

#### 포트폴리오
1. 생성
2. 수정
3. 삭제
4. 조회

#### 유저
1. 생성
2. 수정
3. 삭제
4. 조회

#### 방명록
1. 생성
2. 수정
3. 삭제
4. 조회 (pagination: 10)

### 화면 설계
1. 메인 페이지
2. 포트폴리오 조회 (페이지)
3. 포트폴리오 작성
4. 포트폴리오 수정 / 삭제
5. 포트폴리오 상세 조회
6. 회원가입
7. 로그인
8. 개인 정보 조회 / 수정 / 탈퇴
9. 방명록 조회
10. 방명록 상세 조회
11. 방명록 생성
12. 방명록 수정 / 삭제

### DB 설계서

#### 테이블 
1. 포트폴리오
   - title
   - user_id (fk, 참조: 유저)
   - name
   - email
   - phone number
   - protifoloImg
   - description
   - techStack (직접 입력 또는 기존의 입력 값 대입)
   - projectIntroduction
   - main (boolean)
   - createdAt
   - updatedAt

2. 유저
   - ID (pk)
   - password
   - email
   - role
   - createAt
   - updateAt

3. 방명록
   - id (pk)
   - comment
   - user_id (fk, 참조: 유저)
   - createAt
   - updateAt


-----------
![포트폴리오](https://github.com/0ung/reactBootMiniProject/assets/101184247/90bc580a-ccf1-48d6-960f-f000d4b1ad9a)
