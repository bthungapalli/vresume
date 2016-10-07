package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.User;
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

	@Select("Select * from users")
	public List<User> fetchAllUsers()throws VResumeDaoException;
	
}
