package com.siri.vresume.config;

import java.util.concurrent.Future;

import javax.inject.Inject;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

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

import com.siri.vresume.domain.User;

@Component
@EnableAsync
public class MailUtil {

	@Value("${email.from}")
	private String from;

	@Inject
	private JavaMailSender javaMailSender;

	@Inject
	private SpringTemplateEngine templateEngine;

	@Async
	@Bean
	@Lazy
	//method to send a mail
	public Future<Void> sendMail(User user,String url) throws MessagingException {

		
		long startTime = System.currentTimeMillis();
		ClassLoader classLoader = getClass().getClassLoader();
		final Context ctx = new Context();
//		ctx.setVariable("name", StringUtils.capitalize(user.getFirstName()+" "+user.getLastName()));
		ctx.setVariable("email", user.getEmail());
		ctx.setVariable("path", url);
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, 1,
				"utf-8");
		helper.setFrom(from);
		helper.setSubject("Registration Confiramtion");
		helper.setTo(user.getEmail());
		helper.setText(
				templateEngine.process("Registeration-Verification",  ctx),
				true);
		/*try {
			InputStreamSource imageSource = new ByteArrayResource(
					IOUtils.toByteArray(classLoader
							.getResourceAsStream("mail/impact_Logo.png")));
			helper.addInline("impact_Logo.png", imageSource, "image/png");
		} catch (IOException e) {
			e.printStackTrace();
		}*/

		javaMailSender.send(mimeMessage);

		long endTime = System.currentTimeMillis();
		System.out.println("Total execution time for Sending Email: "
				+ (endTime - startTime) + "ms");
		return new AsyncResult<Void>(null);
	}


}
