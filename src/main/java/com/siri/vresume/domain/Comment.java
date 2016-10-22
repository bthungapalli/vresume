/**
 * 
 */
package com.siri.vresume.domain;

import org.springframework.data.annotation.Id;

/**
 * @author bthungapalli
 *
 */
public class Comment extends DateTimeVars {

	@Id
	private int commentId;
	
	private int userId;
	private int submissionId;
	private String comment;
	private String commentedBy;

	
	/**
	 * @return the commentId
	 */
	public int getCommentId() {
		return commentId;
	}

	/**
	 * @param commentId
	 *            the commentId to set
	 */
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	/**
	 * @return the submissionId
	 */
	public int getSubmissionId() {
		return submissionId;
	}

	/**
	 * @param submissionId
	 *            the submissionId to set
	 */
	public void setSubmissionId(int submissionId) {
		this.submissionId = submissionId;
	}

	/**
	 * @return the comment
	 */
	public String getComment() {
		return comment;
	}

	/**
	 * @param comment
	 *            the comment to set
	 */
	public void setComment(String comment) {
		this.comment = comment;
	}

	/**
	 * @return the commentedBy
	 */
	public String getCommentedBy() {
		return commentedBy;
	}

	/**
	 * @param commentedBy the commentedBy to set
	 */
	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
	}

	/**
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}

}
