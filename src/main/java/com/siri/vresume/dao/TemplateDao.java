/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.Templates;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface TemplateDao {

	public List<Templates> fetchTemplates(int userId) throws VResumeDaoException;

	public void insertTemplate(Templates template) throws VResumeDaoException;

	public void updateTemplate(Templates template)throws VResumeDaoException;

	@Delete("Delete from templates where id = #{templateId} and user_id = #{userId}")
	public void deleteTemplate(@Param ("templateId")int templateId, @Param("userId")int id) throws VResumeDaoException;

	@Select("Select id as templateId, name as templateName, user_id as userId, updated_at as updatedAt , sections , durations, internal_sections as internalSections , orders as orders from templates where id=#{templateId}")
	public Templates fetchTemplateById(int templateId) throws VResumeDaoException;
	
}
