/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Templates;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface TemplateDao {

	public List<Templates> fetchTemplates(int userId);

	public void insertTemplate(Templates template);

	public void updateTemplate(Templates template);

	@Delete("Delete from templates where id = #{templateId} and user_id = #{userId}")
	public void deleteTemplate(@Param ("templateId")int templateId, @Param("userId")int id);


}
