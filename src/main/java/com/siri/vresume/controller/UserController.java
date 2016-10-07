package com.siri.vresume.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.siri.vresume.config.MailUtil;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private Map<String, Object> loginMap;

	@Autowired
	private MailUtil mailUtil;
	
	private final static String REG_CONFIRMATION_LINK ="/registrationConfirmation?token=";

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Value("${user.imagesPath}")
	private String imagesPath;

	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<?> saveUser(@RequestBody User user, HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();
		try {
			userService.saveUser(user);
			String token = UUID.randomUUID().toString();
			VerifyToken verifyToken = new VerifyToken(token,user.getRole(), user);
			userService.updateToken(verifyToken);
			String confirmUrl = request.getRequestURL() + REG_CONFIRMATION_LINK + token;
			mailUtil.sendMail(user, confirmUrl);
			map.put("success", VResumeConstants.REGISTRATION_SUCCESS_LINK);
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.put("error", VResumeConstants.REGISTRATION_ERROR);
			logger.error("Error occured while registration::::", e);
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@RequestMapping(value = "/registration/registrationConfirmation", method = RequestMethod.GET)
	public ResponseEntity<?> confirmRegistration(HttpServletRequest request, @RequestParam("token") String token) {
		Map<String, Object> map = new HashMap<>();
		try {
			VerifyToken verificationToken = userService.verifyToken(token);
			if (verificationToken == null) {
				map.put("Error", "Token Expired");
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
			Calendar cal = Calendar.getInstance();
			if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
				map.put("Error", "Token Expired");
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
			if(verificationToken.getRole()==0){
			userService.updateConfirmation(Boolean.TRUE,Boolean.TRUE,token);
			}else{
				userService.updateConfirmation(Boolean.TRUE,Boolean.FALSE, token);
			}
			map.put("Success", VResumeConstants.REGISTRATION_CONFIRMATION_SUCCESS);
			return new ResponseEntity<>(map, HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			map.put("Error", vre.getMessage());
			return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<?> user(Principal user, HttpServletRequest request) {
		loginMap = new HashMap<>();
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		if(!securityUser.isConfirmed()) return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("Email Not Confirm. Please verify your email for confirmation link.")),
				HttpStatus.OK);
		if(!securityUser.isVerification()) return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("Account Deactivated . Please contanct Admin to activate your account.")),
				HttpStatus.OK);
		File serverFile = new File(imagesPath + securityUser.getId() + ".jpeg");
		try {
			if (serverFile.exists()) {
				securityUser.setImagePath(serverFile.getAbsolutePath());
				securityUser.setProfieImageBytes(IOUtils.toByteArray(new FileInputStream(serverFile)));
			}
			loginMap.put(VResumeConstants.USER_OBJECT, securityUser);
			HttpSession session = request.getSession();
			// session.setMaxInactiveInterval(15*60);
			session.setAttribute(session.getId(), loginMap);
			return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
		} catch (IOException ioe) {
			return new ResponseEntity<String>(ioe.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/checkUser", method = RequestMethod.GET)
	public ResponseEntity<?> verifyUser(HttpServletRequest request) {
		HttpSession session = request.getSession();
		loginMap = (Map<String, Object>) session.getAttribute(session.getId());
		if (loginMap != null) {
			try {
				SecurityUser securityUser = (SecurityUser) loginMap.get(VResumeConstants.USER_OBJECT);
				File serverFile = new File(imagesPath + securityUser.getId() + ".jpeg");
				if (serverFile.exists()) {
					securityUser.setProfieImageBytes(IOUtils.toByteArray(new FileInputStream(serverFile)));
				}
				loginMap.put(VResumeConstants.USER_OBJECT, securityUser);
				return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
			} catch (IOException ioe) {
				return new ResponseEntity<String>(ioe.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseEntity<String>(VResumeConstants.INVALID_USER, HttpStatus.UNAUTHORIZED);
		}
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		loginMap = null;
		return new ResponseEntity<Object>(null, HttpStatus.OK);
	}

	@RequestMapping(value = "/emailValidation", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> validateEmail(@RequestParam String emailId) {
		if (userService.validateEmail(emailId) > 0) {
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("alreadyExist")),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("newEmailId")), HttpStatus.OK);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateProfile(@ModelAttribute User userdetails, HttpServletRequest request,
			HttpSession session) throws MessagingException, IOException {
		HttpSession userSession = request.getSession(false);
		if (userSession != null) {
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
			SecurityUser securityUser = (SecurityUser) loginMap.get(VResumeConstants.USER_OBJECT);
			userdetails.setId(securityUser.getId());
			userdetails.setEmail(securityUser.getEmail());
			Map<String, Object> map = new HashMap<>();
			if (userdetails.getProfileImage() != null) {
				MultipartFile file = userdetails.getProfileImage();
				if (!file.isEmpty() && file.getContentType().equals("image/jpeg")
						|| file.getContentType().equals("image/png") || file.getContentType().equals("image/jpg")) {
					String imageFilePath = imagesPath + securityUser.getId() + ".jpeg";
					File serverFile = new File(imageFilePath);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					byte[] fileBytes = file.getBytes();
					stream.write(fileBytes);
					stream.close();
					userdetails.setImagePath(imageFilePath);
					userdetails.setProfieImageBytes(fileBytes);
				}
			}
			userService.updateUser(userdetails);
			securityUser = new SecurityUser(userdetails);
			securityUser.setProfieImageBytes(userdetails.getProfieImageBytes());

			map.put(VResumeConstants.USER_OBJECT, securityUser);

			return map;
		} else {
			return (Map<String, Object>) new ResponseEntity<String>(VResumeConstants.INVALID_USER, HttpStatus.UNAUTHORIZED);
		}
	}

	@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/activateUser", method = RequestMethod.POST)
	public ResponseEntity<?> activateUser(@RequestParam("username") String userName) {
		try {
			userService.activateUser(userName);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			return new ResponseEntity<>("failed " + vre.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/deactivateUser", method = RequestMethod.POST)
	public ResponseEntity<?> deActivateUser(@RequestParam("username") String userName) {
		try {
			userService.deActivateUser(userName);
			return new ResponseEntity<>("success", HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			return new ResponseEntity<>("failed " + vre.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/fetchAllUsers", method = RequestMethod.GET)
	public ResponseEntity<?> fetchUsers(HttpServletRequest request) {
		try {
			return new ResponseEntity<List<User>>(userService.fetchAllUsers(), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			return new ResponseEntity<>("failed " + vre.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
