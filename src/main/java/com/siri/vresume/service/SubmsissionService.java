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

	public Submission postSubmisson(Submission submission) throws VResumeDaoException {
		int submissionId = (int) (Math.random() * 9000) + 1000;
		String savePath = submissionsPath + submission.getUserId() + File.separatorChar;
		submission.setId(submissionId);
		// saveSections(submission.getSections(), submissionId, savePath);
		saveAvailability(submission.getAvailablities(), submissionId);
		savePath = vresumeUtils.saveFile(submission.getResume(), submissionId, savePath);
		submission.setResumePath(savePath);
		vresumeDao.saveSubmission(submission);
		return submission;
	}

	private void saveAvailability(List<Availability> availablities, int submissionId) throws VResumeDaoException {
		for(Availability avail : availablities){
			avail.setSubmissionId(submissionId);
		}
		vresumeDao.insertAvailabilities(availablities);

	}

	private void saveSections(List<Sections> sections, int submissionId, String savePath) throws VResumeDaoException {
		for (Sections section : sections) {
			vresumeUtils.saveFile(section.getVideoFile(), submissionId, savePath);
		}
		// Save if all the videos are saved successfully
		vresumeDao.insertSection(sections, submissionId);
	}

}
