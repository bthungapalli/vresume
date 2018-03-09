/**
 * 
 */
package com.siri.vresume.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siri.vresume.config.MailUtil;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UsersSubmission;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.JobService;
import com.siri.vresume.service.SubmsissionService;
import com.siri.vresume.service.UserService;
import com.siri.vresume.utils.AvailabilityEditor;
import com.siri.vresume.utils.SubmissionStatusEnum;
import com.siri.vresume.utils.VresumeUtils;


/**
 * @author bthungapalli
 *
 */
@RestController
@RequestMapping("/submissions")
public class SubmissionsController {

	@Autowired
	private SubmsissionService submissionService;

	private final Logger log = LoggerFactory.getLogger(SubmissionsController.class);

	@Value("${submission.path}")
	private String submissionsPath;
	
	@Value("${optimize.submission}")
	private boolean optimizeSubmissionFlag;

	@Autowired
	private JobService JobService;

	@Autowired
	private UserService userService;

	@Autowired
	private MailUtil mailUtils;
	
	@Autowired
	private UserController userController;
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> postSubmission(Submission submission, @RequestParam("resume") MultipartFile resume) {
		try {
			SecurityUser user = userController.fetchSessionObject();
			submission.setUserId(user.getId());
			submission.setResume(resume);
			Submission postedSubmission = submissionService.postSubmisson(submission);
			Map<String, Object> map = updateMailContent(postedSubmission);
			map.put("email", user.getEmail());
			map.put("name", user.getFirstName() + " " + user.getLastName());
			mailUtils.sendApplyJobMail(map);
			mailUtils.sendMailToCreatedUser(map);
			return new ResponseEntity<Integer>(postedSubmission.getId(), HttpStatus.OK);
		} catch (Exception vre) {
			return new ResponseEntity<String>("Error Occured " + vre.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * @param user
	 * @param job
	 * @param userDetails
	 * @param map
	 * @throws VResumeDaoException
	 */
	private Map<String, Object> updateMailContent(Submission postedSubmission) throws VResumeDaoException {
		SecurityUser user = userController.fetchSessionObject();
		Job job = JobService.fetchJobByJobId(postedSubmission.getJobId(),user);
		UserDetails userDetails = userService.fetchUserById(job.getCreatedById());
		Map<String, Object> map = new HashMap<>();

		map.put("jobName", job.getTitle());
		map.put("companyName", job.getCompanyName());
		map.put("createdByEmail", userDetails.getEmail());
		map.put("createdBy", VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()));
		return map;
	}

	@RequestMapping(value = "/sections", method = RequestMethod.POST)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> postSection(Sections section, @RequestParam("videoFile") MultipartFile videoFile) {
		int submissionId = Integer.parseInt(section.getSubmissionId());
		try {
			SecurityUser user = userController.fetchSessionObject();
			section.setVideoFile(videoFile);
			submissionService.saveSections(section, submissionId, user.getId());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception ex) {
			log.error("Error Occured:::", ex.getMessage());
			submissionService.deleteSubmissions(submissionId);
			return new ResponseEntity<String>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping("/job/{id}")
	@ResponseBody
	public ResponseEntity<?> fetchSubmissions(@PathVariable("id") int jobId,
			@RequestParam(required = false, value = "status") String status) {
		try {
			SecurityUser user = userController.fetchSessionObject();
			UsersSubmission userSubmission;
			if(optimizeSubmissionFlag){
				userSubmission = submissionService.fetchOptimizeSubmission(jobId, status,user);
			}else{
				userSubmission = submissionService.fetchSubmission(jobId, status,user);
			}
			return new ResponseEntity<UsersSubmission>(userSubmission, HttpStatus.OK);
		} catch (VResumeDaoException | IOException vre) {
			log.error("Problem occured while fetching submmision", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping("/job/{id}/user/{userId}")
	@ResponseBody
	public ResponseEntity<?> fetchSubmissionsForUser(@PathVariable("id") int jobId, @PathVariable("userId") int userId,
			@RequestParam(required = false, value = "status") String status) {

		try {
			SecurityUser user = userController.fetchSessionObject();
			Submission submission = submissionService.fetchSubmissionForUser(userId, jobId, status, user.getRole());
			if (submission != null)
				return new ResponseEntity<Submission>(submission, HttpStatus.OK);
			return new ResponseEntity<String>("No submission for the status", HttpStatus.OK);
		} catch (VResumeDaoException | IOException vre) {
			log.error("Problem occured while fetching submmision", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping("/count/{id}")
	@ResponseBody
	public ResponseEntity<?> fetchCountofSubmissions(@PathVariable("id") int jobId) {

		try {
			SecurityUser user = userController.fetchSessionObject();
			return new ResponseEntity<Integer>(submissionService.fetchSubmissionCount(jobId,user.getRole()), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			log.error("Problem occured while fetching count", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/updateStatus", method = RequestMethod.PUT)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> updateStatus(@RequestBody Submission submission) {
		try {
			SecurityUser user = (SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Submission mailSubmissionObject = submission;
			submissionService.updateStatusForSubmission(submission,user);
			triggerMailNotifications(mailSubmissionObject);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (VResumeDaoException | MessagingException vre) {
			log.error("Problem occured while fetching count", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	private void triggerMailNotifications(Submission submission) throws VResumeDaoException, MessagingException {
		SecurityUser user = userController.fetchSessionObject();
		Job job = JobService.fetchJobByJobId(submission.getJobId(),user);
		UserDetails userDetails = new UserDetails();
		if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.SUBMITTED_HM.toString())) {
			userDetails = userService.fetchUserById(job.getHiringUserId());
			triggerMailForSubmitToHM(submission, job, userDetails);
		} else if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.INTERVIEW_SCHEDULED.toString())) {
			triggerInterviewCalendarSync(submission, job, user);
		} else if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.HIRED.toString())) {
			triggerHiredEmail(submission, job, user);
		} else if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.UNDECIDED.toString())) {
			triggerUndecidedMail(submission, job);
		} else if (submission.getStatus().equalsIgnoreCase(SubmissionStatusEnum.REJECTED.toString())) {
			triggerRejectedEmail(submission, job, user);
		}
	}

	/**
	 * @param submission
	 * @param job
	 * @param user
	 * @throws VResumeDaoException
	 */
	private void triggerInterviewCalendarSync(Submission submission, Job job, SecurityUser user)
			throws VResumeDaoException {
		UserDetails candidateDetails = userService.fetchUserById(submission.getUserId());
		UserDetails cmDetails = userService.fetchUserById(job.getCreatedById());
		String cmDescription = VresumeUtils.buildCMDescription(cmDetails, user, submission, job, candidateDetails);
		String subject = VresumeUtils.buildSubject(submission, job, candidateDetails);
		for (Integer availbilityId : submission.getAvailabilityId()) {
			Availability availability = fetchAvailability(submission, availbilityId);
			mailUtils.syncCalendar(user.getEmail(), subject, availability, null);
			
			if (job.getCreatedById() != user.getId()) {
				mailUtils.syncCalendar(cmDetails.getEmail(), subject, availability, cmDescription);
			}
			
			if (job.getCreatedById() == user.getId() || !submission.isDateChanged()) {
				mailUtils.syncCalendar(candidateDetails.getEmail(), subject, availability,
						VresumeUtils.buildCandidateDescription(user, submission, job, candidateDetails));
			}
		}
	}

	private Availability fetchAvailability(Submission submission, Integer availbityId) {
		List<Availability> availabilities = submission.getAvailablities();
		for (Availability availability : availabilities) {
			if (availability.getId() == availbityId) {
				return availability;
			}

		}
		return null;
	}

	/**
	 * @param submission
	 * @param job
	 * @param user
	 * @throws VResumeDaoException
	 * @throws MessagingException
	 */
	private void triggerRejectedEmail(Submission submission, Job job, SecurityUser user)
			throws VResumeDaoException, MessagingException {
		UserDetails userDetails;
		UserDetails candidateDetails = userService.fetchUserById(submission.getUserId());
		Map<String, Object> map = new HashMap<>();
		Boolean isHMRejected = submission.getSubmittedToHM();
		map.put("candidateName",
				VresumeUtils.fetchFirstLastName(candidateDetails.getFirstName(), candidateDetails.getLastName()));
		map.put("jobName", job.getTitle());
		map.put("location", job.getLocation());
		map.put("comments", submission.getComments().get(0));
		map.put("companyName", job.getCompanyName());
		map.put("hmName", VresumeUtils.fetchFirstLastName(user.getFirstName(), user.getLastName()));
		if (isHMRejected && user.getRole() == 2) {
			userDetails = userService.fetchUserById(job.getCreatedById());
			map.put("cmName", VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()));
			mailUtils.sendRejectedEmail(userDetails.getEmail(), map, 1);
		}

		mailUtils.sendRejectedEmail(user.getEmail(), map, 2);
		mailUtils.sendRejectedEmail(candidateDetails.getEmail(), map, 0);// 0-cand,1-CM,2-HM
	}

	/**
	 * @param submission
	 * @param job
	 * @throws VResumeDaoException
	 * @throws MessagingException
	 */
	private void triggerUndecidedMail(Submission submission, Job job) throws VResumeDaoException, MessagingException {
		UserDetails userDetails = userService.fetchUserById(job.getCreatedById());
		UserDetails candidateDetails = userService.fetchUserById(submission.getUserId());
		Map<String, Object> map = new HashMap<>();
		map.put("cmName", VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()));
		map.put("candidateName",
				VresumeUtils.fetchFirstLastName(candidateDetails.getFirstName(), candidateDetails.getLastName()));
		map.put("jobName", job.getTitle());
		mailUtils.sendUndecidedMail(userDetails.getEmail(), map);
	}

	/**
	 * @param submission
	 * @param job
	 * @param user
	 * @throws VResumeDaoException
	 * @throws MessagingException
	 */
	private void triggerHiredEmail(Submission submission, Job job, SecurityUser user)
			throws VResumeDaoException, MessagingException {
		UserDetails userDetails = userService.fetchUserById(job.getCreatedById());
		UserDetails candidateDetails = userService.fetchUserById(submission.getUserId());
		Map<String, Object> map = new HashMap<>();
		map.put("hmName", VresumeUtils.fetchFirstLastName(user.getFirstName(), user.getLastName()));
		map.put("cmName", VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()));
		map.put("candidateName",
				VresumeUtils.fetchFirstLastName(candidateDetails.getFirstName(), candidateDetails.getLastName()));
		map.put("jobName", job.getTitle());
		map.put("location", job.getLocation());
		mailUtils.sendHireEmail(user.getEmail(), map, true);// Hire Email for HM
		mailUtils.sendHireEmail(userDetails.getEmail(), map, false); // Hire
																		// email
																		// for
																		// CM
	}

	/**
	 * @param submission
	 * @throws VResumeDaoException
	 * @throws MessagingException
	 */
	private void triggerMailForSubmitToHM(Submission submission, Job job, UserDetails userDetails)
			throws VResumeDaoException, MessagingException {
		Map<String, Object> map = new HashMap<>();
		map.put("jobName", job.getTitle());
		map.put("companyName", job.getCompanyName());
		map.put("createdByEmail", userDetails.getEmail());
		map.put("createdBy", VresumeUtils.fetchFirstLastName(userDetails.getFirstName(), userDetails.getLastName()));
		mailUtils.sendMailToCreatedUser(map);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchSubmisisonById(@PathVariable("id") int id) {
		try {
			SecurityUser user = userController.fetchSessionObject();
			return new ResponseEntity<Submission>(submissionService.fetchSubmissionById(id,user), HttpStatus.OK);
		} catch (VResumeDaoException | IOException vre) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
	@ResponseBody
	@JsonIgnoreProperties
	public ResponseEntity<?> fetchSubmissionsForUser(@PathVariable("userId") int userId) {
		try {
			return new ResponseEntity<List<Submission>>(submissionService.fetchSubmissionsForUser(userId),
					HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			log.error("Problem occured while fetching users Data", vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/filedownload", method = RequestMethod.GET)
	public HttpStatus download(@RequestParam("fileIs") String fileIs, HttpServletRequest request,
			HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		HttpStatus returnStatus = null;
		if (session != null) {
			try {
				log.debug("<<<<<<<<<<<< filedownload >>>>>>>>>>>>> >>> " + fileIs);
				File file = new File(submissionsPath + fileIs);
				InputStream is = new FileInputStream(file);

				// MIME type of the file
				response.setContentType("application/octet-stream");
				response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
				OutputStream os = response.getOutputStream();
				byte[] buffer = new byte[4096];
				int len;
				while ((len = is.read(buffer)) != -1) {
					os.write(buffer, 0, len);
				}
				log.debug("<<<<<<<<<<<< filedownload flushed >>>>>>>>>>>>> >>> " + fileIs);
				os.flush();
				os.close();
				is.close();
				returnStatus = HttpStatus.OK;
			} catch (IOException e) {
				log.debug("<<<<<<<<<<<< IO Exception in File download >>>>>>>>>>>>> >>> " + e.getMessage());
				returnStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			} catch (Exception e) {
				log.debug("<<<<<<<<<<<< Exception in File download >>>>>>>>>>>>> >>> " + e.getMessage());
				returnStatus = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			returnStatus = HttpStatus.UNAUTHORIZED;
		}
		return returnStatus;
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(List.class, new AvailabilityEditor());
	}

}
