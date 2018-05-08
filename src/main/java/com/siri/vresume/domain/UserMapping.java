package com.siri.vresume.domain;

import org.springframework.data.annotation.Id;

public class UserMapping {

	@Id
	private int id;
	private int created_by;
	private int user;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCreated_by() {
		return created_by;
	}
	public void setCreated_by(int created_by) {
		this.created_by = created_by;
	}
	public int getUser() {
		return user;
	}
	public void setUser(int user) {
		this.user = user;
	}
	
	
}
