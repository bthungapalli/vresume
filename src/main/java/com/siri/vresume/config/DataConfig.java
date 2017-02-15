package com.siri.vresume.config;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
@Configuration
@MapperScan("com.siri.vresume.dao")
public class DataConfig {
		
	@Value("${environment.name}")
	public String environmentName;
	
	@Value("${db.url}")
	public String url;
	
	@Value("${db.username}")
	public String userName;
	
	@Value("${db.password}")
	public String password;

/*@Bean
public DataSource dataSource1() {

HikariConfig config = new HikariConfig();
config.setDataSourceClassName("com.mysql.jdbc.jdbc2.optional.MysqlDataSource");
config.addDataSourceProperty("url", "jdbc:mysql://localhost:3306/impact_db");
config.addDataSourceProperty("user", "root");
config.addDataSourceProperty("password", "srinivas");
config.addDataSourceProperty("cachePrepStmts", "true");
config.addDataSourceProperty("prepStmtCacheSize", "250");
config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
config.addDataSourceProperty("useServerPrepStmts", "true");

return new HikariDataSource(config);
}*/
	/*@Bean
	public DataSource dataSource() throws ClassNotFoundException {
		
		  final JndiDataSourceLookup dsLookup = new JndiDataSourceLookup();
	       dsLookup.setResourceRef(true);
	       DataSource dataSource = dsLookup.getDataSource("java:/comp/env/jdbc/impact");
	       return dataSource;
		
	}*/

	@Bean
	public DataSource dataSource1() {
		SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
		dataSource.setDriverClass(com.mysql.jdbc.Driver.class);
		System.out.println("#########################################");
		System.out.println("ENVIRONMENT NAME IS :"+environmentName);
		System.out.println("#########################################");
		dataSource.setUrl(url);
		dataSource.setUsername(userName);
		dataSource.setPassword(password);
		return dataSource;
	}

	@Bean
	public DataSourceTransactionManager transactionManager()
			throws ClassNotFoundException {
		DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
		dataSourceTransactionManager.setDataSource(dataSource1());
		return dataSourceTransactionManager;
	}

	@Bean
	@Primary
	public SqlSessionFactoryBean sqlSessionFactory() throws Exception {
		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
		sessionFactory.setDataSource(dataSource1());
		sessionFactory.setTypeAliasesPackage("com.siri.vresume.domain");
		return sessionFactory;
	}

	
	/*
	 * @Bean public SqlSessionTemplate sqlSessionTemplate() throws Exception {
	 * SqlSessionTemplate template = new SqlSessionTemplate( (SqlSessionFactory)
	 * sqlSessionFactory()); return template; }
	 */
	
	/**
	   * Add PropertySourcesPlaceholderConfigurer to make placeholder work.
	   * This method MUST be static
	   * */
	   
	  @Bean
	  public static PropertySourcesPlaceholderConfigurer propertyConfigurer() {
	    Resource resource =  new ClassPathResource("/development.properties");
	    String activeProfile;
	     
	    PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer =  new PropertySourcesPlaceholderConfigurer();
	     
	    // get active profile
	    activeProfile = System.getProperty("spring.profiles.active");
	 
	    // choose different property files for different active profile
	    if ("production".equals(activeProfile)) {
	    		resource = new ClassPathResource("/production.properties");
	    } else if ("test".equals(activeProfile)) {
	    		resource = new ClassPathResource("/test.properties");
	    } else if ("development".equals(activeProfile)){
	    	 	resource = new ClassPathResource("/development.properties");
	    }
	    // load the property file
	    propertySourcesPlaceholderConfigurer.setLocation(resource);
	     
	    return propertySourcesPlaceholderConfigurer;
	  }
}
