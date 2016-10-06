package com.siri.vresume.domain;

import org.springframework.data.annotation.Id;
import org.springframework.web.multipart.MultipartFile;

public class User extends DateTimeVars {

	@Id
	private int id;
	
	private String email;
	private String password;
	private int role;
	private String firstName;
	private String middleName;
	private String lastName;
	private String phone;
	private String location;
	private String currentJobTitle;
	private String currentEmployer;
	private String experience;
	private int currentSalary;
	private int expectedSalary;
	private String primarySkills;
	private String secondarySkills;
	private String prefredLocations;
	private int jobType;
	private String workAuthorization;
	private String imagePath;
	private byte[] profieImageBytes;
	
	
	private boolean confirmed = false;

	
	private MultipartFile profileImage;
	
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
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
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
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
	 * @return the middleName
	 */
	public String getMiddleName() {
		return middleName;
	}
	/**
	 * @param middleName the middleName to set
	 */
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
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
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}
	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	/**
	 * @return the currentJobTitle
	 */
	public String getCurrentJobTitle() {
		return currentJobTitle;
	}
	/**
	 * @param currentJobTitle the currentJobTitle to set
	 */
	public void setCurrentJobTitle(String currentJobTitle) {
		this.currentJobTitle = currentJobTitle;
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
	 * @return the experience
	 */
	public String getExperience() {
		return experience;
	}
	/**
	 * @param experience the experience to set
	 */
	public void setExperience(String experience) {
		this.experience = experience;
	}
	/**
	 * @return the currentSalary
	 */
	public int getCurrentSalary() {
		return currentSalary;
	}
	/**
	 * @param currentSalary the currentSalary to set
	 */
	public void setCurrentSalary(int currentSalary) {
		this.currentSalary = currentSalary;
	}
	/**
	 * @return the expectedSalary
	 */
	public int getExpectedSalary() {
		return expectedSalary;
	}
	/**
	 * @param expectedSalary the expectedSalary to set
	 */
	public void setExpectedSalary(int expectedSalary) {
		this.expectedSalary = expectedSalary;
	}
	/**
	 * @return the primarySkills
	 */
	public String getPrimarySkills() {
		return primarySkills;
	}
	/**
	 * @param primarySkills the primarySkills to set
	 */
	public void setPrimarySkills(String primarySkills) {
		this.primarySkills = primarySkills;
	}
	/**
	 * @return the secondarySkills
	 */
	public String getSecondarySkills() {
		return secondarySkills;
	}
	/**
	 * @param secondarySkills the secondarySkills to set
	 */
	public void setSecondarySkills(String secondarySkills) {
		this.secondarySkills = secondarySkills;
	}
	/**
	 * @return the prefredLocations
	 */
	public String getPrefredLocations() {
		return prefredLocations;
	}
	/**
	 * @param prefredLocations the prefredLocations to set
	 */
	public void setPrefredLocations(String prefredLocations) {
		this.prefredLocations = prefredLocations;
	}
	/**
	 * @return the jobType
	 */
	public int getJobType() {
		return jobType;
	}
	/**
	 * @param jobType the jobType to set
	 */
	public void setJobType(int jobType) {
		this.jobType = jobType;
	}
	/**
	 * @return the workAuthorization
	 */
	public String getWorkAuthorization() {
		return workAuthorization;
	}
	/**
	 * @param workAuthorization the workAuthorization to set
	 */
	public void setWorkAuthorization(String workAuthorization) {
		this.workAuthorization = workAuthorization;
	}
	/**
	 * @return the imagePath
	 */
	public String getImagePath() {
		return imagePath;
	}
	/**
	 * @param imagePath the imagePath to set
	 */
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	/**
	 * @return the profileImage
	 */
	public MultipartFile getProfileImage() {
		return profileImage;
	}
	/**
	 * @param profileImage the profileImage to set
	 */
	public void setProfileImage(MultipartFile profileImage) {
		this.profileImage = profileImage;
	}
	/**
	 * @return the profieImageBytes
	 */
	public byte[] getProfieImageBytes() {
		return profieImageBytes;
	}
	/**
	 * @param profieImageBytes the profieImageBytes to set
	 */
	public void setProfieImageBytes(byte[] profieImageBytes) {
		this.profieImageBytes = profieImageBytes;
	}
	/**
	 * @return the confirmed
	 */
	public boolean isConfirmed() {
		return confirmed;
	}
	/**
	 * @param confirmed the confirmed to set
	 */
	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}
	
	
}
