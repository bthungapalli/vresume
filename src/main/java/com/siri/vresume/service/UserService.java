package com.siri.vresume.service;

import java.security.SecureRandom;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.config.MailUtil;
import com.siri.vresume.config.PasswordManagerUtil;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.dao.UserDao;
import com.siri.vresume.domain.Calender;
import com.siri.vresume.domain.DefaultVideo;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UserHmOrCmDetails;
import com.siri.vresume.domain.UserMapping;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;


@Service
public class UserService {
	@Autowired
	private UserDao userDao;
	
	private static SecureRandom rnd = new SecureRandom();
	
	@Autowired
	private MailUtil mailUtils;

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
public void updateConfirmation(Boolean confirmed, Boolean verified, String token) throws VResumeDaoException {
	userDao.updateConfirmation(confirmed,verified,token) ;
	
}
public List<UserDetails> fetchAllUsers() throws VResumeDaoException {
	return userDao.fetchAllUsers();
}
public UserDetails fetchUserById(Integer userId) throws VResumeDaoException {
	return userDao.fetchUserById(userId);
}

public String getNewPassword(String emailId) throws MessagingException, VResumeDaoException {
	User user =userDao.getUserDetailsByUserName(emailId);
	if(user !=null){
	String newPassword = generateRandomPassword();
	updatePassword(user, newPassword);
	return "Registed";
	}
	else{
		return "Not Registred";
	}
	
}
/**
 * @param user
 * @param newPassword
 * @throws MessagingException 
 */
public void updatePassword(User user, String newPassword) throws VResumeDaoException, MessagingException {
	user.setPassword(encodePassword(newPassword));
	userDao.updatePassword(user);
	mailUtils.forgetPasswordNotifyMail(user,newPassword);
}
	
private String generateRandomPassword() {
	StringBuilder sb = new StringBuilder(VResumeConstants.PASSWORD_SIZE);
	for (int i = 0; i < VResumeConstants.PASSWORD_SIZE; i++)
		sb.append(VResumeConstants.PASSWORD_AB.charAt(rnd
				.nextInt(VResumeConstants.PASSWORD_AB.length())));
	return sb.toString();
}
public List<UserHmOrCmDetails> getCmsForUserId(int id) {
	return userDao.getCmsForUserId(id);
}
public List<UserHmOrCmDetails> getHmsForUserId(int id) {
	return userDao.getHmsForUserId(id);
}
public List<User> fetchAllCmsUsers() {
	return userDao.fetchAllCmsUsers();
}
public void removeCmOrHm(int id) {
	 userDao.removeCmOrHm(id);
}
@Transactional
public UserMapping addCmOrHm(UserHmOrCmDetails userHmOrCmDetails, SecurityUser securityUser) throws MessagingException {
	
	User user = new User();
	user.setEmail(userHmOrCmDetails.getEmail());
	user.setRole(userHmOrCmDetails.getRole());
	user.setVerification(true);
	user.setConfirmed(true);
	user.setRole(userHmOrCmDetails.getRole());
	String password=PasswordManagerUtil.random_Password().toString();
	user.setPassword(password);
	this.saveUser(user);
	User createdUser=userDao.getUserDetailsByEmail(userHmOrCmDetails.getEmail());
	
	UserMapping userMapping = new UserMapping();
	userMapping.setCreated_by(securityUser.getId());
	userMapping.setUser(createdUser.getId());
	userDao.saveUserMapping(securityUser.getId(),createdUser.getId());
	int userMappingId=userDao.getIdForUserMapping(securityUser.getId(),createdUser.getId());
	userMapping.setId(userMappingId);
	user.setPassword(password);
	mailUtils.sendCmOrHmMail(user,securityUser);
	return userMapping;
}

public List<UserHmOrCmDetails> SaveExistingCms(List<User> users, int userId) {
	for(User user:users){
		userDao.saveUserMapping(userId,user.getId());
	}
	return userDao.getCmsForUserId(userId);
}
public void uplaodDefaultVideo(DefaultVideo defaultVideo) {
	 userDao.uplaodDefaultVideo(defaultVideo);
}
public int getLatestDefaultVideo(int userId, String videoTitle) {
	return userDao.getLatestDefaultVideo(userId,videoTitle);
}
public List<DefaultVideo> getDefaultVideos(int userId) {
	return userDao.getDefaultVideos(userId);
}
public void deleteDefaultVideo(int id) {
	userDao.deleteDefaultVideo(id);
}
public List<Calender> getCalender(SecurityUser securityUser) {
	if(securityUser.getRole()==0){
		return userDao.getUserCalender(securityUser.getId());
	}else if(securityUser.getRole()==1){
		return userDao.getCmCalender(securityUser.getId());
	}else {
		return userDao.getHmCalender(securityUser.getId());
	}
}
public List<UserHmOrCmDetails> getTechUsersForUserId(int id) {
	return userDao.getTechUsersForUserId(id);
}

public User fetchUserDetailsById(int id) throws VResumeDaoException{
	return userDao.fetchUserDetailsById(id);
}
}
