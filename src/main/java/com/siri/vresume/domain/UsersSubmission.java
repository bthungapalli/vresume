/**
 * 
 */
package com.siri.vresume.domain;

import java.util.List;

/**
 * @author bthungapalli
 *
 */
public class UsersSubmission {

	/**
	 * @return the users
	 */
	public List<User> getUsers() {
		return users;
	}
	/**
	 * @param users the users to set
	 */
	public void setUsers(List<User> users) {
		this.users = users;
	}
	/**
	 * @return the submmision
	 */
	public Submission getSubmmision() {
		return submmision;
	}
	/**
	 * @param submmision the submmision to set
	 */
	public void setSubmmision(Submission submmision) {
		this.submmision = submmision;
	}
	private List<User> users;
	private Submission submmision;
	
	
}
