package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.GuestBookFromDTO;
import com.example.demo.entity.GuestBook;
import com.example.demo.entity.Member;
import com.example.demo.repository.GuestBookRepository;
import com.example.demo.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GuestBookService {
	private final GuestBookRepository guestBookRepository;
	private final MemberRepository memberRepository;
	public void saveGuestBook(GuestBookFromDTO guestBookFromDTO,String memberId){
		Member member = memberRepository.findById(memberId).orElse(null);
		guestBookRepository.save(GuestBook.builder()
			.comment(guestBookFromDTO.getComment())
			.member(member).build());
	}
}
