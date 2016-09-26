package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.User;


@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Transactional
	public void saveUser(User user) {
		String password = encodePassword(user.getPassword());
		user.setPassword(password);
		userDao.saveUser(user);

	}
	@Transactional
	public User getUserDetailsByUserName(String userName){
		return userDao.getUserDetailsByUserName(userName);
	}
	
	private String encodePassword(String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(password);
		return hashedPassword;
	}
	
	public int validateEmail(String emailId) {
		return userDao.validateEmail(emailId);
	}
	
	

@Transactional
	public void updateUser(User user){
		userDao.updateUser(user);
		
	}
	
}
