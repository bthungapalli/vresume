package com.siri.vresume.enums;

public enum DiverseType {

	Women("Women"), Veterian("Veterian"), Hispanic("Hispanic"), LGBT("LGBT");

	private String diverseType;

	DiverseType(String diverseType) {
		this.diverseType = diverseType;
	}

	public String getDiverseType() {
		return this.diverseType;
	}
}
