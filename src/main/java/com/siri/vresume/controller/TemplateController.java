/**
 * 
 */
package com.siri.vresume.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Templates;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.TemplateService;

/**
 * @author bthungapalli
 *
 */
@RestController
@RequestMapping("/templates")
public class TemplateController {
	
	@Autowired
	private TemplateService templateService;
	
	private static final Logger logger = LoggerFactory.getLogger(TemplateController.class);
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<?> fetchTemplates(HttpServletRequest request) {
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			return new ResponseEntity<List<Templates>>(templateService.fetchTemplates(securityUser.getId()),
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> insertTemplate(@RequestBody Templates template , HttpServletRequest request) {
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			template.setUserId(securityUser.getId());
			templateService.insertTemplate(template);
			return new ResponseEntity<List<Templates>>(templateService.fetchTemplates(securityUser.getId()),
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(method=RequestMethod.PUT)
	@ResponseBody
	public ResponseEntity<Templates> updateTemplate(@RequestBody Templates template , HttpServletRequest request) {
		try {
			templateService.updateTemplate(template);
			return new ResponseEntity<Templates>(template,
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<?> deleteTemplate(@PathVariable("id") int templateId , HttpServletRequest request) {
		try {
			SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			
			templateService.deleteTemplate(templateId,securityUser.getId());
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("alreadyExist")), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: ", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
