/**
 * 
 */
package com.siri.vresume.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

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
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.UsersSubmission;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.SubmsissionService;
import com.siri.vresume.utils.AvailabilityEditor;

/**
 * @author bthungapalli
 *
 */
@Controller
@RequestMapping("/submissions")
public class SubmissionsController {

	@Autowired
	private SubmsissionService submissionService;

	private final Logger log = LoggerFactory.getLogger(SubmissionsController.class);

	@Value("${submission.path}")
	private String submissionsPath;

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> postSubmission(Submission submission, @RequestParam("resume") MultipartFile resume) {
		try {
			SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			submission.setUserId(user.getId());
			submission.setResume(resume);
			Submission postedSubmission = submissionService.postSubmisson(submission);
			return new ResponseEntity<Integer>(postedSubmission.getId(),HttpStatus.OK);
		} catch (Exception vre) {
			return new ResponseEntity<String>("Error Occured "+vre.getMessage(),HttpStatus.OK);
		}
	}

	@RequestMapping(value= "/sections",method=RequestMethod.POST)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> postSection( Sections section , @RequestParam("videoFile") MultipartFile videoFile) {
		int submissionId= Integer.parseInt(section.getSubmissionId());
		try {
			SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			section.setVideoFile(videoFile);
			submissionService.saveSections(section, submissionId,user.getId());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception ex) {
			log.error("Error Occured:::",ex.getMessage());
			submissionService.deleteSubmissions(submissionId);
			return new ResponseEntity<String>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
	
	
	@RequestMapping("/job/{id}")
	@ResponseBody
	public ResponseEntity<?>fetchSubmissions(@PathVariable("id") int jobId,@RequestParam(required=false,value="status") String status){
		
		try{
			return new ResponseEntity<UsersSubmission>(submissionService.fetchSubmission(jobId,status), HttpStatus.OK);
		}catch(VResumeDaoException | IOException vre){
			log.error("Problem occured while fetching submmision",vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@RequestMapping("/job/{id}/user/{userId}")
	@ResponseBody
	public ResponseEntity<?>fetchSubmissionsForUser(@PathVariable("id") int jobId ,@PathVariable("userId") int userId,@RequestParam(required=false , value="status") String status ){
		
		try{
			Submission submission = submissionService.fetchSubmissionForUser(userId, jobId,status);
			if(submission!= null)
			return new ResponseEntity<Submission>(submission, HttpStatus.OK);
			return new ResponseEntity<String>("No submission for the status", HttpStatus.OK);
		}catch(VResumeDaoException | IOException vre){
			log.error("Problem occured while fetching submmision",vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping("/count/{id}")
	@ResponseBody
	public ResponseEntity<?>fetchCountofSubmissions(@PathVariable("id") int jobId ){
		
		try{
			return new ResponseEntity<Integer>(submissionService.fetchSubmissionCount(jobId), HttpStatus.OK);
		}catch(VResumeDaoException vre){
			log.error("Problem occured while fetching count",vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@RequestMapping(value="/updateStatus",method=RequestMethod.PUT)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?>updateStatus(@RequestBody Submission submission){
		try{
			submissionService.updateStatusForSubmission(submission);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(VResumeDaoException vre){
			log.error("Problem occured while fetching count",vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	@RequestMapping(value="/user/{userId}",method=RequestMethod.GET)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?>fetchSubmissionsForUser(@PathVariable("userId") int userId){
		try{
			return new ResponseEntity<List<Submission>>(submissionService.fetchSubmissionsForUser(userId),HttpStatus.OK);
		}catch(VResumeDaoException vre){
			log.error("Problem occured while fetching users Data",vre.getMessage());
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
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(List.class, new AvailabilityEditor());
	}
	

}
