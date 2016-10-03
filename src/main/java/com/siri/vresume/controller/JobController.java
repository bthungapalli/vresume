/**
 * 
 */
package com.siri.vresume.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Job;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.JobService;
import com.siri.vresume.service.TemplateService;
import com.siri.vresume.service.UserService;

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
	private TemplateService templateService;
	
	@Autowired
	private UserService userService;
	
	private static final Logger logger = LoggerFactory.getLogger(JobController.class);
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/",method=RequestMethod.GET)
	public ResponseEntity<?> fetchJobs(HttpServletRequest request) {
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			return new ResponseEntity<List<Job>>(jobService.fetchJobs(securityUser.getId()), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/fetJobTemplate",method=RequestMethod.GET)
	public ResponseEntity<?> fetchJobTemplate(HttpServletRequest request) {
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();

		Map<String, Object> model = new HashMap<>();
		try {
			model.put("templates", templateService.fetchTemplates(securityUser.getId()));
			model.put("hiringMgr", jobService.getHiringMgr());
		} catch (VResumeDaoException vre) {
			logger.error("Proble occured:::", vre.getMessage());
			return new ResponseEntity<String>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(model, HttpStatus.OK);
	}
	
	@RequestMapping(value="/fetchJobs/{status}",method=RequestMethod.GET)
	public ResponseEntity<?> fetchJobsByStatus(@PathVariable("status") String status , HttpServletRequest request) {
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			return new ResponseEntity<List<Job>>(jobService.fetchJobsByStatus(status , securityUser.getId()), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
}
