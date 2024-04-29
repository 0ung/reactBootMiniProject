package com.example.demo.jwt;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final TokenProvider tokenProvider;
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String authorizationHeader = request.getHeader("Authorization");
		String token = getToken(authorizationHeader);

		if(tokenProvider.validateToken(token)){
			Authentication authentication
				= tokenProvider.getAuthentication(token);

			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request,response);
	}

	private String getToken(String header){
		if(header != null && header.startsWith("Bearer ")){
			return header.substring(7);
		}
		return null;
	}
}
