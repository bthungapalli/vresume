package com.siri.vresume.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CustomUserDetailsService userDetailService;


	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth)
			throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder());;
	}
	

  /*  @Bean
    public UserDetailsContextMapper userDetailsContextMapper() {
        UserDetailsContextMapper contextMapper = new CustomUserDetailsService();
        return contextMapper;
    }
    */
	
	@Bean
	public PasswordEncoder passwordEncoder(){
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.csrf().disable().httpBasic().realmName("agtools").and().authorizeRequests().antMatchers("/resources/**")
		.permitAll().antMatchers("/css/**").permitAll().antMatchers("/js/**").permitAll()
		.antMatchers("/angularJs/**").permitAll().antMatchers("/images/**").permitAll().antMatchers("/dist/**")
		.permitAll().antMatchers("/registration").permitAll().antMatchers("/faq").permitAll()
		.antMatchers("/forgetpassword").permitAll().antMatchers("/partials/**").permitAll()
		.antMatchers("/reports/**").permitAll().antMatchers("/fonts/**").permitAll().antMatchers("/files/**")
		.permitAll().and().formLogin().permitAll().loginPage("/").permitAll().usernameParameter("userName")
		.passwordParameter("password").loginProcessingUrl("/j_spring_security_check")
		.successHandler(new CustomAuthenticationSuccessHandler()).failureUrl("/?auth=fail").and().logout()
		.logoutUrl("/j_spring_security_logout").deleteCookies("JSESSIONID").invalidateHttpSession(true)
		.logoutSuccessUrl("/");

		http.sessionManagement().enableSessionUrlRewriting(false).sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
				.sessionFixation().newSession().invalidSessionUrl("/").maximumSessions(1)
				.maxSessionsPreventsLogin(false).expiredUrl("/");
		

	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/resources/**").antMatchers("/css/**").antMatchers("/js/**")
				.antMatchers("/images/**").antMatchers("/angularJs/**").antMatchers("/dist/**")
				.antMatchers("/fonts/**").antMatchers("/partials/**").antMatchers("/reports/**"); // #3
	}
}