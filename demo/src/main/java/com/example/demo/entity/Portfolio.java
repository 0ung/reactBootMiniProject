package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio extends BaseTimeEntity {
	@Id
	@Column(name = "portfolio_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String name;

	private String email;

	private String phoneNumber;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "img_id")
	private PortfolioImg portfolioImg;

	private String techStack;

	private String projectDetail;

	private boolean main;

}
