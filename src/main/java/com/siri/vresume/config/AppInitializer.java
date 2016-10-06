package com.siri.vresume.config;

import javax.servlet.Filter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import com.siri.vresume.service.TemplateService;
import com.siri.vresume.service.UserService;


/**
 * Java Config for this application. Life begins here.
 * 
 * @author Bharani Thungapalli
 */
public class AppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	 @Override
	    public void onStartup(ServletContext servletContext) throws ServletException {
	        super.onStartup(servletContext);
	        servletContext.addListener(new SessionListener());
	    }
	
	
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class<?>[] {  DataConfig.class, ViewResolver.class, MailConfig.class,
				UserService.class, CustomUserDetailsService.class,TemplateService.class,MailConfig.class, ThymeLeafConfig.class,MailUtil.class};
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class<?>[] { WebConfig.class };
	}

	@Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
		characterEncodingFilter.setEncoding("UTF-8");
		return new Filter[] { characterEncodingFilter, new DelegatingFilterProxy("springSecurityFilterChain") };
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

}
