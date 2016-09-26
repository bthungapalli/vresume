package com.siri.vresume.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.siri.vresume.domain.User;
import com.siri.vresume.service.UserService;



@Component
public class CustomUserDetailsService implements UserDetailsService


{
	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String userEmailId)
			throws UsernameNotFoundException {
		User user = userService.getUserDetailsByUserName(userEmailId);
		if(user == null){
			throw new UsernameNotFoundException("UserName "+userEmailId+" not found");
		}
		
		return new SecurityUser(user);
	}
}