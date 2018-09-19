/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Comment;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.StatusCounts;
import com.siri.vresume.domain.Submission;
import com.siri.vresume.domain.TechComment;
import com.siri.vresume.domain.TechSubmission;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
//@CacheNamespace(implementation=org.mybatis.caches.ehcache.EhcacheCache.class)
public interface SubmissionDao {

	public static final String FETCH_SUBMISSION_BYID = "Select * from submissions where id = #{id}";

	public static final String FETCH_SUBMISSIONS_USERS = "Select s.job_id as jobId , j.title as title,j.description as jobDescription,s.status,s.created_at as createdAt , s.id as submissionId  from submissions s, jobs j where s.user_id = #{userId} and s.job_id = j.id";

	public static final String INSERT_SECTIONS = "Insert into resume_sections(sectionName,submission_id,videoPath,rating,created_at,internal_section,section_order) values (#{section.sectionName},#{section.submissionId},#{section.videoPath},#{section.userRating},NOW(),#{section.internalSection},#{section.sectionOrder})";

	public static final String SUBMISSION_RESULT_MAP = "submissionResultMap";

	public static final String FETCH_STATUS_COUNTS = "<script>select status, count(*) as count from submissions where job_id=#{jobId} <if test='userRole ==2'> and submittedToHM = 1</if> group by status </script>";
	
	public static final String FETCH_COUNT = "<script>Select * from submissions where job_id = #{jobId} <if test='role ==2'> and submittedToHM = 1</if></script>";
	
	public static final String FETCH_SECTIONS = "Select id as sectionId,submission_id as submissionId,sectionName,videoPath,rating as userRating from resume_sections where submission_id = #{id}";
	
	public static final String FETCH_AVAILABILITIES = "Select id,submission_id as submissionId,date,fromTime,toTime,timeZone from available_times where submission_id=#{id}";
	
	public static final String FETCH_SUBMISSIONS = "<script>Select s.* , j.created_byId as createdBy, j.hiring_user_id as hiringUser from submissions s, jobs j where s.job_id=#{jobId} and s.job_id=j.id <if test='userId !=0'> and s.user_id = #{userId}</if> <if test='status !=null'> and s.status = #{status}</if> <if test='userRole ==2'> and s.submittedToHM = 1</if> order by AVERAGE_CM_RATING</script>";
	
	public static final String FETCHUSERS_JOB = "Select user_id from submissions where job_id = #{jobId} and status = #{status} order by created_at asc";
	
	public static final String DELETE_SUBMISSIONS = "Delete from submissions where id= #{submissionId}";
	
	public static final String DELETE_SECTIONS = "Delete from resume_sections where submission_id = #{submissionId}";
	
	public static final String DELETE_AVAILABILITIES = "Delete from available_times where submission_id=#{submissionId}";
	
	public static final String FETCH_COMMENTS = "Select c.id as commentId,c.submission_id as submissionId,CONCAT_WS(',',u.firstName,u.lastName) as commentedBy , c.comment , c.created_at as createdAt from comments c , users u where submission_id = #{submissionId} and u.id = c.user_id order by c.created_at ";
	
	public static final String UPDATE_SUBMISSION = "<script>Update submissions set status = #{submission.status},updated_at = NOW(),submittedToHM = #{submission.submittedToHM} , isDateChanged = #{submission.dateChanged} <if test='submission.hiringDate !=null'>,hiring_date=#{submission.hiringDate}</if><if test ='submission.interviewMode !=null'>,interviewMode = #{submission.interviewMode} , interviewDescription = #{submission.interviewDescription}</if><if test='submission.averageCMRating !=0.0'>,AVERAGE_CM_RATING=#{submission.averageCMRating}</if> where id=#{submission.id} </script>";
	
	public static final String INSERT_COMMENTS = "Insert into comments(user_id,submission_id,comment,created_at) values (#{userId},#{comment.submissionId},#{comment.comment},NOW())";
	
	public static final String FETCH_SELECTED_AVAIL = "SELECT availabilityId FROM selected_availabilites WHERE submissionId = #{submissionId}";

