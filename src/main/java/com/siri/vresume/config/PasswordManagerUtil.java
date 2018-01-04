/*package com.siri.vresume.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

public class PasswordManagerUtil {
	 public static String encryptPassword(){
		 StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
			encryptor.setPassword("VR0123");
			String encryptedText1=encryptor.encrypt("Vr3$um3");
			System.out.println(encryptedText1);
			return encryptedText1;
	 }
	/*public static String decryptPassword(String encryptedText,String secretCode){
		StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
		encryptor.setPassword("VR0123");
		String encryptedText1=encryptor.encrypt("Vr3$um3");
		System.out.println(encryptedText1);
		   StandardPBEStringEncryptor decryptor = new StandardPBEStringEncryptor();
		    decryptor.setPassword(secretCode);  
		    String decryptedText = decryptor.decrypt(encryptedText);
		    //System.out.println("Decrypted text is: " + decryptedText);
		    return decryptedText;
	}*/


