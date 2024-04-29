package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Member;
import com.example.demo.entity.RefreshToken;
import com.example.demo.repository.RefreshTokenRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
	private final RefreshTokenRepository refreshTokenRepository;

	public RefreshToken findByRefreshToken(String refreshToken) {
		return refreshTokenRepository.findByRefreshToken(refreshToken)
			.orElseThrow(() -> new IllegalArgumentException("잘못된 토큰"));
	}

	public RefreshToken findByMember(Member member) {
		return refreshTokenRepository.findByMember(member)
			.orElse(null);
	}

	public void saveRefreshToken(RefreshToken refreshToken) {
		refreshTokenRepository.save(refreshToken);
	}

	public void remove(Member member) {
		refreshTokenRepository.deleteByMember(member);
	}
}
