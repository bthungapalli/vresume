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
			this.setImagePath(user.getImagePath());
			this.setFirstName(user.getFirstName());
			this.setLastName(user.getLastName());
			this.setMiddleName(user.getMiddleName());
			this.setPhone(user.getPhone());
			this.setCurrentJobTitle(user.getCurrentJobTitle());
			this.setCurrentEmployer(user.getCurrentEmployer());
			this.setCurrentSalary(user.getCurrentSalary());
			this.setExpectedSalary(user.getExpectedSalary());
			this.setExperience(user.getExperience());
			this.setJobType(user.getJobType());
			this.setLocation(user.getLocation());
			this.setPrefredLocations(user.getPrefredLocations());
			this.setPrimarySkills(user.getPrimarySkills());
			this.setSecondarySkills(user.getSecondarySkills());
			this.setUpdatedAt(user.getUpdatedAt());
			this.setCreatedAt(user.getCreatedAt());
			this.setConfirmed(user.isConfirmed());
			this.setVerification(user.isVerification());
			
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
		case 3 :
			return "ROLE_ADMIN";
		default:
			return "ROLE_INVALID";
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