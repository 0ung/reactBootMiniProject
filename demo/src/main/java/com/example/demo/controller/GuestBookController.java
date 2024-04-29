package com.example.demo.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GuestBookFromDTO;
import com.example.demo.service.GuestBookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class GuestBookController {
	private final GuestBookService guestBookService;

	public ResponseEntity<?> saveGuestBook(GuestBookFromDTO guestBookFromDTO, Principal principal
	) {
		try {
			guestBookService.saveGuestBook(guestBookFromDTO, principal.getName());
			return ResponseEntity.ok().body("방명록이 작성되었습니다.");
		} catch (Exception e){
			return ResponseEntity.badRequest().body("방명록 등록에 실패했습니다.");
		}
	}
}
