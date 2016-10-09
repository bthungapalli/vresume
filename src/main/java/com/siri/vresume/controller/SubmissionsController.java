/**
 * 
 */
package com.siri.vresume.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.siri.vresume.domain.Submission;
import com.siri.vresume.service.SubmsissionService;

/**
 * @author bthungapalli
 *
 */
@Controller
@RequestMapping("/submissions")
public class SubmissionsController {

	@Autowired
	private SubmsissionService submissionService;
	
	private final Logger logger = LoggerFactory.getLogger(SubmissionsController.class);
	
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<?> postSubmission(@ModelAttribute Submission submission,HttpServletRequest request){
		
		return null;
	}
	
}
