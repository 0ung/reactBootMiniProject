package com.example.demo.jwt;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Member;
import com.example.demo.exception.NoAuthorityException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class TokenProvider {

	private static final String AUTHORITIES_KEY = "auth";
	private final JwtProperties jwtProperties;

	public String createToken(Member member) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + 1800000);
		String authorities = member.getRole().toString();

		log.info(member.getId()+"토큰이 생성되었습니다.");
		return Jwts
			.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setIssuer(jwtProperties.getIssuer())
			.setIssuedAt(now)
			.setExpiration(expiry)
			.setSubject(member.getId())
			.claim(AUTHORITIES_KEY, authorities)
			.signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
			.compact();
	}

	public String createRefreshToken() {
		Date now = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(now);
		calendar.add(Calendar.DAY_OF_MONTH, 7);

		Date expiry = calendar.getTime();

		log.info("리프레쉬 토큰이 생성되었습니다.");
		return Jwts.builder()
			.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
			.setIssuer(jwtProperties.getIssuer())
			.setIssuedAt(now)
			.setExpiration(expiry)
			.signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
			.compact();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser()
				.setSigningKey(jwtProperties.getSecretKey())
				.parseClaimsJws(token);
		} catch (Exception e) {
			log.info("유효하지 않은 JWT 토큰입니다.");
			return false;
		}
		return true;
	}

	public Claims getClaims(String token) {
		return Jwts.parser()
			.setSigningKey(jwtProperties.getSecretKey())
			.parseClaimsJws(token)
			.getBody();
	}

	public Authentication getAuthentication(String token) {
		Claims claims = getClaims(token);
		if (claims.get(AUTHORITIES_KEY) == null) {
			throw new NoAuthorityException("권한이 없습니다");
		}

		String email = claims.getSubject();
		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.toList();
		return new UsernamePasswordAuthenticationToken(
			new User(email, "", authorities), token, authorities);
	}
}
