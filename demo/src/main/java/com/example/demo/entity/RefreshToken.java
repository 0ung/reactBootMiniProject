package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Table(name = "refresh_token")
public class RefreshToken extends BaseTimeEntity{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RefreshToken_id", updatable = false)
	private Long id;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",nullable = false,unique = true)
	private Member member;

	@Column(name="Refresh_Token",nullable = false)
	private String refreshToken;

	public RefreshToken(Member member,String refreshToken){
		this.member = member;
		this.refreshToken = refreshToken;
	}

	public RefreshToken update(String refreshToken){
		this.refreshToken = refreshToken;
		return this;
	}
}
