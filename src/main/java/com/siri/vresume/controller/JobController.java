/**
 * 
 */
package com.siri.vresume.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.domain.Job;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.JobService;
import com.siri.vresume.service.TemplateService;

/**
 * @author bthungapalli
 *
 */
@RestController
@RequestMapping("/job")
public class JobController {

	@Autowired
	private JobService jobService;

	@Autowired
	private UserController userController;
	
	@Autowired
	private TemplateService templateService;

	private static final Logger logger = Logger.getLogger(JobController.class);

	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobs(HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			List<Job> activeJobs = jobService.fetchJobsByStatus(VResumeConstants.ACTIVE_STATUS,securityUser);
			logger.debug("job is sucessfully fetched");
			
			return new ResponseEntity<List<Job>>(activeJobs, HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@RequestMapping(value = "/{jobId}/{userId}" , method=RequestMethod.GET)
	public ResponseEntity<?> fetchAppliedStatusForUser(@PathVariable("jobId") int jobId,@PathVariable("userId") int userId) {
		try {
			return new ResponseEntity<Boolean>(jobService.fetchAppliedStatusForUser(jobId,userId), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	
	/**
	 * 
	 * @param jobId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{jobId}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobByJobId(@PathVariable("jobId") int jobId, HttpServletRequest request) {
		try {
			return new ResponseEntity<Job>(jobService.fetchJobByJobId(jobId), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	/**
	 * 
	 * @param job
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@JsonIgnoreProperties
	public ResponseEntity<?> postJob(@RequestBody Job job, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			job.setCreatedById(securityUser.getId());
			jobService.postJob(job);
			logger.debug("job is sucessfully posted");
			return new ResponseEntity<List<Job>>(jobService.fetchJobs(securityUser.getId(),securityUser), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 
	 * @param job
	 * @param request
	 * @return
	 */
	@RequestMapping( method = RequestMethod.PUT)
	public ResponseEntity<?> updateJob(@RequestBody Job job, HttpServletRequest request) {
		try {
			jobService.updateJob(job);
			return new ResponseEntity<Job>(jobService.fetchJobByJobId(job.getId()), HttpStatus.OK);
		

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fetJobTemplate", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobTemplate(HttpServletRequest request) {
		SecurityUser securityUser = userController.fetchSessionObject();

		Map<String, Object> model = new HashMap<>();
		try {
			model.put("templates", templateService.fetchTemplates(securityUser.getId()));
			model.put("hiringMgr", jobService.getHiringMgr());
		} catch (VResumeDaoException vre) {
			logger.error("Proble occured:::"+vre.getMessage());
			return new ResponseEntity<String>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(model, HttpStatus.OK);
	}
	
	/**
	 * 
	 * @param status
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fetchJobs/{status}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobsByStatus(@PathVariable("status") String status, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			return new ResponseEntity<List<Job>>(jobService.fetchJobsByStatus(status, securityUser),
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 
	 * @param jobId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{jobId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteJob(@PathVariable("jobId") int jobId, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			jobService.delteJob(jobId);
			return new ResponseEntity<List<Job>>(jobService.fetchJobs(securityUser.getId(),securityUser), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
