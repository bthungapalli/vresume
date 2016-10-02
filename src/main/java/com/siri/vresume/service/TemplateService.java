/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.TemplateDao;
import com.siri.vresume.domain.Sections;
import com.siri.vresume.domain.Templates;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
public class TemplateService {

	@Autowired
	private TemplateDao templateDao;
	
	public List<Templates> fetchTemplates(int id) throws VResumeDaoException {
		List<Templates> templates = templateDao.fetchTemplates(id);
		for (Templates template : templates) {
			template.setSections(templateDao.fetchSections(template.getTemplateId()));
		}
		return templates;
	}

	@Transactional
	public void insertTemplate(Templates template) {
		templateDao.insertTemplate(template);
		
		for(Sections section : template.getSections()){
		templateDao.insertSection(template.getTemplateId(),section);
		}
	}

}
