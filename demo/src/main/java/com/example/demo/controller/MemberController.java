package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.MemberFromDTO;
import com.example.demo.dto.MemberLoginDTO;
import com.example.demo.entity.RefreshToken;
import com.example.demo.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody MemberFromDTO memberFromDTO) {

		try {
			memberService.saveMember(memberFromDTO);
		} catch (Exception e) {
			return new ResponseEntity<>("잘못된 입력", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("회원가입 완료", HttpStatus.CREATED);
	}

	@PostMapping("/username/exists")
	public ResponseEntity<?> exists(@RequestBody Map<String, String> requestBody) {
		String memberId = requestBody.get("memberId");
		if (
			memberService.validateDuplicateMemberId(memberId)) {
			return new ResponseEntity<>("중복된 회원입니다.", HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>("회원가입 가능한 아이디입니다.", HttpStatus.OK);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberLoginDTO memberLoginDTO) {
		try {
			return new ResponseEntity<>(memberService.login(memberLoginDTO), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("입력정보를 확인해주세요", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@RequestParam("refreshToken") String refreshToken) {
		try {
			return new ResponseEntity<>(memberService.tokenRefresh(refreshToken), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("잘못된 요청", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody RefreshToken refreshToken){
		try{
			memberService.logout(refreshToken);
			return ResponseEntity.ok("로그아웃 되었습니다.");
		} catch(Exception e){
			return ResponseEntity.badRequest().body("잘못된 요청");
		}
	}

}
