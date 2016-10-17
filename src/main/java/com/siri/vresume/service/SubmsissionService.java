/**
 * 
 */
package com.siri.vresume.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UsersSubmission;
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
	
	@Autowired
	private UserDao userDao;

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

	public  UsersSubmission fetchSubmission(int jobId) throws VResumeDaoException, IOException {
		List<Integer> userIds = submissionDao.fetchUsersForJob(jobId);
		UsersSubmission usersSubmission = new UsersSubmission();
		List<User> users = userDao.fetchUserByIds(userIds);
		usersSubmission.setUsers(users);
		usersSubmission.setSubmmision(fetchSubmissionForUser(userIds.get(0),jobId));
		
		return usersSubmission;
	}

	public Submission fetchSubmissionForUser(Integer userId,int jobId) throws VResumeDaoException, IOException {
		Submission submission = submissionDao.fetchSubmissionForUserJob(userId,jobId);
		submission.setAvailablities(submissionDao.fetchAvailabilities(submission.getId()));
		submission.setSections(updateVideoBytes(submissionDao.fetchSections(submission.getId())));
		return submission;
		
		
	}

	private List<Sections> updateVideoBytes(List<Sections> sections) throws IOException {
		for(Sections section : sections){
			section.setVideoBytes(vresumeUtils.fetchBytes(section.getVideoPath()));
		}
		return sections;
		
	}

	public Integer fetchSubmissionCount(int jobId)  throws VResumeDaoException{
		return submissionDao.fetchSubmissionCount(jobId);
	}

}
