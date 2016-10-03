/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.UserDetails;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface JobDao {

	@Select("Select * from jobs where created_byId=#{id} or hiring_user_id=#{id}")
	List<Job> fetchJobs(int id);
	
	@Select("Select id as userId,email , firstName,lastName from users where role=2")
	List<UserDetails> fetchHiringMgr();

	@Select("Select * from jobs where status = #{status} and (created_byId=#{userId} or hiring_user_id=#{userId}) ")
	List<Job> fetchJobsByStatus(@Param("status") String status, @Param("userId") int userId);

}
