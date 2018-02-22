/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.TemplateDao;
import com.siri.vresume.domain.TemplateSection;
import com.siri.vresume.domain.Templates;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
public class TemplateService {

	private static final String TEMPLATE_ID_ERROR = "Template Id should not be null";
	@Autowired
	private TemplateDao templateDao;
	
	
	public List<Templates> fetchTemplates(int id) throws VResumeDaoException {
		return templateDao.fetchTemplates(id);
	}

	@Transactional
	public void insertTemplate(Templates template) throws VResumeDaoException {
		try {
			templateDao.insertTemplate(template);
			templateDao.insertTemplateSection(template.getTemplateSections(), template.getTemplateId(),template.getUserId());
		} catch (RuntimeException e) {
			e.printStackTrace();
			throw new VResumeDaoException(e.getCause());
		}
	}

	public void updateTemplate(Templates template) throws VResumeDaoException {
		if(template.getTemplateId() <= 0 ) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.updateTemplate(template);
	}
    
	public void insertTemplateSection(TemplateSection templateSection) throws VResumeDaoException{
		templateDao.insertTemplateSection(templateSection);
	}
	
	public void updateTemplateSection(TemplateSection templateSection) throws VResumeDaoException{
		if(templateSection.getSectionId()<=0) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.updateTemplateSection(templateSection);
	}
	
	public void deleteTemplate(int templateId, int id) throws VResumeDaoException {
		if(templateId <= 0 ) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.deleteTemplate(templateId,id);
	}

	public Templates fetchTemplateById(int templateId) throws VResumeDaoException {
		return templateDao.fetchTemplateById(templateId);
		// templateDao.fetchSectionPriority(templateId);
	}

}
