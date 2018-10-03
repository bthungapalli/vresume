package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Calender;
import com.siri.vresume.domain.DefaultVideo;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UserHmOrCmDetails;
import com.siri.vresume.domain.UserMapping;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;


@Component
public interface UserDao {

	public User getUserDetailsByUserName (String username);

	
	public void saveUser(User user);

	public int validateEmail(String emailId);
	public void updateUser(User user);


	public void activateUser(String userName) throws VResumeDaoException;


	public void deActivateUser(String userName)throws VResumeDaoException;


	public void updateToken(VerifyToken verifyToken) throws VResumeDaoException;

	@Select("Select * from users where token=#{token}")
	public VerifyToken verifyToken(String token) throws VResumeDaoException;


	@Update("Update users set confirmed=#{confirmed} , verification=#{verified} where token =#{token}")
	public void updateConfirmation(@Param("confirmed") Boolean confirmed, @Param("verified") Boolean verified, @Param("token") String token)throws VResumeDaoException;

	@Select("Select * from users where role != 3")
	public List<User> fetchAllUsers()throws VResumeDaoException;

	@Select("<script>Select id as userId,firstName,lastName,email,currentEmployer , phone as contactNo , mailAccount from users where id in <foreach item='item' collection='userIds' open='(' separator=',' close=')'>#{item}</foreach></script>")
	public List<UserDetails> fetchUserByIds(@Param("userIds") List<Integer> userIds) throws VResumeDaoException;
	
	@Select("Select id as userId,firstName,lastName,email,currentEmployer , phone as contactNo , mailAccount,role from users where id = #{userId}")
	public UserDetails fetchUserById(@Param("userId") Integer userId) throws VResumeDaoException;

	@Update("update users set password=#{user.password} , updated_at=NOW() where email=#{user.email}")
	public void updatePassword(@Param("user") User user);

	@Select("Select um.id as id, u.email as email , u.role as role from user_mapping um INNER JOIN users u ON um.user=u.id WHERE um.created_by=#{userId} AND u.role=1")
	public List<UserHmOrCmDetails> getCmsForUserId(@Param("userId")int userId);

	@Select("Select um.id as id, u.email as email , u.role as role from user_mapping um INNER JOIN users u ON um.user=u.id WHERE um.created_by=#{userId} AND u.role=2")
	public List<UserHmOrCmDetails> getHmsForUserId(@Param("userId")int userId);

	@Select("Select * from users where role = 1")
	public List<User> fetchAllCmsUsers();

	@Delete("delete from user_mapping where id=#{id}")
	public void removeCmOrHm(@Param("id") int id);
	
	@Select("Select * from  users where email=#{email}")
	public User getUserDetailsByEmail(@Param("email") String email);

	@Insert("INSERT INTO user_mapping (created_by, user) VALUES (#{created_by},#{user})")
	public void saveUserMapping(@Param("created_by") int created_by,@Param("user")  int user);

	@Select("Select id from user_mapping where created_by=#{created_by} and user=#{user}")
	public int getIdForUserMapping(@Param("created_by") int created_by,@Param("user") int user);

	@Insert("INSERT INTO user_videos (userId, videoTitle,filePath,fileName) VALUES (#{userId},#{videoTitle},#{defaultVideoPath},#{fileName})")
	public void uplaodDefaultVideo(DefaultVideo defaultVideo);

	@Select("select id from user_videos where userId=#{userId} and videoTitle=#{videoTitle} order by id desc limit  1")
	public int getLatestDefaultVideo(@Param("userId") int userId,@Param("videoTitle") String videoTitle);

	@Select("select id as id , userId as userId ,videoTitle as videoTitle,filePath as defaultVideoPath,fileName as fileName from user_videos where userId=#{userId}")
	public List<DefaultVideo> getDefaultVideos(@Param("userId") int userId);

	@Delete("delete from user_videos where id=#{id}")
	public void deleteDefaultVideo(@Param("id")int id);

	@Select("select * from jobs j JOIN submissions s ON j.id=s.job_id JOIN selected_availabilites sa ON s.id=sa.submissionId  JOIN available_times avl ON sa.availabilityId=avl.id where s.user_id=#{id} and avl.accept=1")
	public List<Calender> getUserCalender(@Param("id") int id);

	@Select("select * from jobs j JOIN submissions s ON j.id=s.job_id JOIN selected_availabilites sa ON s.id=sa.submissionId  JOIN available_times avl ON sa.availabilityId=avl.id where j.created_byId=#{id}")
	public List<Calender> getCmCalender(@Param("id") int id);

	@Select("select * from jobs j JOIN submissions s ON j.id=s.job_id JOIN selected_availabilites sa ON s.id=sa.submissionId  JOIN available_times avl ON sa.availabilityId=avl.id where j.hiring_user_id=#{id}")
	public List<Calender> getHmCalender(@Param("id") int id);

	@Select("Select um.user as id, u.email as email , u.role as role from user_mapping um INNER JOIN users u ON um.user=u.id WHERE um.created_by=#{userId} AND u.role=8")
	public List<UserHmOrCmDetails> getTechUsersForUserId(@Param("userId") int id);
	
	@Select("Select id as id,firstName,lastName,email,currentEmployer , phone as phone , mailAccount,role from users where id = #{userId}")
	public User fetchUserDetailsById(@Param("userId") int userId) throws VResumeDaoException;
}
