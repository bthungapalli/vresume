/**
 * 
 */
package com.siri.vresume.domain;

import java.io.Serializable;
import java.util.List;

/**
 * @author bthungapalli
 *
 */
public class UsersSubmission implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 539442393762020703L;

	/**
	 * @return the users
	 */
	public List<UserDetails> getUsers() {
		return users;
	}
	/**
	 * @param users the users to set
	 */
	public void setUsers(List<UserDetails> users) {
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
	/**
	 * @return the statusCounts
	 */
	public List<StatusCounts> getStatusCounts() {
		return statusCounts;
	}
	/**
	 * @param statusCounts the statusCounts to set
	 */
	public void setStatusCounts(List<StatusCounts> statusCounts) {
		this.statusCounts = statusCounts;
	}
	private List<UserDetails> users;
	private Submission submmision;
	
	private List<StatusCounts> statusCounts;
	
}
