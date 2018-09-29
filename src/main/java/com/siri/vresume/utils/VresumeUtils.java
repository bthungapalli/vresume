package com.siri.vresume.utils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.exception.VResumeDaoException;

@Component
public class VresumeUtils {
	
	public static final String TOKEN_KEY = "USERID-";
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

	public String saveFile(MultipartFile attachment, String sources, String path) throws VResumeDaoException {
		File fileDirectory = new File(path);
		if (!fileDirectory.exists()) {
			fileDirectory.mkdirs();
		}
		String fileName = sources + "-" + attachment.getOriginalFilename();
		path = fileDirectory + File.separator +fileName;
		File file = new File(path);
		try {

			FileCopyUtils.copy(attachment.getBytes(), file);
		} catch (IllegalStateException | IOException e) {
			throw new VResumeDaoException(e.getMessage());
		}
		return fileName;
	}
	
	
	public byte[] fetchBytes(String path) throws IOException{
		
		File file = new File(path);
		return FileUtils.readFileToByteArray(file);
	}
	
	public static String fetchFirstLastName(String firstName,String lastName){
		return  firstName+" "+ lastName;
	}
	
	
	public static String buildCMDescription(UserDetails cmUser, SecurityUser hmUser, Submission submission, Job job,
			UserDetails candidate) {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("Hello ")
				.append(VresumeUtils.fetchFirstLastName(cmUser.getFirstName(), cmUser.getLastName())).append(" , ")
				.append(hmUser.getFirstName()).append(" has invited the ").append(candidate.getFirstName())
				.append(" for ").append(submission.getInterviewMode())
				.append(" - " + job.getTitle() + " & " + job.getLocation());
		return stringBuilder.toString();
	}

	// Hello XXXX, Your interview has been scheduled by HM Name for Job Title,
	// Location with Client Name --- Date & Other details. Please accept the
	// invite to notify HM on your availability.
	public static String buildCandidateDescription(SecurityUser hmUser, Submission submission, Job job,
			UserDetails candidate) {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("Hello ")
				.append(VresumeUtils.fetchFirstLastName(candidate.getFirstName(), candidate.getLastName()))
				.append(" , ").append(" Your "+submission.getInterviewMode() + " interview has been scheduled by ").append(hmUser.getFirstName())
				.append(" for ")
				.append(" - " + job.getTitle() + " & " + job.getLocation()).append(". Please accept the invite to notify HM on your availability.");
		return stringBuilder.toString();
	}

	public static String buildSubject(Submission submission, Job job, UserDetails userDetails) {
		StringBuilder stringBuffer = new StringBuilder();
		stringBuffer.append("New Interview Scheduled: ").append(submission.getInterviewMode()).append(" - ").append(job.getTitle()).append(" & ").append(job.getLocation()).append(" - ")
				.append(VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()))
				.append(" - ").append(userDetails.getContactNo());
		return stringBuffer.toString();
	}

	public static String base64Encode(int id) {
		byte[] encodedBytes = Base64.encode((TOKEN_KEY+id).getBytes());
	    return new String(encodedBytes, Charset.forName("UTF-8"));
	}
	
	public static String base64Decode(String token) {
		byte[] decodedBytes = Base64.decode(token.getBytes());
	    return new String(decodedBytes, Charset.forName("UTF-8"));
	}
	
	
}
