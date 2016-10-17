package com.siri.vresume.utils;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.siri.vresume.exception.VResumeDaoException;

@Component
public class VresumeUtils {
	
	private static final Logger log = LoggerFactory
			.getLogger(VresumeUtils.class);
	
	public static boolean validateVideoFormat(String fileExtension) {
		String str[] = new String[] {"webm", "ogg", "ogv" };
		List<String> list = Arrays.asList(str);
		return list.contains(fileExtension);
	}

	public static boolean validateImageFormat(String fileExtension) {
		String str[] = new String[] {"jpeg", "jpg", "png" };
		List<String> list = Arrays.asList(str);
		return list.contains(fileExtension);
	}
	/**
	 * converts video format to format(specified in application properties
	 * @param videoPath
	 * @param fileNameIn
	 * @param fileNameOut
	 * @throws InterruptedException 
	 * @throws IOException 
	 */
/*	public static void convertVideoFormat(final String videoPath,
			final String fileNameIn, final String fileNameOut,
			boolean isVideoConversionEnabled, String videoConversionToolPath, boolean isNotWinX) throws IOException,
			InterruptedException {

		boolean isEnabled = new Boolean(isVideoConversionEnabled);
		if (isEnabled) { 
				log.debug("conversion of video file "+ fileNameIn + " started.");
				Long startTime = System.currentTimeMillis();
				VideoConverter flvConverter = new VideoConverter(videoConversionToolPath,isNotWinX);
				flvConverter.convert(videoPath + fileNameIn, videoPath + fileNameOut, 235, 135);
				Long endTime = System.currentTimeMillis();
				log.debug("Video conversion time : "+(endTime - startTime)/1000L);
		}
	}*/
	
	
	public String getVideoFileExtension(MultipartFile file) {
		String fileExtension = "";
		if (file != null) {
			if (!file.isEmpty() && file.getContentType().contains("/")) {
				String[] array = file.getContentType().split("/");
				fileExtension = array[1];
			}
		}
		return fileExtension;
	}

	public String saveFile(MultipartFile attachment, int submissionId, String path) throws VResumeDaoException {
		File fileDirectory = new File(path);
		if (!fileDirectory.exists()) {
			fileDirectory.mkdirs();
		}
		path = fileDirectory + File.separator + submissionId + "-" + attachment.getOriginalFilename();
		File file = new File(path);
		try {

			FileCopyUtils.copy(attachment.getBytes(), file);
		} catch (IllegalStateException | IOException e) {
			throw new VResumeDaoException(e.getMessage());
		}
		return path;
	}
	
	
	public byte[] fetchBytes(String path) throws IOException{
		
		File file = new File(path);
		return FileUtils.readFileToByteArray(file);
	}
	
}
