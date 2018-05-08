package com.siri.vresume.config;

import java.util.Random;


public class PasswordManagerUtil {
	/* public static String encryptPassword(){
		 StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
			encryptor.setPassword("VR0123");
			String encryptedText1=encryptor.encrypt("Vr3$um3");
			System.out.println(encryptedText1);
			return encryptedText1;
	 }
	public static String decryptPassword(String encryptedText,String secretCode){
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
	
	public   static char[] random_Password()
	    {
		   int len=10;
	        System.out.println("Generating password using random() : ");
	        System.out.print("Your new password is : ");
	 
	        // A strong password has Cap_chars, Lower_chars,
	        // numeric value and symbols. So we are using all of
	        // them to generate our password
	        String Capital_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	        String Small_chars = "abcdefghijklmnopqrstuvwxyz";
	        String numbers = "0123456789";
	                String symbols = "!@#$%^&*_=+-/.?<>)";
	 
	 
	        String values = Capital_chars + Small_chars +
	                        numbers + symbols;
	 
	        // Using random method
	        Random rndm_method = new Random();
	 
	        char[] password = new char[len];
	 
	        for (int i = 0; i < len; i++)
	        {
	            // Use of charAt() method : to get character value
	            // Use of nextInt() as it is scanning the value as int
	            password[i] =
	              values.charAt(rndm_method.nextInt(values.length()));
	 
	        }
	        return password;
	    }
	}


