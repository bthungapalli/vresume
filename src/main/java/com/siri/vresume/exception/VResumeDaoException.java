package com.siri.vresume.exception;

public class VResumeDaoException extends Exception{

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
