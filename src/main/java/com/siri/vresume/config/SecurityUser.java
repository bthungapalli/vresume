package com.siri.vresume.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.siri.vresume.domain.User;

public class SecurityUser extends User implements UserDetails {

	private static final long serialVersionUID = 1L;

	public SecurityUser(User user) {
		if (user != null) {
			this.setId(user.getId());
			this.setEmail(user.getEmail());
			this.setRole(user.getRole());
			this.setPassword(user.getPassword());
			//this.setImagePath(user.getImagePath());
		}
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		//TODO [Bharani] : Update the user roles.
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(
				verifyUserRole());
				
		authorities.add(authority);
		return authorities;
	}

/*	
 * TODO [Bharani] : Update the User Roles.
 * 
 */
	private String verifyUserRole() {
		switch (this.getRole()) {
		case 0:
			return "ROLE_CANDIDATE";
		case 1:
			return "ROLE_COMPANY";
		case 2:
			return "ROLE_MGR";
		default:
			return "ROLE_ADMIN";
		}
	}
	
	
	
	@Override
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	public String getUsername() {
		return super.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}