package com.siri.vresume.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {

	@Value("${email.host}")
	private String host;

	@Value("${email.from}")
	private String from;

	@Value("${email.username}")
	private String username;

	@Value("${email.password}")
	private String password;
	
	@Value("${email.port}")
	private int port;

	@Bean
	public JavaMailSender javaMailService() {
		System.setProperty ("jsse.enableSNIExtension", "false");
		JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
		javaMailSender.setHost(host);
		javaMailSender.setUsername(username);
		javaMailSender.setPassword(password);
		javaMailSender.setPort(port);
		Properties properties = new Properties();
		properties.setProperty("mail.smtp.auth", "true");
		//properties.setProperty("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.ssl.enable", "true");
		javaMailSender.setJavaMailProperties(properties);
		return javaMailSender;
	}

	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();

	}
}