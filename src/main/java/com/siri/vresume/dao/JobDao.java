/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
@CacheNamespace(implementation=org.mybatis.caches.ehcache.EhcacheCache.class)
public interface JobDao {

	@ResultMap("jobResultMap")
	@Select("Select * from jobs where created_byId=#{id} or hiring_user_id=#{id}")
	@Options(useCache=true)
	List<Job> fetchJobs(int id);
	
	@Select("Select id as userId,email , firstName,lastName from users where role=2")
	@Options(useCache=true)
	List<UserDetails> fetchHiringMgr();

	@ResultMap("jobResultMap")
	@Select("<script> Select * from jobs where status = #{status} <if test = 'userId != 0'> AND (created_byId=#{userId} or hiring_user_id=#{userId})</if> order by created_at desc </script>")
	@Options(useCache=true)
	List<Job> fetchJobsByStatus(@Param("status") String status, @Param("userId") int userId) throws VResumeDaoException;

	@Insert("Insert into jobs (template_id,title,description,location,created_at,created_byId,hiring_user_id,skills,status,job_type,compensation,experience, duration,start_date) values (#{templateId},#{title},#{description},#{location},NOW(),#{createdById},#{hiringUserId},#{skills},#{status},#{jobType},#{compensation},#{experience},#{duration},#{startDate})")
	@Options(flushCache=true)
	void postJob(Job job) throws VResumeDaoException;

	@Update("Update jobs set title=#{title},description=#{description} ,location= #{location},skills = #{skills},job_type=#{jobType},hiring_user_id=#{hiringUserId},compensation=#{compensation},experience=#{experience},start_date=#{startDate},status=#{status}, updated_at = NOW() where id=#{id}")
	@Options(flushCache=true)
	void updateJob(Job job) throws VResumeDaoException;

	@ResultMap("jobResultMap")
	@Select("Select j.* , u.currentEmployer as companyName from jobs j , users u  where j.id=#{jobId} and u.id = j.hiring_user_id")
	@Options(useCache=true)
	Job fetchJobByJobId(int jobId) throws VResumeDaoException;

	@Delete("Delete from jobs where id=#{jobId}")
	@Options(flushCache=true)
	void deleteJob(int jobId) throws VResumeDaoException;

}
