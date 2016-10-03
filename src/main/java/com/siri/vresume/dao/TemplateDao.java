/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Templates;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface TemplateDao {

	public List<Templates> fetchTemplates(int userId);

	public void insertTemplate(Templates template);


}
