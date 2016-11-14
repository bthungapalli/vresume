package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;


@Repository
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

	@Select("<script>Select id as userId,firstName,lastName,email,currentEmployer , phone as contactNo from users where id in <foreach item='item' collection='userIds' open='(' separator=',' close=')'>#{item}</foreach></script>")
	public List<UserDetails> fetchUserByIds(@Param("userIds") List<Integer> userIds) throws VResumeDaoException;

	@Update("update users set password=#{user.password} , updated_at=NOW() where email=#{user.email}")
	public void updatePassword(@Param("user") User user);
	
}
