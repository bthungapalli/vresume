/**
 * 
 */
package com.siri.vresume.service;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.dao.JobDao;
import com.siri.vresume.dao.SubmissionDao;
import com.siri.vresume.dao.UserDao;
import com.siri.vresume.dao.UserSubmissionDAO;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Comment;
import com.siri.vresume.domain.DefaultVideo;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.OptimizedUserSubmission;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.User;
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
	
	@Autowired
	private UserSubmissionDAO usersubmissionDAO;
	
	@Value("${user.default.video.path}")
	private String defaultVideoPath;

	private final Logger logger = LoggerFactory.getLogger(SubmsissionService.class);

	public Submission postSubmisson(Submission submission, SecurityUser user) throws VResumeDaoException, IOException {
		try {
			int submissionId = (int) (Math.random() * 9000) + 1000;
			String savePath = submissionsPath + submission.getUserId();
			boolean isHMJob = false;
			submission.setId(submissionId);
			Job job = jobDao.fetchJobByJobId(submission.getJobId());
			// saveSections(submission.getSections(), submissionId, savePath);
			saveAvailability(submission.getAvailablities(), submissionId);
			if(submission.isDefaultResume()){
				FileUtils.copyFile(new File(user.getDefaultResumePath()),new File(savePath+File.separator+user.getId()+user.getDefaultResumePath().substring(user.getDefaultResumePath().lastIndexOf("."))));
				savePath =user.getId()+user.getDefaultResumePath().substring(user.getDefaultResumePath().lastIndexOf("."));
			}else{
				savePath =vresumeUtils.saveFile(submission.getResume(), String.valueOf(submissionId), savePath);
			}
			 
			submission.setResumePath(savePath);
			UserDetails userDetails=userDao.fetchUserById(job.getCreatedById());
			if (job.getCreatedById() != job.getHiringUserId() || userDetails.getRole()==7) {
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
		if(sections.getDefaultVideoPath()==null){
			savePath = vresumeUtils.saveFile(sections.getVideoFile(), sources, savePath);
			sections.setVideoPath(savePath);
		}else{
			File fileDirectory = new File(savePath);
			if (!fileDirectory.exists()) {
				fileDirectory.mkdirs();
			}
			String fileName = sources + "-" + sections.getDefaultVideoFileName();
			savePath = fileDirectory + File.separator +fileName;
			try {
				String path=defaultVideoPath + File.separator ;
				FileUtils.copyFile(new File(path+ sections.getDefaultVideoPath()),new File(savePath));
				sections.setVideoPath(fileName);
			} catch (IllegalStateException | IOException e) {
				throw new VResumeDaoException(e.getMessage());
			}
		}
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
	
	
	public UsersSubmission fetchSubmission(int jobId, String status,SecurityUser user) throws VResumeDaoException, IOException {
//		SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
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
	
	/**
	 * @changed method by Vedavyas
	 */
	public UsersSubmission fetchOptimizeSubmission(int jobId, String status,SecurityUser user) throws VResumeDaoException, IOException {
		//SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		int userRole = user.getRole();
		status = statusChangeFromNToSForHM(status, userRole);
		UsersSubmission usersSubmission=new UsersSubmission();
		//OptimizedUserSubmission ous=new OptimizedUserSubmission();
		List<OptimizedUserSubmission> users1 = usersubmissionDAO.fetchUsersForJobByIds(jobId,status);
		//if(users!=null && !users.isEmpty()){
		for(OptimizedUserSubmission ops : users1){
		List<UserDetails> users=new ArrayList<>();
		User opsuser = new User();
		opsuser.setEmail(ops.getEmail());
		opsuser.setFirstName(ops.getFirstName());
		opsuser.setLastName(ops.getLastName());
		opsuser.setCurrentEmployer(ops.getCurrentEmployer());
		opsuser.setPhone(ops.getPhone());
		opsuser.setMailAccount(ops.getMailAccount());
		opsuser.setId(ops.getId());
		Submission submission=new Submission();
		submission.setUserId(ops.getUserId());
		submission.setJobId(ops.getJobId());
		submission.setStatus(ops.getStatus());
		usersSubmission.setUsers(users);
		usersSubmission.setSubmmision(fetchSubmissionForUser(submission.getUserId(), jobId, status, userRole));
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

	public void updateStatusForSubmission(Submission submission, SecurityUser user) throws VResumeDaoException {
		String status = submission.getStatus();
		int submissionId = submission.getId();
		//SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		boolean isCMUser = user.getRole() == 1 ;
		boolean isCorporateUser = user.getRole() == 7;
		Submission currentSubmission = submissionDao.fetchSubmissionById(submissionId);

		if (currentSubmission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString())) {
			updateSections(submission, isCMUser);

		}

		else if (currentSubmission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			/*try{
			 submissionDao.updateSectionsList(submission.getSections());
			}*/
			for (Sections section : submission.getSections()) {
				section.setCmRating(0);
				try{
				submissionDao.updateSections(section);
				}catch(Exception e){
					e.printStackTrace();
				}
			}
		}

		if (status.equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())) {
			if (verifyComments(submission, currentSubmission))
				updateComments(submission, user.getId());
			updateStatus(submission);
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			submission.setSubmittedToHM(true);
			if (!submission.isDateChanged() && verifyComments(submission, currentSubmission)) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
			submissionDao.updateHmNewCount(submission.getJobId());
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.HIRED.toString())) {
			Timestamp hiringDate = new Timestamp(System.currentTimeMillis());
			submission.setHiringDate(hiringDate);
			if (verifyComments(submission, currentSubmission)) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
		}

		else if (status.equalsIgnoreCase(SubmissionStatusEnum.INTERVIEW_SCHEDULED.toString())) {
			List<Availability> avails = submission.getAvailablities();
			updateDateFormat(avails, submission.getId());
			if (currentSubmission.isDateChanged()) {
				submission.setDateChanged(true);
			}
			submissionDao.deleteSelectedAvailabilities(submission.getId());
			submissionDao.updateSelectedAvailabilities(submission.getId(), submission.getAvailabilityId());
			
			/*else {
				submissionDao.updateSelectedAvailabilities(submission.getId(), submission.getAvailabilityId());
			}*/
			if (verifyComments(submission, currentSubmission)) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
		}

		else {
			if (verifyComments(submission, currentSubmission)) {
				updateComments(submission, user.getId());
			}
			updateStatus(submission);
		}

		// Decrease new count only if status is New for CM or HM or Corporate user.
		if ((currentSubmission.getStatus().equals(SubmissionStatusEnum.NEW.toString()) && isCorporateUser) || currentSubmission.getStatus().equals(SubmissionStatusEnum.NEW.toString())
				|| currentSubmission.getStatus().equals(SubmissionStatusEnum.SUBMITTED_HM.toString()) ) {
			submissionDao.decreaseNewCount(submission.getJobId(), isCMUser || isCorporateUser);
		}

	}

	/**
	 * @param submission
	 * @param currentSubmission
	 * @return
	 */
	private boolean verifyComments(Submission submission, Submission currentSubmission) {
		if (submission.getComments() != null && submission.getComments().size() > 0){
			if(currentSubmission.getComments() !=null){
				return submission.getComments().size() > currentSubmission.getComments().size();
			}
			return true;
			}
		return false;
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
		Comment comment = submission.getComments().get(submission.getComments().size()-1);
		submissionDao.updateComments(comment, userId);
	}

	public List<Submission> fetchSubmissionsForUser(int userId) throws VResumeDaoException {
		return submissionDao.fetchSubmissionsForUsers(userId);
	}

	public Submission fetchSubmissionById(int id,SecurityUser user) throws VResumeDaoException, IOException {
		Submission submission = submissionDao.fetchSubmissionById(id);
		//SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.NEW.toString())) {
			submission = updateCommentsAndSections(user.getId(), submission);
		}

		return submission;
	}

}
