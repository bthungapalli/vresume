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
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.SubmissionComments;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface SubmissionDao {

	@Insert(" Insert into resume_sections(sectionName,submission_id,videoPath,rating,created_at) values (#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.userRating},NOW())")
	public void insertSection(@Param("section") Sections section)
			throws VResumeDaoException;


	public void insertAvailabilities(@Param("availablities") List<Availability> availablities) throws VResumeDaoException;

	public void saveSubmission(Submission submission) throws VResumeDaoException;

	@Delete("Delete from available_times where submission_id=#{submissionId}")
	public void deleteAvailabilities(int submissionId) throws VResumeDaoException;

	@Delete("Delete from resume_sections where submission_id = #{submissionId}")
	public void deleteSections(int submissionId) throws VResumeDaoException;

	@Delete("Delete from submissions where id= #{submissionId}")
	public void deleteSubmission(int submissionId) throws VResumeDaoException;


	@Select("Select user_id from submissions where job_id = #{jobId} order by created_at asc")
	public List<Integer> fetchUsersForJob(int jobId) throws VResumeDaoException;

	@ResultMap("submissionResultMap")
	@Select("Select * from submissions where user_id = #{userId} and job_id=#{jobId} and status = #{status}")
	public Submission fetchSubmissionForUserJob(@Param("userId") Integer userId, @Param("jobId")int jobId,@Param("status") String status) throws VResumeDaoException;

	@Select("Select id,submission_id as submissionId,date,fromTime,toTime from available_times where submission_id=#{id}")
	public List<Availability> fetchAvailabilities(int id)throws VResumeDaoException;

	@Select("Select id as sectionId,submission_id as submissionId,sectionName,videoPath,rating as userRating from resume_sections where submission_id = #{id}")
	public List<Sections> fetchSections(int id)throws VResumeDaoException;
	
	@Select("Select count(*) from submissions where job_id = #{jobId}")
	public Integer fetchSubmissionCount(int jobId) throws VResumeDaoException;

	@Select("select status, count(*) as count from submissions where job_id=#{jobId} group by status")
	public List<StatusCounts> fetchStatusCountsForJobId(int jobId)throws VResumeDaoException;


	@Update("<script>Update submission set status = #{status},updated_at = NOW() <if test='hiringDate !=null'>hiring_date=hiringDate</if> where id=#{submissionId} </script>")
	public void updateStatus(@Param("submissionId") int submissionId,@Param("status") String status,@Param("hiringDate")Timestamp hiringDate )throws VResumeDaoException;

	@Insert("Insert into comments(user_id,description,created_at) values (#{submissionComments.userId},#{submissionComments.description},NOW()")
	public void updateComments(@Param("submissionComments") SubmissionComments submissionComments) throws VResumeDaoException;

}
