/**
 * 
 */
package com.siri.vresume.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.siri.vresume.domain.TemplateSection;
import com.siri.vresume.domain.Templates;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Repository
public interface TemplateDao {

	public List<Templates> fetchTemplates(int userId) throws VResumeDaoException;
	
	

	public int insertTemplate(Templates template) throws VResumeDaoException;

	public void insertTemplateSection(TemplateSection templateSection) throws VResumeDaoException;


	
	
	@Update("UPDATE sections SET sectionName=#{sectionName},durations=#{durations},priority=#{priority},updated_at=NOW() WHERE section_id = #{sectionId}")
	public void updateSections(TemplateSection templateSection) throws VResumeDaoException;
	
	/*public void updateSections(Templates templateSection) throws VResumeDaoException;loop*/
	
	

	/*@Delete("Delete from templates where id = #{templateId} and user_id = #{userId}")
	public void deleteTemplate(@Param("templateId") int templateId, @Param("userId") int id) throws VResumeDaoException;*/
	
	@Delete("Delete t.*,s.* from templates t INNER JOIN sections s on s.template_id=t.id where t.id = #{templateId} and t.user_id = #{userId}")
	public void deleteTemplate(@Param("templateId") int templateId, @Param("userId") int id) throws VResumeDaoException;

	@Select("Select id as templateId, name as templateName, user_id as userId, updated_at as updatedAt , sections , durations from templates where id=#{templateId}")
	public Templates fetchTemplateById(int templateId) throws VResumeDaoException;
	
	@Select("Select section_id as sectionId, sectionName as sectionName, durations as durations, updated_at as updatedAt ,priority from sections where section_id=#{sectionId} ORDER BY priority")
	public TemplateSection fetchSectionsById(int sectionId) throws VResumeDaoException;

	public void insertTemplateSection(@Param("templateSections") List<TemplateSection> templateSections,
			@Param("templateId") int templateId, @Param("userId") int userId) throws RuntimeException;
    
	
}
