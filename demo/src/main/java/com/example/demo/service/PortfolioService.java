package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.repository.PortfolioImgRepository;
import com.example.demo.repository.PortfolioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PortfolioService {

	private final PortfolioRepository portfolioRepository;
	private final PortfolioImgRepository portfolioImgRepository;

	public void savePortfolio(){
		
	};

}
