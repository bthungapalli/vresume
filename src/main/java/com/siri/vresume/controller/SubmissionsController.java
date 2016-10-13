/**
 * 
 */
package com.siri.vresume.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.SubmsissionService;
import com.siri.vresume.utils.VresumeUtils;

/**
 * @author bthungapalli
 *
 */
@Controller
@RequestMapping("/submissions")
public class SubmissionsController {

	@Autowired
	private SubmsissionService submissionService;

	@Autowired
	private VresumeUtils vresumeUtils;

	private final Logger log = LoggerFactory.getLogger(SubmissionsController.class);

	@Value("${submission.path}")
	private String submissionsPath;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> postSubmission(@RequestBody Submission submission) {
		try {
			SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			submission.setUserId(user.getId());
			submissionService.postSubmisson(submission);
			return new ResponseEntity<>(HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@RequestMapping(value = "/filedownload", method = RequestMethod.GET)
	public HttpStatus download(@RequestParam("fileIs") String fileIs, HttpServletRequest request,
			HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		HttpStatus returnStatus = null;
		if (session != null) {
			try {
				log.debug("<<<<<<<<<<<< filedownload >>>>>>>>>>>>> >>> " + fileIs);
				File file = new File(fileIs);
				InputStream is = new FileInputStream(file);

				// MIME type of the file
				response.setContentType("application/octet-stream");
				// Response header
				response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
				// Read from the file and write into the response
				OutputStream os = response.getOutputStream();
				byte[] buffer = new byte[4096];
				int len;
				while ((len = is.read(buffer)) != -1) {
					os.write(buffer, 0, len);
				}
				log.debug("<<<<<<<<<<<< filedownload flushed >>>>>>>>>>>>> >>> " + fileIs);
				os.flush();
				os.close();
				is.close();
				returnStatus = HttpStatus.OK;
			} catch (IOException e) {
				log.debug("<<<<<<<<<<<< IO Exception in File download >>>>>>>>>>>>> >>> " + e.getMessage());
			} catch (Exception e) {
				log.debug("<<<<<<<<<<<< Exception in File download >>>>>>>>>>>>> >>> " + e.getMessage());
			}
		} else {
			returnStatus = HttpStatus.UNAUTHORIZED;
		}
		return returnStatus;
	}
}
