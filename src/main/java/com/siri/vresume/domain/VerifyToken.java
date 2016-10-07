package com.siri.vresume.domain;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

import org.springframework.data.annotation.Id;

public class VerifyToken {
	  private static final int EXPIRATION = 60 * 24;
	
	@Id
    private Long id;
     
    private String token;
    private User user;
     
    private Date expiryDate;
    private int role;
    
 
    public VerifyToken() {
        super();
    }
    public VerifyToken(String token, int role,User user) {
        super();
        this.token = token;
        this.setRole(role);
        this.user = user;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }
     
    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * @return the token
	 */
	public String getToken() {
		return token;
	}
	/**
	 * @param token the token to set
	 */
	public void setToken(String token) {
		this.token = token;
	}
	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}
	/**
	 * @return the expiryDate
	 */
	public Date getExpiryDate() {
		return expiryDate;
	}
	/**
	 * @param expiryDate the expiryDate to set
	 */
	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
	/**
	 * @return the role
	 */
	public int getRole() {
		return role;
	}
	/**
	 * @param role the role to set
	 */
	public void setRole(int role) {
		this.role = role;
	}
	
}
