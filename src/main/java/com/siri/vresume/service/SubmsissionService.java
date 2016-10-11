/**
 * 
 */
package com.siri.vresume.service;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.utils.VresumeUtils;

/**
 * @author bthungapalli
 *
 */
@Service
public class SubmsissionService {

	@Value("${submission.path}")
	private String submissionsPath;

	@Autowired
	private VresumeUtils vresumeUtils;

	@Autowired
	private SubmissionDao vresumeDao;

	public void postSubmisson(Submission submission) throws VResumeDaoException {
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		int submissionId = (int) (Math.random() * 9000) + 1000;
		String savePath = submissionsPath + File.pathSeparator + securityUser.getId();
		submission.setId(submissionId);
		saveSections(submission.getSections(), submissionId, savePath);
		saveAvailability(submission.getAvailablities(), submissionId);
		vresumeUtils.saveFile(submission.getResume(), submissionId, savePath);
		vresumeDao.saveSubmission(submission);
	}

	private void saveAvailability(List<Availability> availablities, int submissionId) throws VResumeDaoException {
		vresumeDao.insertAvailabilities(availablities, submissionId);

	}

	private void saveSections(List<Sections> sections, int submissionId, String savePath) throws VResumeDaoException {
		for (Sections section : sections) {
			vresumeUtils.saveFile(section.getVideoFile(), submissionId, savePath);
		}
		// Save if all the videos are saved successfully
		vresumeDao.insertSection(sections, submissionId);
	}

	
}
