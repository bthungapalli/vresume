/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Component
public interface JobDao {

	@ResultMap("jobResultMap")
	//@Select("Select * from jobs where created_byId=#{id} or hiring_user_id=#{id}")
	@Select("SELECT j . * , c.currency_name FROM jobs j, currency c WHERE j.currency_value=c.currency_value and j.created_byId=#{id} or j.hiring_user_id=#{id}")
	List<Job> fetchJobs(int id);
	
	@Select("Select id as userId,email , firstName,lastName from users where role=2")
	List<UserDetails> fetchHiringMgr();

	@ResultMap("jobResultMap")
	List<Job> fetchJobsByStatus(@Param("status") String status, @Param("userRole") int userRole,@Param("userId") int userId) throws VResumeDaoException;
	
	@Insert("Insert into jobs (template_id,diversity,title,description,location,created_at,created_byId,hiring_user_id,skills,status,job_type,compensation,payrate_type,currency_value,minimum_experience,maximum_experience, duration,showCompensation,start_date,preferredCheck,diverseCheck,department,quota,diverse,others,diverseType) values (#{templateId},#{diversityList},#{title},#{description},#{location},NOW(),#{createdById},#{hiringUserId},#{skills},#{status},#{jobType},#{compensation},#{payrateType},#{currency},#{minimumExperience},#{maximumExperience},#{duration},#{showCompensation},#{startDate},#{preferredCheck},#{diverseCheck},#{department},#{quota},#{diverse},#{others},#{diverseType})")
	void postJob(Job job) throws VResumeDaoException;

	@Update("Update jobs set diversity=#{diversityList}, title=#{title},description=#{description} ,location= #{location},skills = #{skills},job_type=#{jobType},hiring_user_id=#{hiringUserId},compensation=#{compensation},payrate_type=#{payrateType},currency_value=#{currency},minimum_experience=#{minimumExperience},maximum_experience=#{maximumExperience},start_date=#{startDate},status=#{status}, duration=#{duration},showCompensation=#{showCompensation},preferredCheck=#{preferredCheck},diverseCheck=#{diverseCheck},department=#{department},quota=#{quota},diverse=#{diverse},others=#{others},diverseType=#{diverseType} , updated_at = NOW() where id=#{id}")
	void updateJob(Job job) throws VResumeDaoException;

	@ResultMap("jobResultMap")
	@Select("Select j.* , u.currentEmployer as companyName from jobs j , users u  where j.id=#{jobId} and u.id = j.hiring_user_id")
	Job fetchJobByJobId(int jobId) throws VResumeDaoException;

	@Delete("Delete from jobs where id=#{jobId}")
	void deleteJob(int jobId) throws VResumeDaoException;

	@Select("select count(*) from job_user_mapping where jobId = #{jobId} and userId = #{userId}")
	Integer fetchAppliedStatusForUser(@Param("jobId") int jobId,@Param("userId") int userId);
	
	@ResultMap("jobResultMap")
	@Select("select j.*,t.sections as sections, t.internal_sections as internalSections from jobs j left join templates t on j.template_id=t.id where j.id =#{jobId}")
	Job viewJobByJobId(@Param("jobId") int jobId) throws VResumeDaoException;
	
	
	@ResultMap("jobResultMap")
	@Select("select j.* from jobs j left join submissions_to_tech t on j.id=t.job_id where t.user_id =#{userId}")
	List<Job> fetchTechJobs(@Param("userId") int id);
	
}
