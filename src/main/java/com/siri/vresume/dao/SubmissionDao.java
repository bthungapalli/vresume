/**
 * 
 */
package com.siri.vresume.dao;

import java.sql.Timestamp;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Comment;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface SubmissionDao {

	public static final String FETCH_SUBMISSION_BYID = "Select * from submissions where id = #{id}";

	public static final String FETCH_SUBMISSIONS_USERS = "Select s.job_id as jobId , j.title as title,j.description as jobDescription,s.status,s.created_at as createdAt , s.id as submissionId  from submissions s, jobs j where s.user_id = #{userId} and s.job_id = j.id";

	public static final String INSERT_SECTIONS = "Insert into resume_sections(sectionName,submission_id,videoPath,rating,created_at) values (#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.userRating},NOW())";

	public static final String SUBMISSION_RESULT_MAP = "submissionResultMap";

	public static final String FETCH_STATUS_COUNTS = "select status, count(*) as count from submissions where job_id=#{jobId} group by status";
	
	public static final String FETCH_COUNT = "Select count(*) from submissions where job_id = #{jobId}";
	
	public static final String FETCH_SECTIONS = "Select id as sectionId,submission_id as submissionId,sectionName,videoPath,rating as userRating from resume_sections where submission_id = #{id}";
	
	public static final String FETCH_AVAILABILITIES = "Select id,submission_id as submissionId,date,fromTime,toTime from available_times where submission_id=#{id}";
	
	public static final String FETCH_SUBMISSIONS = "<script>Select * from submissions where job_id=#{jobId} <if test='userId !=0'> and user_id = #{userId}</if> <if test='status !=null'> and status = #{status}</if></script>";
	
	public static final String FETCHUSERS_JOB = "Select user_id from submissions where job_id = #{jobId} and status = #{status} order by created_at asc";
	
	public static final String DELETE_SUBMISSIONS = "Delete from submissions where id= #{submissionId}";
	
	public static final String DELETE_SECTIONS = "Delete from resume_sections where submission_id = #{submissionId}";
	
	public static final String DELETE_AVAILABILITIES = "Delete from available_times where submission_id=#{submissionId}";
	
	public static final String FETCH_COMMENTS = "Select c.id as commentId,c.submission_id as submissionId,CONCAT_WS(',',u.firstName,u.lastName) as commentedBy , c.comment , c.created_at as createdAt from comments c , users u where submission_id = #{submissionId} and u.id = c.user_id order by c.created_at ";
	
	public static final String UPDATE_SUBMISSION = "<script>Update submissions set status = #{submission.status},updated_at = NOW() <if test='submission.hiringDate !=null'>,hiring_date=#{submission.hiringDate}</if><if test ='submission.interviewMode !=null'>,interviewMode = #{submission.interviewMode} , interviewDescription = #{submission.interviewDescription},availabilityId = #{submission.availabilityId}</if> where id=#{submission.id} </script>";
	
	public static final String INSERT_COMMENTS = "Insert into comments(user_id,submission_id,comment,created_at) values (#{userId},#{comment.submissionId},#{comment.comment},NOW())";
	
	public static final String UPDATE_SECTIONS_RATINGS = "<script><foreach collection='sections' item='section'separator=','>UPDATE resume_sections SET <if test = 'section.cmRating !=0'> consultant_rating = #{section.cmRating}</if> <if test = 'section.hmRating !=0'> , hiring_manager_rating = #{section.hmRating}</if> WHERE id = #{section.sectionId}</foreach>)";

	
	
	@Insert(INSERT_SECTIONS)
	public void insertSection(@Param("section") Sections section) throws VResumeDaoException;
	public void insertAvailabilities(@Param("availablities") List<Availability> availablities)
			throws VResumeDaoException;

	public void saveSubmission(Submission submission) throws VResumeDaoException;

	@Delete(DELETE_AVAILABILITIES)
	public void deleteAvailabilities(int submissionId) throws VResumeDaoException;

	@Delete(DELETE_SECTIONS)
	public void deleteSections(int submissionId) throws VResumeDaoException;

	@Delete(DELETE_SUBMISSIONS)
	public void deleteSubmission(int submissionId) throws VResumeDaoException;

	@Select(FETCHUSERS_JOB)
	public List<Integer> fetchUsersForJob(@Param ("jobId") int jobId,@Param ("status") String status) throws VResumeDaoException;

	@ResultMap(SUBMISSION_RESULT_MAP)
	@Select(FETCH_SUBMISSIONS)
	public Submission fetchSubmissionForUserJob(@Param("userId") Integer userId, @Param("jobId") int jobId,
			@Param("status") String status) throws VResumeDaoException;

	@Select(FETCH_AVAILABILITIES)
	public List<Availability> fetchAvailabilities(int id) throws VResumeDaoException;

	public List<Sections> fetchSections(int id) throws VResumeDaoException;

	@Select(FETCH_COUNT)
	public Integer fetchSubmissionCount(int jobId) throws VResumeDaoException;

	@Select(FETCH_STATUS_COUNTS)
	public List<StatusCounts> fetchStatusCountsForJobId(int jobId) throws VResumeDaoException;

	@Update(UPDATE_SUBMISSION)
	public void updateStatus(@Param("submission") Submission submission) throws VResumeDaoException;

	@Insert(INSERT_COMMENTS)
	public void updateComments(@Param("comment") Comment comment , @Param("userId") int userId) throws VResumeDaoException;

	//@Update(UPDATE_SECTIONS_RATINGS)
	public void updateSections(@Param("section")Sections sections) throws VResumeDaoException;

	//@Select(FETCH_COMMENTS)
	public List<Comment> fetchCommentsForSubmission(int submissionId) throws VResumeDaoException;

	@Select(FETCH_SUBMISSIONS_USERS)
	public List<Submission> fetchSubmissionsForUsers(int userId) throws VResumeDaoException;

	@ResultMap(SUBMISSION_RESULT_MAP)
	@Select(FETCH_SUBMISSION_BYID)
	public Submission fetchSubmissionById(int id) throws VResumeDaoException;

}
