package com.siri.vresume.config;

import java.util.Map;
import java.util.concurrent.Future;

import javax.activation.DataHandler;
import javax.inject.Inject;
import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.domain.Availability;
import com.siri.vresume.domain.Comment;
import com.siri.vresume.domain.ContactForm;
import com.siri.vresume.domain.User;
import com.siri.vresume.utils.CalendarSync;

import net.fortuna.ical4j.model.Calendar;

@Component
@EnableAsync
public class MailUtil {

	@Value("${email.from}")
	private String from;

	@Value("${contextPath}")
	private String contextPath;
	
	@Value("${contact.email}")
	private String contactEmail;

	@Inject
	private JavaMailSender javaMailSender;

	@Inject
	private SpringTemplateEngine templateEngine;
	
	@Autowired
	private CalendarSync calendarSync;

	@Async
	@Bean
	@Lazy
	// method to send a mail
	public Future<Void> sendMail(User user, String url) throws MessagingException {
		long startTime = System.currentTimeMillis();
		ClassLoader classLoader = getClass().getClassLoader();
		final Context ctx = new Context();
		// ctx.setVariable("name", StringUtils.capitalize(user.getFirstName()+"
		// "+user.getLastName()));
		ctx.setVariable("name", user.getFirstName());
		ctx.setVariable("email", user.getEmail());
		ctx.setVariable("path", url);
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.REGISTRATION_CONFIRMATION_SUBJECT);
		helper.setTo(user.getEmail());
		helper.setText(templateEngine.process(VResumeConstants.REGISTRATION_CONFIRMATION_TEMPLATE, ctx), true);
		/*
		 * try { InputStreamSource imageSource = new ByteArrayResource(
		 * IOUtils.toByteArray(classLoader
		 * .getResourceAsStream("mail/impact_Logo.png")));
		 * helper.addInline("impact_Logo.png", imageSource, "image/png"); }
		 * catch (IOException e) { e.printStackTrace(); }
		 */

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}

	@Async
	@Bean
	@Lazy
	public Future<Void> sendApplyJobMail(Map<String, Object> map) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		String email = (String) map.get("email");
		ctx.setVariable("email", email);
		ctx.setVariable("companyName", map.get("companyName"));
		ctx.setVariable("jobName", map.get("jobName"));
		ctx.setVariable("name", map.get("name"));
		ctx.setVariable("path", contextPath);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.NEW_JOB_APPLIED);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.NEW_JOB_APPLIED_TEMPLATE, ctx), true);
		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}

	@Async
	@Bean
	@Lazy
	public Future<Void> sendMailToCreatedUser(Map<String, Object> map) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		String email = (String) map.get("createdByEmail");
		ctx.setVariable("email", email);
		ctx.setVariable("companyName", map.get("companyName"));
		ctx.setVariable("jobName", map.get("jobName"));
		ctx.setVariable("name", map.get("createdBy"));
		ctx.setVariable("path", contextPath);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.NEW_JOB_APPLICATION);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.NEW_JOB_APPLICATION_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}

	@Async
	@Bean
	@Lazy
	public Future<Void> forgetPasswordNotifyMail(User user, String newPassword) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		String email = user.getEmail();
		ctx.setVariable("email", email);
		ctx.setVariable("password", newPassword);
		ctx.setVariable("name", user.getFirstName() + " " + user.getLastName());
		ctx.setVariable("path", contextPath);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.PASSWORD_CHANGED);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.PASSWORD_CHANGE_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}

	@Async
	@Bean
	@Lazy
	public Future<Void> sendHireEmail(String email, Map<String, Object> map, boolean isHM) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		// String email = (String) map.get("createdByEmail");
		String candidateName = (String) map.get("candidateName");
		String jobName = (String) map.get("jobName");
		String location = (String) map.get("location");
		String hmName = (String) map.get("hmName");
		String cmName = (String) map.get("cmName");

		String message = isHM ? ("You have successfully hired " + candidateName + " for " + jobName + " , " + location)
				: hmName + " has made the decision to HIRE -" + candidateName + " for " + jobName + " , " + location;

		String name = isHM ? hmName : cmName;
		ctx.setVariable("name", name);
		ctx.setVariable("message", message);
		ctx.setVariable("path", contextPath);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.APPLICANT_HIRED);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.APPLICANT_HIRED_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);

	}

	@Async
	@Bean
	@Lazy
	public Future<Void> sendUndecidedMail(String email, Map<String, Object> map) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		// String email = (String) map.get("createdByEmail");
		ctx.setVariable("candidateName", map.get("candidateName"));
		ctx.setVariable("cmName", map.get("cmName"));
		ctx.setVariable("jobName", map.get("jobName"));
		ctx.setVariable("path", contextPath);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.APPLICANT_UNDECIDED);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.APPLICANT_UNDECIDED_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);

	}

	@Async
	@Bean
	@Lazy
	public Future<Void> sendRejectedEmail(String email, Map<String, Object> map, int role) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		String candidateName = (String) map.get("candidateName");
		String jobName = (String) map.get("jobName");
		String location = (String) map.get("location");
		String hmName = (String) map.get("hmName");
		String cmName = (String) map.get("cmName");
		String companyName = (String) map.get("companyName");
		Comment comment = (Comment) map.get("comments");
		String message = null;
		String name = null;
		switch (role) {
		case 0:
			message = "Regret to inform that your VideoApplication for " + jobName + " , " + location + " , "
					+ companyName + " has been declined.";
			name = candidateName;
			break;
		case 1:
			message = "The VideoApplication of " + candidateName + " for " + jobName + " , " + location + " , "
					+ companyName + " has been declined by " + hmName + ".";
			name = cmName;
			break;
		case 2:
			message = "You have declined the Video application of " + candidateName + " for " + jobName + " , "
					+ location + ".";
			name = hmName;
		default:
			break;
		}

		ctx.setVariable("name", name);
		ctx.setVariable("message", message);
		ctx.setVariable("path", contextPath);
		ctx.setVariable("comment", comment.getComment());
		ctx.setVariable("role", role);

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.APPLICANT_REJECTED);
		helper.setTo(email);
		helper.setText(templateEngine.process(VResumeConstants.APPLICANT_REJECTED_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);

	}

	@Async
	@Bean
	@Lazy
	public Future<Void> syncCalendar(String hmEmail, String subject , Availability availability , String description) {
		long startTime = System.currentTimeMillis();
		try {

			Calendar calendar = calendarSync.sendCalendarSync(availability,hmEmail,subject,description);
			// Create the message part
			BodyPart messageBodyPart = new MimeBodyPart();

			// Fill the message
			messageBodyPart.setHeader("Content-Class", "urn:content-  classes:calendarmessage");
			messageBodyPart.setHeader("Content-ID", "calendar_message");
			messageBodyPart
					.setDataHandler(new DataHandler(new ByteArrayDataSource(calendar.toString(), "text/calendar")));// very
																													// important
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
			helper.setFrom(from);
			helper.setSubject(subject);
			InternetAddress[] inetAdd = new InternetAddress[]{new InternetAddress(hmEmail)};
			helper.setTo(inetAdd);
			//helper.setText(templateEngine.process(VResumeConstants.APPLICANT_REJECTED_TEMPLATE, ctx), true);
			// Create a Multipart
			Multipart multipart = new MimeMultipart();
			// Add part one
			multipart.addBodyPart(messageBodyPart);
			// Put parts in message
			mimeMessage.setContent(multipart);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException me) {
			me.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}
	
	@Async
	@Bean
	@Lazy
	public Future<Void> sendContactUs(ContactForm contactForm) throws MessagingException {
		long startTime = System.currentTimeMillis();
		final Context ctx = new Context();
		// String email = (String) map.get("createdByEmail");
		ctx.setVariable("name" , contactForm.getName());
		ctx.setVariable("email",contactForm.getEmailId());
		ctx.setVariable("business", contactForm.getBusinessName());
		ctx.setVariable("website", contactForm.getWebsite());
		ctx.setVariable("phone", contactForm.getContactNumber());
		ctx.setVariable("country", contactForm.getCountry());

		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.REQUEST_DEMO);
		helper.setTo(contactEmail);
		helper.setText(templateEngine.process(VResumeConstants.REQUEST_DEMO_TEMPLATE, ctx), true);

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);

	}
	
	
	@Async
	@Bean
	@Lazy
	// method to send a mail
	public Future<Void> sendCmOrHmMail(User user, SecurityUser securityUser) throws MessagingException {
		long startTime = System.currentTimeMillis();
		ClassLoader classLoader = getClass().getClassLoader();
		final Context ctx = new Context();
		ctx.setVariable("created_by", securityUser.getEmail());
		ctx.setVariable("password", user.getPassword());
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1, "utf-8");
		helper.setFrom(from);
		helper.setSubject(VResumeConstants.PROFILE_CREATED_SUBJECT);
		helper.setTo(user.getEmail());
		helper.setText(templateEngine.process(VResumeConstants.PROFILE_CREATED_TEMPALTE, ctx), true);
		javaMailSender.send(mimeMessage);
		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: " + (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}

}
