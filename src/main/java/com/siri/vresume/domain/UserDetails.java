/**
 * 
 */
package com.siri.vresume.domain;

import java.io.Serializable;

/**
 * @author bthungapalli
 *
 */
public class UserDetails implements Serializable  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String userId;
	private String email;
	private String firstName;
	private String lastName;
	private String currentEmployer;
	private String contactNo;
	private int mailAccount;
	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}
	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}
	/**
	 * @return the firstName
	 */
	public String getFirstName() {
		return firstName;
	}
	/**
	 * @param firstName the firstName to set
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}
	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	/**
	 * @return the currentEmployer
	 */
	public String getCurrentEmployer() {
		return currentEmployer;
	}
	/**
	 * @param currentEmployer the currentEmployer to set
	 */
	public void setCurrentEmployer(String currentEmployer) {
		this.currentEmployer = currentEmployer;
	}
	/**
	 * @return the contactNo
	 */
	public String getContactNo() {
		return contactNo;
	}
	/**
	 * @param contactNo the contactNo to set
	 */
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	/**
	 * @return the mailAccount
	 */
	public int getMailAccount() {
		return mailAccount;
	}
	/**
	 * @param mailAccount the mailAccount to set
	 */
	public void setMailAccount(int mailAccount) {
		this.mailAccount = mailAccount;
	}
	
}
