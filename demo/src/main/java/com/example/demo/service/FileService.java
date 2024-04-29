package com.example.demo.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service

public class FileService {

	@Value("${itemImgLocation}")
	private String imgLocation;

	public void saveFile(MultipartFile file) {
		try {
			Path directory = Paths.get(imgLocation);
			if(!Files.exists(directory)){
				Files.createDirectories(directory);
			}
		}
	}
}
