package com.siri.vresume.config;

import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * Custom view resolving
 * 
 * @author SureshI
 */
@Component
@Import({ AppSecurityConfig.class })
public class ViewResolver extends InternalResourceViewResolver {

	public ViewResolver() {
		super();
		//setPrefix("angularjs/app/partials/");
		setSuffix(".html");
	}

	@Override
	protected AbstractUrlBasedView buildView(String viewName) throws Exception {
		if (viewName.isEmpty() || viewName.endsWith("/")) {
			viewName += "index";
		}
		return super.buildView(viewName);
	}
	
	
}
