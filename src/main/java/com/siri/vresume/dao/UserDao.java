package com.siri.vresume.dao;

import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.User;
import com.siri.vresume.exception.VResumeDaoException;


@Repository
public interface UserDao {

	public User getUserDetailsByUserName (String username);

	
	public void saveUser(User user);

	public int validateEmail(String emailId);
	public void updateUser(User user);


	public void activateUser(String userName) throws VResumeDaoException;


	public void deActivateUser(String userName)throws VResumeDaoException;
	
}
