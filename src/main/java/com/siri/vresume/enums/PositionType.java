package com.siri.vresume.enums;

public enum PositionType {
	Contract(0), Permanent(1);

	private int positionType;

	PositionType(int positionType) {
		this.positionType = positionType;
	}

	public int getPositionType() {
		return this.positionType;
	}
}
