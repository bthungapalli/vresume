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
	public void insertSection(@Param("sections") List<Sections> sections, @Param("submissionId") int submissionId)
			throws VResumeDaoException;


	public void insertAvailabilities(@Param("availablities") List<Availability> availablities) throws VResumeDaoException;

	public void saveSubmission(Submission submission) throws VResumeDaoException;

}
