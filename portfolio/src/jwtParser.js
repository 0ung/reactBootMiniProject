export default function jwtParser(accessToken) {
  if (accessToken == null) {
    return;
  }
  // accessToken의 페이로드 부분 추출
  let payloadBase64 = accessToken.split(".")[1];

  // Base64 디코딩 후 JSON으로 파싱하여 페이로드 얻기
  let payloadJson = JSON.parse(atob(payloadBase64));

  // 페이로드에서 원하는 데이터 얻기 (예: auth 필드)
  let user = payloadJson.sub;
  return user;
}
