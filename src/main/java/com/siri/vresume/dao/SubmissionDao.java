/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface SubmissionDao {

	@Insert(" Insert into resume_sections(sectionName,submission_id,videoPath,rating) values (#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.rating}")
	public void insertSection(@Param("sections") Sections section, @Param("submissionId") int submissionId)
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

	@Select("Select * from submissions where user_id = #{userId} and job_id=#{jobId}")
	public Submission fetchSubmissionForUserJob(@Param("userId") Integer userId, @Param("jobId")int jobId);

	@Select("Select * from available_times where submission_id=#{id}")
	public List<Availability> fetchAvailabilities(int id);

	@Select("Select id,submission_id as submissionId,videoPath,rating as userRating from resume_sections where submission_id = #{id}")
	public List<Sections> fetchSections(int id);

}
