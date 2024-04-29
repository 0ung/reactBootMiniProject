package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.GuestBookDTO;
import com.example.demo.dto.GuestBookFromDTO;
import com.example.demo.dto.GuestBookUpdateDTO;
import com.example.demo.entity.GuestBook;
import com.example.demo.entity.Member;
import com.example.demo.repository.GuestBookRepository;
import com.example.demo.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestBookService {
	private final GuestBookRepository guestBookRepository;
	private final MemberRepository memberRepository;

	public void saveGuestBook(GuestBookFromDTO guestBookFromDTO, String memberId) {
		Member member = memberRepository.findById(memberId).orElse(null);
		guestBookRepository.save(GuestBook.builder()
			.comment(guestBookFromDTO.getComment())
			.member(member).build());
	}

	@Transactional
	public List<GuestBookDTO> readAll(Pageable pageable) {
		List<GuestBookDTO> list = new ArrayList<>();
		Page<GuestBook> page = guestBookRepository.findAll(pageable);
		page.forEach(e -> list.add(GuestBookDTO.mapToGuest(e)));

		return list;
	}

	@Transactional(readOnly = true)
	public int getTotalCount() {
		return (int)guestBookRepository.count();
	}

	@Transactional
	public void updateComment(GuestBookUpdateDTO updateDTO) {
		GuestBook newGuestBook = GuestBook.builder().id(updateDTO.getId())
			.comment(updateDTO.getComment()).build();
		GuestBook guestBook = guestBookRepository.findById(newGuestBook.getId()).orElse(null);
		if (guestBook != null) {
			guestBook.update(newGuestBook);
			guestBookRepository.save(guestBook);
		} else {
			throw new EntityNotFoundException("정보 없음.");
		}
	}

	@Transactional
	public void deleteGuestBook(Long id){
		guestBookRepository.deleteById(id);
	}
}