	public static final String DELETE_SELECTIONS = "Delete from selected_availabilites where submissionId = #{id}";
	
//	public static final String UPDATE_SECTIONS_RATINGS = "<script><foreach collection='sections' item='section'separator=','>UPDATE resume_sections SET <if test = 'section.cmRating !=0'> consultant_rating = #{section.cmRating}</if> <if test = 'section.hmRating !=0'> , hiring_manager_rating = #{section.hmRating}</if> WHERE id = #{section.sectionId}</foreach>)";
	
	
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
			@Param("status") String status,@Param("userRole") int userRole) throws VResumeDaoException;

	@Select(FETCH_AVAILABILITIES)
	public List<Availability> fetchAvailabilities(int id) throws VResumeDaoException;

	public List<Sections> fetchSections(int id) throws VResumeDaoException;

	@ResultMap(SUBMISSION_RESULT_MAP)
	@Select(FETCH_COUNT)
	public List<Submission> fetchSubmissionCount(@Param("jobId") int jobId ,@Param("role") int role) throws VResumeDaoException;

	@Select(FETCH_STATUS_COUNTS)
	public List<StatusCounts> fetchStatusCountsForJobId(@Param("jobId")int jobId , @Param("userRole") int userRole) throws VResumeDaoException;

	@Update(UPDATE_SUBMISSION)
	public void updateStatus(@Param("submission") Submission submission) throws VResumeDaoException;

	@Insert(INSERT_COMMENTS)
	public void updateComments(@Param("comment") Comment comment , @Param("userId") int userId) throws VResumeDaoException;

	//@Update(UPDATE_SECTIONS_RATINGS)
	public void updateSections(@Param("section")Sections sections) throws VResumeDaoException;
	
	//@Update(UPDATE_SECTIONS_RATINGS)
	public void updateSectionsList(@Param("sections")List<Sections> sections) throws VResumeDaoException;

	//@Select(FETCH_COMMENTS)
	public List<Comment> fetchCommentsForSubmission(int submissionId) throws VResumeDaoException;

	@Select(FETCH_SUBMISSIONS_USERS)
	public List<Submission> fetchSubmissionsForUsers(int userId) throws VResumeDaoException;

	@ResultMap(SUBMISSION_RESULT_MAP)
	@Select(FETCH_SUBMISSION_BYID)
	public Submission fetchSubmissionById(int id) throws VResumeDaoException;
	
	
	public void updateSelectedAvailabilities(@Param("submissionId") int id, @Param("availabilities") Set<Integer> availabilities);
	
	public void updateSelectedAvailabilitiesForUser(@Param("submissionId") int id, @Param("availabilities")Set<Integer> availabilities);
	
	@Select(FETCH_SELECTED_AVAIL)
	public Set<Integer> selectSelectedAvailabilities(int submissionId);
	
	@Delete(DELETE_SELECTIONS)
	public void deleteSelectedAvailabilities(int id);
	
	
	public void updateAvailabilities(@Param("element") Availability availablities);
	
	@Update("UPDATE jobs SET submissionCount = (submissionCount + 1) , newCount = (newCount+1) where id =#{jobId}")
	public void updateSubmissionAndNewCount(int jobId);
	
	 
	public void decreaseNewCount(@Param("jobId") int jobId , @Param("isCMUser") boolean isCMUser);
	
	/*@Update("UPDATE jobs SET newHmCount = (newHmCount+1) where id =#{jobId}")*/
	@Update("UPDATE jobs SET hmNewCount = (hmNewCount+1) where id =#{jobId}")
	public void updateHmNewCount(int jobId);
	
	@Update("UPDATE jobs SET submissionCount = (submissionCount + 1) , hmNewCount = (hmNewCount+1) where id =#{jobId}")
	public void updateSubmissionAndHMCount(int jobId);
	
	@Insert("Insert into job_user_mapping(jobId,userId) values (#{jobId},#{userId})")
	public void updateJobUserMapping(@Param("jobId")int jobId,@Param("userId") int userId);
	
	@Update("UPDATE available_times SET accept = #{status} where id =#{avlId}")
	public void updateUserAvailabilities(@Param("status") int status,@Param("avlId") int avlId);
	
	@Insert("Insert into submissions_to_tech(job_id,submission_id,user_Id,status) values (#{jobId},#{submissionId},#{userId},'NEW')")
	public void saveTech(@Param("jobId")int jobId,@Param("submissionId") int submissionId,@Param("userId") int userId);
	
	@Select("Select id as id, job_id as jobId, submission_id as submissionId, user_id as userId, status as status from submissions_to_tech where job_id=#{jobId} and submission_id=#{submissionId}")
	public List<TechSubmission> fetchSaveTech(@Param("submissionId")int submissionId,@Param("jobId") int jobId);
	
	@Select("select s.user_id from submissions s left join submissions_to_tech  st on s.id=st.submission_id where st.job_id=#{jobId} and st.user_id=#{userId} and st.status=#{status}")
	public List<Integer> fetchTechUsersForJob(@Param("jobId")int jobId,@Param("status") String status,@Param("userId") int userId);
	
	@Select("select status, count(*) as count from submissions_to_tech where job_id=#{jobId} and user_id=#{userId} group by status ")
	public List<StatusCounts> fetchTechStatusCountsForJobId(@Param("jobId")int jobId,@Param("userId") int userId);
	
	@Select("select tech_sections.id as techSectionId,tech_sections.rating as techRating ,tech_sections.section_id as sectionId from resume_sections left join tech_sections on resume_sections.id = tech_sections.section_id where resume_sections.submission_id=#{submissionId} and tech_sections.user_id=#{userId}")
	public List<Sections> fetchTechSections(@Param("submissionId")int submissionId,@Param("userId") Integer userId);

	@ResultMap(SUBMISSION_RESULT_MAP)
	@Select("Select s.* , j.created_byId as createdBy, j.hiring_user_id as hiringUser from submissions s, jobs j where s.job_id=#{jobId} and s.job_id=j.id  ")
	public Submission fetchTechSubmissionForUserJob(@Param("jobId")int jobId);
	
	@Select("Select id as id, job_id as jobId, submission_id as submissionId, user_id as userId, status as status from submissions_to_tech  where submission_id=#{submissionId} and user_id=#{userId}")
	public TechSubmission fetchTechSubmissionBySubmissionIdAndUserId(@Param("submissionId")int submissionId,@Param("userId") int userId);
	
	@Update("update submissions_to_tech set status=#{status} where submission_id=#{submissionId} and user_id=#{userId}")
	public void updateTechStatus(@Param("submissionId")int submissionId,@Param("userId") int userId, @Param("status") String status);
	
	@Insert("Insert into tech_sections(submission_id,section_id,user_id,rating) values (#{submissionId},#{sectionId},#{userId},#{techRating})")
	public void insertTechSectionRating(@Param("submissionId")int submissionId,@Param("sectionId")int sectionId, @Param("techRating")int techRating,@Param("userId") int userId);
	
	@Select("Select id as id, submission_id as submissionId, user_id as userId,comment as comment,tech_submission_id as techSubmissionId,user_name as userName from tech_comments where tech_submission_id=#{id} order by created_date")
	public List<TechComment> fetchTechCommentsForSubmission(@Param("id") int id);
	
	@Insert("Insert into tech_comments(comment,submission_id,user_id,tech_submission_id,created_date,user_name) values(#{comment},#{submissionId},#{userId},#{techSubmissionId},NOW(),#{userName})")
	public void insertTechComment(@Param("comment")String comment,@Param("submissionId") int submissionId,@Param("userId") int userId,@Param("userName") String userName,@Param("techSubmissionId") int techSubmissionId);
	 
	@Select("Select id as id, job_id as jobId, submission_id as submissionId, user_id as userId, status as status from submissions_to_tech  where id=#{id}")
	public TechSubmission fetchTechSubmissionById(@Param("id")int id);
	
	
	/*@ResultMap(SUBMISSION_RESULT_MAP)
	public List<Submission> fetchSubmissionCountForjobs(@Param("role") int role,@Param("jobs") List<Job> jobs);	
*/
}
