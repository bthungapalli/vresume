package com.siri.vresume.controller;

import static com.siri.vresume.constants.VResumeConstants.FAILED;
import static com.siri.vresume.constants.VResumeConstants.SUCCESS;

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
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.siri.vresume.domain.ContactForm;
import com.siri.vresume.domain.User;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.domain.UserHmOrCmDetails;
import com.siri.vresume.domain.UserMapping;
import com.siri.vresume.domain.VerifyToken;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.UserService;

import edu.emory.mathcs.backport.java.util.Collections;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private Map<String, Object> loginMap;

	@Autowired
	private MailUtil mailUtil;

	private final static String REG_CONFIRMATION_LINK = "/registrationConfirmation?token=";

	@Value("${contextPath}")
	private String contextPath;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private final static String REGISTRATION = "/registration";

	@Value("${user.imagesPath}")
	private String imagesPath;

	@RequestMapping(value = REGISTRATION, method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<?> saveUser(@RequestBody User user, HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();
		try {
			userService.saveUser(user);
			updateToken(user, request);
			map.put(SUCCESS, VResumeConstants.REGISTRATION_SUCCESS_LINK);
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
		} catch (Exception e) {
			map.put(FAILED, VResumeConstants.REGISTRATION_ERROR);
			logger.error("Error occured while registration::::", e);
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@RequestMapping(value = "/updateToken", method = RequestMethod.POST)
	public ResponseEntity<?> updateEmailToken(@RequestParam("email") String email, HttpServletRequest request) {
		User user = userService.getUserDetailsByUserName(email);
		Map<String, String> map = new HashMap<>();
		if (!user.isConfirmed()) {
			try {
				updateToken(user, request);
				map.put(SUCCESS, VResumeConstants.REGISTRATION_SUCCESS_LINK);
			} catch (VResumeDaoException | MessagingException e) {
				map.put(FAILED, "Problem while updating the Token. Please try after sometime");
				return new ResponseEntity<Map<String, String>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
		}
		map.put(SUCCESS, "User already confirmed. Please contact admin for more details");
		return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);

	}

	/**
	 * @param user
	 * @param request
	 * @throws VResumeDaoException
	 * @throws MessagingException
	 */
	private void updateToken(User user, HttpServletRequest request) throws VResumeDaoException, MessagingException {

		String token = UUID.randomUUID().toString();
		VerifyToken verifyToken = new VerifyToken(token, user.getRole(), user);
		userService.updateToken(verifyToken);
		//String confirmUrl = contextPath + "/sendRedirect?token=" + token;
		String confirmUrl = contextPath+"/#/registrationConfirmation?token="+token;
		logger.info("Request URL ::"+ confirmUrl);
		mailUtil.sendMail(user, confirmUrl);
	}

	@RequestMapping(value = "/sendRedirect", method = RequestMethod.GET)
	public void sendRedirect(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
		response.sendRedirect(contextPath + "/#/login?token=" + token);
	}

	@RequestMapping(value = "/registration/registrationConfirmation", method = RequestMethod.GET)
	public ResponseEntity<?> confirmRegistration(HttpServletRequest request, @RequestParam("token") String token) {
		Map<String, Object> map = new HashMap<>();
		try {
			VerifyToken verificationToken = userService.verifyToken(token);
			if (verificationToken == null) {
				map.put(FAILED, "USER NOT FOUND");
				return new ResponseEntity<Map<String, Object>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			Calendar cal = Calendar.getInstance();
			if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
				map.put(FAILED, "Token Expired");
				return new ResponseEntity<Map<String, Object>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			if (verificationToken.getRole() == 0) {
				userService.updateConfirmation(Boolean.TRUE, Boolean.TRUE, token);
			} else {
				userService.updateConfirmation(Boolean.TRUE, Boolean.FALSE, token);
			}
			map.put(SUCCESS, VResumeConstants.REGISTRATION_CONFIRMATION_SUCCESS_PHP);
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			map.put(FAILED, vre.getMessage());
			return new ResponseEntity<Map<String, Object>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<?> user(Principal user, HttpServletRequest request) {
		try {
			loginMap = new HashMap<>();
			SecurityUser securityUser = fetchSessionObject();
			if (!securityUser.isConfirmed())
				return new ResponseEntity<List<String>>(
						new ArrayList<String>(
								Arrays.asList("Email Not Confirm. Please verify your email for confirmation link.")),
						HttpStatus.OK);
			if (!securityUser.isVerification())
				return new ResponseEntity<List<String>>(
						new ArrayList<String>(
								Arrays.asList("Account Deactivated . Please contanct Admin to activate your account.")),
						HttpStatus.OK);
			File serverFile = new File(imagesPath + securityUser.getId() + ".jpeg");

			if (serverFile.exists()) {
				securityUser.setImagePath(serverFile.getAbsolutePath());
				securityUser.setProfieImageBytes(IOUtils.toByteArray(new FileInputStream(serverFile)));
			}
			
			if(securityUser.getRole()==1){
				securityUser.setHms(userService.getHmsForUserId(securityUser.getId()));
			}else if(securityUser.getRole()==2){
				securityUser.setCms(userService.getCmsForUserId(securityUser.getId()));
			}
			
			loginMap.put(VResumeConstants.USER_OBJECT, securityUser);
			HttpSession session = request.getSession();
			// session.setMaxInactiveInterval(15*60);
			String sessionId = session.getId();
			session.setAttribute(sessionId, loginMap);
			loginMap.put("JSessionId", sessionId);
			return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("Failed to connect", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/checkUser", method = RequestMethod.GET)
	public ResponseEntity<?> verifyUser(HttpServletRequest request , @RequestParam(name="sessionId" , defaultValue="inApp" ) String sessionId) {
		HttpSession session = request.getSession();
		if (loginMap == null) {
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
		} 
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
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/updateSession", method = RequestMethod.GET)
	public ResponseEntity<?> updateSession(HttpServletRequest request , @RequestParam(name="sessionId" , defaultValue="inApp" ) String sessionId) {
		HttpSession session = request.getSession();
		if (loginMap == null) {
			try {
				loginMap = (Map<String, Object>) session.getAttribute(sessionId);
			} catch (Exception ioe) {
				return new ResponseEntity<String>(VResumeConstants.INVALID_USER, HttpStatus.UNAUTHORIZED);
			}
		}
		return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
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
			
			if(securityUser.getRole()==1){
				securityUser.setHms(userService.getHmsForUserId(securityUser.getId()));
			}else if(securityUser.getRole()==2){
				securityUser.setCms(userService.getCmsForUserId(securityUser.getId()));
			}
			
			map.put(VResumeConstants.USER_OBJECT, securityUser);

			return map;
		} else {
			return (Map<String, Object>) new ResponseEntity<String>(VResumeConstants.INVALID_USER,
					HttpStatus.UNAUTHORIZED);
		}
	}

	@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/activateUser", method = RequestMethod.POST)
	public ResponseEntity<?> activateUser(@RequestParam("username") String userName) {
		try {
			userService.activateUser(userName);
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList(SUCCESS)), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			logger.error("Error occured while activating user ", vre.getMessage());
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList(FAILED)),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/deactivateUser", method = RequestMethod.POST)
	public ResponseEntity<?> deActivateUser(@RequestParam("username") String userName) {
		try {
			userService.deActivateUser(userName);
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList(SUCCESS)), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			logger.error("Error occured while activating user ", vre.getMessage());
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList(FAILED)),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PreAuthorize("hasRole(ADMIN)")
	@RequestMapping(value = "/fetchAllUsers", method = RequestMethod.GET)
	public ResponseEntity<?> fetchUsers(HttpServletRequest request) {
		try {
			return new ResponseEntity<List<User>>(userService.fetchAllUsers(), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			logger.error("Problem while fetching the users :", vre.getMessage());
			return new ResponseEntity<>(FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/byId/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchUserById(@PathVariable("id") int id, HttpServletRequest request) {
		try {
			return new ResponseEntity<UserDetails>(userService.fetchUserById(id), HttpStatus.OK);
		} catch (VResumeDaoException vre) {
			logger.error("Problem while fetching the users :", vre.getMessage());
			return new ResponseEntity<>(FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/forgotPassword", method = RequestMethod.POST)
	public ResponseEntity<?> getNewpassword(@RequestBody String email) throws MessagingException, VResumeDaoException {
		Map<String, String> model = new HashMap<>();
		JSONObject jsonObject = new JSONObject(email);
		String inputEmail = jsonObject.getString("email");
		String registered = userService.getNewPassword(inputEmail);
		if (registered.equalsIgnoreCase("Registed")) {
			model.put("status", "success");
		} else {
			model.put("status", "You are not Registred User");
		}
		return new ResponseEntity<Map<String, String>>(model, HttpStatus.OK);

	}

	@RequestMapping(value = "/changePassword", method = RequestMethod.POST)
	public ResponseEntity<?> changePassword(@RequestBody String password)
			throws VResumeDaoException, MessagingException {
		SecurityUser securityUser = fetchSessionObject();
		Map<String, String> model = new HashMap<>();
		if (securityUser != null) {
			JSONObject jsonObject = new JSONObject(password);
			String newPassword = jsonObject.getString("password");
			userService.updatePassword(securityUser, newPassword);
			model.put("message", "Password Changed successfully");
			return new ResponseEntity<Map<String, String>>(model, HttpStatus.OK);
		}

		model.put("message", "Not registerd User");
		return new ResponseEntity<Map<String, String>>(model, HttpStatus.UNAUTHORIZED);
	}
	
	@RequestMapping(value = "/contactUs", method = RequestMethod.POST)
	public ResponseEntity<?> contactUs(@RequestBody ContactForm contactForm, HttpServletRequest request) {
		try{
			mailUtil.sendContactUs(contactForm);
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	public SecurityUser fetchSessionObject () {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Authentication:::"+authentication.getName());
		try {
			logger.info("Came inside the authentication If loop:::");
			SecurityUser securityUser = (SecurityUser)authentication.getPrincipal();
			return securityUser;
		}catch(ClassCastException e) {
			logger.info("Came inside the Catch Block:::");
			SecurityUser user = (SecurityUser) loginMap.get(VResumeConstants.USER_OBJECT);
				logger.info("User details:::"+user.getEmail()+"::::"+user.getRole());
				authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), authentication.getCredentials().toString(), Collections.emptyList());
		        logger.debug("Logging in with [{}]", authentication.getPrincipal());
		        SecurityContextHolder.getContext().setAuthentication(authentication);
				return new SecurityUser(user);
		}
			
	}
	

	@RequestMapping(value = "/allCms", method = RequestMethod.GET)
	public ResponseEntity<?> allCms( HttpServletRequest request) {
		try{
			return new ResponseEntity<List<User>>(userService.fetchAllCmsUsers(), HttpStatus.OK);
			
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/addCmOrHm", method = RequestMethod.POST)
	public ResponseEntity<?> addCmOrHm(@RequestBody UserHmOrCmDetails  user, HttpServletRequest request,HttpSession session) {
		try{
			HttpSession userSession = request.getSession(false);
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
			SecurityUser securityUser = (SecurityUser) loginMap.get(VResumeConstants.USER_OBJECT);
			UserMapping userMapping=userService.addCmOrHm(user,securityUser);
			return new ResponseEntity<>(userMapping,HttpStatus.OK);
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/removeCmOrHm", method = RequestMethod.POST)
	public ResponseEntity<?> removeCmOrHm(@RequestBody UserHmOrCmDetails  user, HttpServletRequest request) {
		try{
			
			userService.removeCmOrHm(user.getId());
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/existingCms", method = RequestMethod.POST)
	public ResponseEntity<?> existingCms(@RequestBody List<User>  users, HttpServletRequest request,HttpSession session) {
		try{
			HttpSession userSession = request.getSession(false);
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
			SecurityUser securityUser = (SecurityUser) loginMap.get(VResumeConstants.USER_OBJECT);
			List<UserHmOrCmDetails> cms=userService.SaveExistingCms(users,securityUser.getId());
			return new ResponseEntity<>(cms,HttpStatus.OK);
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}

