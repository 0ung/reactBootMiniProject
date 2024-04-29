package com.example.demo.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.constant.Role;
import com.example.demo.dto.MemberFromDTO;
import com.example.demo.dto.MemberLoginDTO;
import com.example.demo.dto.TokenResponse;
import com.example.demo.entity.Member;
import com.example.demo.entity.RefreshToken;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final TokenProvider tokenProvider;
	private final RefreshTokenRepository refreshTokenRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final RefreshTokenService refreshTokenService;

	//가입 (C)
	public Member saveMember(MemberFromDTO member) {
		if (member == null) {
			throw new IllegalArgumentException("잘못된 입력");
		}
		return memberRepository.save(Member.builder()
			.id(member.getId())
			.password(passwordEncoder.encode(member.getPassword()))
			.email(member.getEmail())
			.role(Role.GUEST)
			.build());
	}

	//중복확인
	public boolean validateDuplicateMemberId(String memberId) {
		return memberRepository.existsById(memberId);
	}

	//로그인 (R)
	public TokenResponse login(MemberLoginDTO memberLoginDTO) {
		UsernamePasswordAuthenticationToken authenticationToken
			= new UsernamePasswordAuthenticationToken(memberLoginDTO.getId(), memberLoginDTO.getPassword());

		Authentication authentication = authenticationManagerBuilder.getObject()
			.authenticate(authenticationToken);

		Member member = memberRepository.findById(authentication.getName()).orElseThrow();

		String newRefreshToken = tokenProvider.createRefreshToken();
		String accessToken = tokenProvider.createToken(member);

		RefreshToken existRefreshToken = refreshTokenRepository.findByMember(member).orElse(null);

		if (existRefreshToken == null) {
			refreshTokenService.saveRefreshToken(new RefreshToken(member, newRefreshToken));
		} else {
			existRefreshToken.update(newRefreshToken);
		}
		return new TokenResponse(accessToken, newRefreshToken);
	}

	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		return memberRepository.findById(id).orElseThrow();
	}

	public TokenResponse tokenRefresh(String refreshToken) {
		if (!tokenProvider.validateToken(refreshToken)) {
			throw new IllegalArgumentException("잘못된 토큰");
		}
		RefreshToken existRefreshToken =
			refreshTokenService.findByRefreshToken(refreshToken);

		Member member = existRefreshToken.getMember();

		String accessToken = tokenProvider.createToken(member);
		String newRefreshToken = existRefreshToken.update(tokenProvider.createRefreshToken())
			.getRefreshToken();
		return new TokenResponse(accessToken, newRefreshToken);
	}
	@Transactional
	public void logout(RefreshToken refreshToken){
		 Member member = refreshTokenService.findByRefreshToken(refreshToken.getRefreshToken()).getMember();
		refreshTokenService.remove(member);
	}
	//탈퇴 (D)

	//업데이트 (U)
}
