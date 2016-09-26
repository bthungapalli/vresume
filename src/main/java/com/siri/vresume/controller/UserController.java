package com.siri.vresume.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.domain.User;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	private Map<String, Object> loginMap;

	private final static String USER_OBJECT = "user";

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Value("${user.imagesPath}")
	private String imagesPath;

	@RequestMapping(value = "/registration", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<?> saveUser(@RequestBody User user, HttpServletRequest request) {
		try {
			userService.saveUser(user);
			User regUser = userService.getUserDetailsByUserName(user.getUserName());
			loginMap = new HashMap<>();
			loginMap.put(USER_OBJECT, new SecurityUser(regUser));
			HttpSession session = request.getSession();
			session.setAttribute(session.getId(), loginMap);
			return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("Error occured while registration::::", e);
			return new ResponseEntity<String>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ResponseEntity<?> user(Principal user, HttpServletRequest request) throws IOException {
		loginMap = new HashMap<>();
		SecurityUser securityUser = (SecurityUser) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		File serverFile = new File(imagesPath + securityUser.getUserId() + ".jpeg");
		if (serverFile.exists()) {
			securityUser.setUserImagePath(IOUtils.toByteArray(new FileInputStream(serverFile)));
		}
		loginMap.put(USER_OBJECT, securityUser);
		HttpSession session = request.getSession();
		// session.setMaxInactiveInterval(15*60);
		session.setAttribute(session.getId(), loginMap);
		return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
	}

	@RequestMapping(value = "/checkUser", method = RequestMethod.GET)
	public ResponseEntity<?> verifyUser(HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
			if (loginMap != null) {
				SecurityUser securityUser = (SecurityUser) loginMap.get("user");
				File serverFile = new File(imagesPath + securityUser.getUserId() + ".jpeg");
				if (serverFile.exists()) {
					securityUser.setUserImagePath(IOUtils.toByteArray(new FileInputStream(serverFile)));
				}
				loginMap.put(USER_OBJECT, securityUser);
				return new ResponseEntity<Map<String, Object>>(loginMap, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Invalid User", HttpStatus.UNAUTHORIZED);
			}
		} catch (IOException age) {
			return new ResponseEntity<String>("Error Occured", HttpStatus.INTERNAL_SERVER_ERROR);
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
			;
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("alreadyExist")),
					HttpStatus.OK);
		} else {
			return new ResponseEntity<List<String>>(new ArrayList<String>(Arrays.asList("newEmailId")), HttpStatus.OK);
		}
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/updateProfile", method = RequestMethod.POST)
	public Map<String, Object> updateProfile(@ModelAttribute User userdetails, HttpServletRequest request,
			HttpSession session) throws MessagingException, IOException {
		HttpSession userSession = request.getSession(false);
		if (userSession != null) {
			loginMap = (Map<String, Object>) session.getAttribute(session.getId());
			SecurityUser securityUser = (SecurityUser) loginMap.get("user");
			userdetails.setUserId(securityUser.getUserId());
			Map<String, Object> map = new HashMap<>();
			if (userdetails.getUploadImage() != null) {
				MultipartFile file = userdetails.getUploadImage();
				if (!file.isEmpty() && file.getContentType().equals("image/jpeg")
						|| file.getContentType().equals("image/png") || file.getContentType().equals("image/jpg")) {
					File serverFile = new File(imagesPath + securityUser.getUserId() + ".jpeg");
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					stream.write(file.getBytes());
					stream.close();
					securityUser.setUserImagePath(file.getBytes());
					// securityUser.setUploadImage(file);
					// userdetails.setUserImagePath(file.getBytes());

				}
			}

			userService.updateUser(userdetails);
			securityUser.setName(userdetails.getName());
			securityUser.setCity(userdetails.getCity());
			securityUser.setState(userdetails.getState());
			securityUser.setZipcode(userdetails.getZipcode());
			map.put(USER_OBJECT, securityUser);

			return map;
		} else {
			return (Map<String, Object>) new ResponseEntity<String>("Invalid User", HttpStatus.UNAUTHORIZED);
		}
	}

}
