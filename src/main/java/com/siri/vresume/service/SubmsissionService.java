/**
 * 
 */
package com.siri.vresume.service;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
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
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.SubmissionComments;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UsersSubmission;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.utils.SubmissionStatusEnum;
import com.siri.vresume.utils.VresumeUtils;

/**
 * @author bthungapalli
 *
 */
@Service
public class SubmsissionService {

	@Value("${submission.path}")
	private String submissionsPath;

	@Value("${submission.video.url}")
	private String videosUrl;

	@Autowired
	private VresumeUtils vresumeUtils;

	@Autowired
	private SubmissionDao submissionDao;

	@Autowired
	private UserDao userDao;

	private final Logger logger = LoggerFactory.getLogger(SubmsissionService.class);

	public Submission postSubmisson(Submission submission) throws VResumeDaoException {
		int submissionId = (int) (Math.random() * 9000) + 1000;
		String savePath = submissionsPath + submission.getUserId();
		submission.setId(submissionId);
		// saveSections(submission.getSections(), submissionId, savePath);
		saveAvailability(submission.getAvailablities(), submissionId);
		savePath = vresumeUtils.saveFile(submission.getResume(), String.valueOf(submissionId), savePath);
		submission.setResumePath(savePath);
		submission.setStatus(SubmissionStatusEnum.NEW.toString());
		submissionDao.saveSubmission(submission);
		return submission;
	}

	private void saveAvailability(List<Availability> availablities, int submissionId) throws VResumeDaoException {
		for (Availability avail : availablities) {
			avail.setSubmissionId(submissionId);
		}
		submissionDao.insertAvailabilities(availablities);

	}

	public void saveSections(Sections sections, int submissionId, int userId) throws VResumeDaoException {
		String savePath = submissionsPath + userId;
		String sources = submissionId + "-" + sections.getSectionName();
		savePath = vresumeUtils.saveFile(sections.getVideoFile(), sources, savePath);
		sections.setVideoPath(savePath);
		submissionDao.insertSection(sections);
	}

	public void deleteSubmissions(int submissionId) {
		try {
			submissionDao.deleteAvailabilities(submissionId);
			submissionDao.deleteSections(submissionId);
			submissionDao.deleteSubmission(submissionId);
		} catch (VResumeDaoException vre) {
			logger.error("Problem occured while Deleting the Submission", vre.getMessage());
		}
	}

	public UsersSubmission fetchSubmission(int jobId) throws VResumeDaoException, IOException {
		List<Integer> userIds = submissionDao.fetchUsersForJob(jobId);
		UsersSubmission usersSubmission = new UsersSubmission();
		List<UserDetails> users = userDao.fetchUserByIds(userIds);
		usersSubmission.setUsers(users);
		usersSubmission
				.setSubmmision(fetchSubmissionForUser(userIds.get(0), jobId, SubmissionStatusEnum.NEW.toString()));
		usersSubmission.setStatusCounts(fetchStatusCount(jobId));
		return usersSubmission;
	}

	private List<StatusCounts> fetchStatusCount(int jobId) throws VResumeDaoException {
		List<StatusCounts> statusCount = submissionDao.fetchStatusCountsForJobId(jobId);
		return statusCount;
	}

	public Submission fetchSubmissionForUser(Integer userId, int jobId, String status)
			throws VResumeDaoException, IOException {
		Submission submission = submissionDao.fetchSubmissionForUserJob(userId, jobId, status);
		submission.setAvailablities(submissionDao.fetchAvailabilities(submission.getId()));
		submission.setSections(updateVideoPath(submissionDao.fetchSections(submission.getId()), userId));
		return submission;

	}

	private List<Sections> updateVideoPath(List<Sections> sections, int userId) throws IOException {
		String videosPath = videosUrl + userId + File.separatorChar;
		for (Sections section : sections) {
			section.setVideoPath(videosPath + section.getVideoPath());
		}
		return sections;

	}

	public Integer fetchSubmissionCount(int jobId) throws VResumeDaoException {
		return submissionDao.fetchSubmissionCount(jobId);
	}

	public void updateStatusForSubmission(SubmissionComments submissionComments) throws VResumeDaoException {
		if (submissionComments.getStatus().equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())) {
			submissionDao.updateComments(submissionComments);
		}

		if (submissionComments.getStatus().equalsIgnoreCase(SubmissionStatusEnum.HIRED.toString())) {
			Timestamp hiringDate = new Timestamp(System.currentTimeMillis());
			submissionDao.updateStatus(submissionComments.getSubmissionId(), submissionComments.getStatus(),
					hiringDate);
		} else {
			submissionDao.updateStatus(submissionComments.getSubmissionId(), submissionComments.getStatus(), null);
		}
	}

}
