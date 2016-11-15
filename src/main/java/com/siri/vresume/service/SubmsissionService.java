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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.Comment;
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

	private static final int HIRING_MGR_ROLE = 2;

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

	public UsersSubmission fetchSubmission(int jobId, String status) throws VResumeDaoException, IOException {
		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int userRole = user.getRole();
		status = statusChangeFromNToSForHM(status, userRole);
		List<Integer> userIds = submissionDao.fetchUsersForJob(jobId, status);
		UsersSubmission usersSubmission = new UsersSubmission();
		if (userIds != null && userIds.size() > 0) {
			List<UserDetails> users = userDao.fetchUserByIds(userIds);
			usersSubmission.setUsers(users);
			usersSubmission.setSubmmision(fetchSubmissionForUser(userIds.get(0), jobId, status, userRole));
		}
		usersSubmission.setStatusCounts(fetchStatusCount(jobId, userRole));
		return usersSubmission;
	}

	private List<StatusCounts> fetchStatusCount(int jobId, int userRole) throws VResumeDaoException {
		List<StatusCounts> statusCounts = submissionDao.fetchStatusCountsForJobId(jobId);
		if (userRole == HIRING_MGR_ROLE) {
			for (StatusCounts statusCount : statusCounts) {
				statusCount.setStatus(statusChangeFromSToNForHM(statusCount));
			}
		}
		return statusCounts;
	}

	/**
	 * @param statusCount
	 * @return
	 */
	private String statusChangeFromSToNForHM(StatusCounts statusCount) {
		return statusCount.getStatus().equals(SubmissionStatusEnum.SUBMITTED_HM.toString())
				? SubmissionStatusEnum.NEW.toString() : statusCount.getStatus();
	}

	public Submission fetchSubmissionForUser(Integer userId, int jobId, String status, int userRole)
			throws VResumeDaoException, IOException {
		status = statusChangeFromNToSForHM(status, userRole);
		Submission submission = submissionDao.fetchSubmissionForUserJob(userId, jobId, status);
		if (submission != null) {
			return updateCommentsAndSections(userId, submission);
		}

		return null;

	}

	/**
	 * @param status
	 * @param userRole
	 * @return
	 */
	private String statusChangeFromNToSForHM(String status, int userRole) {
		return (userRole == HIRING_MGR_ROLE && status.equalsIgnoreCase(SubmissionStatusEnum.NEW.toString()))
				? SubmissionStatusEnum.SUBMITTED_HM.toString() : status;
	}

	/**
	 * @param userId
	 * @param submission
	 * @return
	 * @throws VResumeDaoException
	 * @throws IOException
	 */
	private Submission updateCommentsAndSections(Integer userId, Submission submission)
			throws VResumeDaoException, IOException {
		int submissionId = submission.getId();
		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())) {
			submission.setComments(submissionDao.fetchCommentsForSubmission(submissionId));
		}
		List<Availability> availabilities = submissionDao.fetchAvailabilities(submissionId);
		submission.setAvailablities(availabilities);
		submission.setSections(updateVideoPath(submissionDao.fetchSections(submissionId), userId));
		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.INTERVIEW_SCHEDULED.toString())) {
			for (Availability availability : availabilities) {
				if (availability.getId() == submission.getAvailabilityId()) {
					submission.setInterviewScheduled(
							availability.getDate() + " " + availability.getFromTime() + " " + availability.getToTime());
					break;
				}
			}
		}
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
		return submissionDao.fetchSubmissionCount(jobId).size();
	}

	public void updateStatusForSubmission(Submission submission) throws VResumeDaoException {
		String status = submission.getStatus();
		int submissionId = submission.getId();
		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		boolean isCMUser = user.getRole() == 1;
		Submission currentSubmission = submissionDao.fetchSubmissionById(submissionId);

		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())
				&& submission.getComments() != null && submission.getComments().size() > 0) {
			updateComments(submission, user.getId());
		}
		if (currentSubmission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString())) {
			updateSections(submission, isCMUser);
		}
		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			submission.setSubmittedToHM(true);
		}
		if (status.equalsIgnoreCase(SubmissionStatusEnum.HIRED.toString())) {
			Timestamp hiringDate = new Timestamp(System.currentTimeMillis());
			submission.setHiringDate(hiringDate);
			submissionDao.updateStatus(submission);
		} else {
			submissionDao.updateStatus(submission);
		}
	}

	/**
	 * @param submission
	 * @throws VResumeDaoException
	 */
	private void updateSections(Submission submission, boolean isCMUser) throws VResumeDaoException {
		if (submission.getSections() != null) {
			double sum = 0.0;
			for (Sections section : submission.getSections()) {
				sum += section.getCmRating();
				submissionDao.updateSections(section);
			}
			submission.setAverageCMRating(isCMUser ? sum / submission.getSections().size() : 0.0);
		}
	}

	/**
	 * @param submission
	 * @param user
	 * @throws VResumeDaoException
	 */
	private void updateComments(Submission submission, int userId) throws VResumeDaoException {
		Comment comment = submission.getComments().get(0);
		submissionDao.updateComments(comment, userId);
	}

	public List<Submission> fetchSubmissionsForUser(int userId) throws VResumeDaoException {
		return submissionDao.fetchSubmissionsForUsers(userId);
	}

	public Submission fetchSubmissionById(int id) throws VResumeDaoException, IOException {
		Submission submission = submissionDao.fetchSubmissionById(id);
		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString())) {
			submission = updateCommentsAndSections(user.getId(), submission);
		}

		return submission;
	}

}
