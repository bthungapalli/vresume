/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

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

	@Insert("<script> Insert into resume_sections(sectionName,submissionId,video,rating) values <forech item='section'index = 'index' collection = 'sections' open = '(' separator='),(' close=')'>"
			+ "(#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.rating} </foreach></script>")
	void insertSection(@Param("sections") List<Sections> sections, @Param("submissionId") int submissionId)
			throws VResumeDaoException;

	@Insert("<script> Insert into available_times(submissionId,date,from,to) values <forech item='time'index = 'index' collection = 'availablities' open = '(' separator='),(' close=')'>"
			+ "(#{submissionId},#{time.date},#{time.from},#{time.to} </foreach></script>")
	void insertAvailabilities(@Param("availablities") List<Availability> availablities,
			@Param("submissionId") int submissionId) throws VResumeDaoException;

	@Insert("Insert into submissions(user_id,job_id,created_at,status,hiring_date,resumeName) values(#{userId},#{jobId},NOW(),#{status},#{hiringDate},#{resumeName})")
	void saveSubmission(Submission submission) throws VResumeDaoException;

}
