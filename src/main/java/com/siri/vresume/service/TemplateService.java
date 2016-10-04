/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.TemplateDao;
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
	public void insertTemplate(Templates template) {
		templateDao.insertTemplate(template);
	}

	public void updateTemplate(Templates template) throws VResumeDaoException {
		if(template.getTemplateId() <= 0 ) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.updateTemplate(template);
	}

	public void deleteTemplate(int templateId, int id) throws VResumeDaoException {
		if(templateId <= 0 ) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.deleteTemplate(templateId,id);
		
	}

}
