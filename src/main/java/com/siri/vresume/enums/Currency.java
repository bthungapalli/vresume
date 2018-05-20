package com.siri.vresume.enums;

public enum Currency {
	Euro("Euro"),
	Dollar("Dollar"),
	Pound("Pound");
	
	private String curreny;

	Currency(String curreny) {
		this.curreny = curreny;
	}

	public String getCurrency() {
		return this.curreny;
	}
}
