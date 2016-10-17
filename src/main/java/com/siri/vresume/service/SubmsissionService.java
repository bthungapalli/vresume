/**
 * 
 */
package com.siri.vresume.service;

import java.io.File;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	private SubmissionDao submissionDao;

	private final Logger logger = LoggerFactory.getLogger(SubmsissionService.class);
	
	public Submission postSubmisson(Submission submission) throws VResumeDaoException {
		int submissionId = (int) (Math.random() * 9000) + 1000;
		String savePath = submissionsPath + submission.getUserId() + File.separatorChar;
		submission.setId(submissionId);
		// saveSections(submission.getSections(), submissionId, savePath);
		saveAvailability(submission.getAvailablities(), submissionId);
		savePath = vresumeUtils.saveFile(submission.getResume(), submissionId, savePath);
		submission.setResumePath(savePath);
		submissionDao.saveSubmission(submission);
		return submission;
	}

	private void saveAvailability(List<Availability> availablities, int submissionId) throws VResumeDaoException {
		for(Availability avail : availablities){
			avail.setSubmissionId(submissionId);
		}
		submissionDao.insertAvailabilities(availablities);

	}

	public void saveSections(Sections sections, int submissionId, int userId) throws VResumeDaoException {
		String savePath = submissionsPath + userId + File.separatorChar;
			savePath = vresumeUtils.saveFile(sections.getVideoFile(), submissionId, savePath);
			sections.setVideoPath(savePath);
		submissionDao.insertSection(sections, submissionId);
	}

	public void deleteSubmissions(int submissionId) {
		try{
		submissionDao.deleteAvailabilities(submissionId);
		submissionDao.deleteSections(submissionId);
		submissionDao.deleteSubmission(submissionId);
		}catch(VResumeDaoException vre){
			logger.error("Problem occured while Deleting the Submission", vre.getMessage());
		}
	}

}
