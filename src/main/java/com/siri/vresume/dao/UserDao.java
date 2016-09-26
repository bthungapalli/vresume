package com.siri.vresume.dao;

import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.User;


@Repository
public interface UserDao {

	public User getUserDetailsByUserName (String username);

	
	public void saveUser(User user);

	public int validateEmail(String emailId);
	public void updateUser(User user);
	
}
