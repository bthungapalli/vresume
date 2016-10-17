/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
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

	@Insert(" Insert into resume_sections(sectionName,submissionId,video,rating) values (#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.rating}")
	public void insertSection(@Param("sections") Sections section, @Param("submissionId") int submissionId)
			throws VResumeDaoException;


	public void insertAvailabilities(@Param("availablities") List<Availability> availablities) throws VResumeDaoException;

	public void saveSubmission(Submission submission) throws VResumeDaoException;

	@Delete("Delete from availabilities where submission_id=#{submissionId}")
	public void deleteAvailabilities(int submissionId) throws VResumeDaoException;

	@Delete("Delete from resume_sections where submission_id = #{submissionId}")
	public void deleteSections(int submissionId) throws VResumeDaoException;

	@Delete("Delete from submissions where id= #{submissionId}")
	public void deleteSubmission(int submissionId) throws VResumeDaoException;

}
