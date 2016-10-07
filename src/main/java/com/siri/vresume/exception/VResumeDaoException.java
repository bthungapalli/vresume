package com.siri.vresume.exception;

public class VResumeDaoException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 891974064459113952L;
	public VResumeDaoException(){
		
	}
	public VResumeDaoException(String message){
		super(message);
	}
	
	public VResumeDaoException(String message, Throwable cause) {
        super(message, cause);
    }
	 public VResumeDaoException(Throwable cause) {
	        super(cause);
	    }
}
