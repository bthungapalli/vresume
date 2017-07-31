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
import com.siri.vresume.dao.JobDao;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Comment;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
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
	private JobDao jobDao;

	@Autowired
	private UserDao userDao;

	private final Logger logger = LoggerFactory.getLogger(SubmsissionService.class);

	public Submission postSubmisson(Submission submission) throws VResumeDaoException {
		try {
			int submissionId = (int) (Math.random() * 9000) + 1000;
			String savePath = submissionsPath + submission.getUserId();
			boolean isHMJob = false;
			submission.setId(submissionId);
			Job job = jobDao.fetchJobByJobId(submission.getJobId());
			// saveSections(submission.getSections(), submissionId, savePath);
			saveAvailability(submission.getAvailablities(), submissionId);
			savePath = vresumeUtils.saveFile(submission.getResume(), String.valueOf(submissionId), savePath);
			submission.setResumePath(savePath);
			if (job.getCreatedById() != job.getHiringUserId()) {
				submission.setStatus(SubmissionStatusEnum.NEW.toString());
				submission.setSubmittedToHM(false);
			} else {
				submission.setStatus(SubmissionStatusEnum.SUBMITTED_HM.toString());
				submission.setSubmittedToHM(true);
				isHMJob = true;
			}
			submissionDao.saveSubmission(submission);
			updateNewCounts(submission.getJobId(), isHMJob);

			submissionDao.updateJobUserMapping(submission.getJobId(), submission.getUserId());
		} catch (RuntimeException re) {
			throw new VResumeDaoException("Error Occured::" + re.getCause());
		}
		return submission;
	}

	/**
	 * @param submission
	 * @param isHMJob
	 */
	private void updateNewCounts(int jobId, boolean isHMJob) {
		if (isHMJob) {
			submissionDao.updateSubmissionAndHMCount(jobId);
		} else {
			submissionDao.updateSubmissionAndNewCount(jobId);
		}
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
		List<StatusCounts> statusCounts = submissionDao.fetchStatusCountsForJobId(jobId, userRole);
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
		Submission submission = submissionDao.fetchSubmissionForUserJob(userId, jobId, status, userRole);
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
		submission.setComments(submissionDao.fetchCommentsForSubmission(submissionId));
		List<Availability> availabilities = submissionDao.fetchAvailabilities(submissionId);
		submission.setAvailablities(availabilities);
		submission.setSections(updateVideoPath(submissionDao.fetchSections(submissionId), userId));
		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.INTERVIEW_SCHEDULED.toString())) {
			submission.setAvailabilityId(submissionDao.selectSelectedAvailabilities(submission.getId()));
			for (Availability availability : availabilities) {
				if (submission.getAvailabilityId().contains(availability.getId())) {
					submission.getInterviewScheduled().add(
							availability.getDate() + " " + availability.getFromTime() + " " + availability.getToTime());
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

	public Integer fetchSubmissionCount(int jobId, int role) throws VResumeDaoException {
		return submissionDao.fetchSubmissionCount(jobId, role).size();
	}

	public void updateStatusForSubmission(Submission submission) throws VResumeDaoException {
		String status = submission.getStatus();
		int submissionId = submission.getId();
		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		boolean isCMUser = user.getRole() == 1;
		Submission currentSubmission = submissionDao.fetchSubmissionById(submissionId);

		if (currentSubmission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString())) {
			updateSections(submission, isCMUser);

		}

		else if (currentSubmission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			// submissionDao.updateSectionsList(submission.getSections());
			for (Sections section : submission.getSections()) {
				section.setCmRating(0);
				submissionDao.updateSections(section);
			}
		}

		if (status.equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())) {
			if (submission.getComments() != null && submission.getComments().size() > 0)
				updateComments(submission, user.getId());
			updateStatus(submission);
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			submission.setSubmittedToHM(true);
			if (submission.getComments() != null && submission.getComments().size() > 0) {
//				updateComments(submission, user.getId());
			}
			updateStatus(submission);
			submissionDao.updateHmNewCount(submission.getJobId());
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.HIRED.toString())) {
			Timestamp hiringDate = new Timestamp(System.currentTimeMillis());
			submission.setHiringDate(hiringDate);
			if (submission.getComments() != null && submission.getComments().size() > 0) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.INTERVIEW_SCHEDULED.toString())) {
			List<Availability> avails = submission.getAvailablities();
			updateDateFormat(avails, submission.getId());
			if (currentSubmission.isDateChanged()) {
				submission.setDateChanged(true);
				submissionDao.deleteSelectedAvailabilities(submission.getId());
				submissionDao.updateSelectedAvailabilities(submission.getId(), submission.getAvailabilityId());
			}
//			if (submission.getComments() != null && submission.getComments().size() > 0) {
//				updateComments(submission, user.getId());
//			}
			updateStatus(submission);
		}

		else {
			if (submission.getComments() != null && !submission.getComments().isEmpty()) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
		}

		// Decrease new count only if status is New for CM or HM.
		if (currentSubmission.getStatus().equals(SubmissionStatusEnum.NEW.toString())
				|| currentSubmission.getStatus().equals(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			submissionDao.decreaseNewCount(submission.getJobId(), isCMUser);
		}

	}

	private void updateDateFormat(List<Availability> avails, int submissionId) {
		for (Availability avail : avails) {
			formatDateFromAvail(avail);
			submissionDao.updateAvailabilities(avail);
		}
	}

	/**
	 * @param avail
	 */
	private void formatDateFromAvail(Availability avail) {
		String dateString = avail.getDate();
		try {
			avail.setDate(dateString.substring(0, dateString.indexOf('T')));
		} catch (Exception e) {
			// avail.setDate(avail.getDate());
		}
	}

	/**
	 * @param submission
	 * @throws VResumeDaoException
	 */
	private void updateStatus(Submission submission) throws VResumeDaoException {
		submissionDao.updateStatus(submission);
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
			// submissionDao.updateSectionsList(submission.getSections());;
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
