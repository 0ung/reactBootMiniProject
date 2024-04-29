package com.example.demo.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.example.demo.entity.GuestBook;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestBookDTO {
	private Long id;
	private String memberId;
	private String comment;
	private String  regTime;
	private String  updateTime;

	public static GuestBookDTO mapToGuest(GuestBook guestBook) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String formattedRegTime = guestBook.getRegTime().format(formatter);
		String formattedUpdateTime = guestBook.getUpdateTime().format(formatter);

		return GuestBookDTO.builder()
			.id(guestBook.getId())
			.comment(guestBook.getComment())
			.memberId(guestBook.getMember().getId())
			.regTime(formattedRegTime)
			.updateTime(formattedUpdateTime)
			.build();
	}
}
