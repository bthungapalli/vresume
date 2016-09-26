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
			this.setUserName(user.getUserName());
			this.setName(user.getName());
			this.setUserId(user.getUserId());
			this.setPassword(user.getPassword());
			this.setUsertype(user.getUsertype());
			this.setUsertypeid(user.getUsertypeid());
			this.setIsAdmin(user.getIsAdmin());
			this.setCity(user.getCity());
			this.setState(user.getState());
			this.setCountry(user.getCountry());
			this.setZipcode(user.getZipcode());
			this.setUserImagePath(user.getUserImagePath());
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
	private String verifyUserRole(){
		return this.getIsAdmin() == 1 ? "ROLE_ADMIN":"ROLE_USER";
	}
	
	
	
	@Override
	public String getPassword() {
		return super.getPassword();
	}

	@Override
	public String getUsername() {
		return super.getUserName();
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