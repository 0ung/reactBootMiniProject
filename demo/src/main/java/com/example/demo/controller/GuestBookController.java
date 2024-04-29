package com.example.demo.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.GuestBookDTO;
import com.example.demo.dto.GuestBookFromDTO;
import com.example.demo.dto.GuestBookUpdateDTO;
import com.example.demo.entity.GuestBook;
import com.example.demo.service.GuestBookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/guestbook")
public class GuestBookController {
	private final GuestBookService guestBookService;

	@PostMapping("/save")
	public ResponseEntity<?> saveGuestBook(@RequestBody GuestBookFromDTO guestBookFromDTO, Principal principal
	) {
		try {
			guestBookService.saveGuestBook(guestBookFromDTO, principal.getName());
			return ResponseEntity.ok().body("방명록이 작성되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("방명록 등록에 실패했습니다.");
		}
	}

	@GetMapping("/{page}")
	public ResponseEntity<List<GuestBookDTO>> readAll(@PathVariable Optional<Integer> page, Principal principal) {
		Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 10);

		List<GuestBookDTO> guestBooks = guestBookService.readAll(pageable);

		return ResponseEntity.ok(guestBooks);

	}

	@GetMapping("/total")
	public ResponseEntity<Integer> total() {
		int totalCount = guestBookService.getTotalCount();
		return ResponseEntity.ok(totalCount);
	}

	@PatchMapping("/update")
	public ResponseEntity<?> update(@RequestBody GuestBookUpdateDTO updateDTO){
		guestBookService.updateComment(updateDTO);
		return ResponseEntity.ok("업데이트 완료");
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		guestBookService.deleteGuestBook(id);
		return ResponseEntity.ok(id + " 삭제완료");
	}
}
