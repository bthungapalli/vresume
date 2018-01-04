/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.OptimizedUserSubmission;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UsersSubmission;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author vedavyas
 *
 */
@Repository
public interface UserSubmissionDAO {
	@Select("SELECT u.*,s.* FROM users u,submissions s WHERE u.id IN (SELECT submissions.user_id FROM submissions WHERE job_id = #{jobId} AND status = #{status} order by created_at asc) GROUP BY u.id")
	public List<OptimizedUserSubmission> fetchUsersForJobByIds(@Param ("jobId") int jobId,@Param ("status") String status)throws VResumeDaoException;
}
