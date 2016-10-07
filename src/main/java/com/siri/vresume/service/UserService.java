package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;


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
public void activateUser(String userName) throws VResumeDaoException {
	userDao.activateUser(userName);
	
}
public void deActivateUser(String userName) throws VResumeDaoException{
	userDao.deActivateUser(userName);
	
}
public void updateToken(VerifyToken verifyToken) throws VResumeDaoException {
	userDao.updateToken(verifyToken);
}
public VerifyToken verifyToken(String token) throws VResumeDaoException {
	return userDao.verifyToken(token);
}
public void updateConfirmation(Boolean confirmed, String token) throws VResumeDaoException {
	userDao.updateConfirmation(confirmed,token) ;
	
}
public List<User> fetchAllUsers() throws VResumeDaoException {
	return userDao.fetchAllUsers();
}
	
}
