/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.siri.vresume.dao.TemplateDao;
import com.siri.vresume.domain.Sections;
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
		/*List<Templates> fetchingTemplateSections=templateDao.fetchTemplateSection(id);
		for(Templates  )
		return fetchingTemplateSections;*/
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

	
    
	public void insertTemplateSection(TemplateSection templateSection) throws VResumeDaoException{
		templateDao.insertTemplateSection(templateSection);
	}
	//loop
	/*public void updateSections(Templates templateSection) throws VResumeDaoException{
		System.out.println("TemplateService Starts");
	    //if(templateSection.getSectionId()<=0) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.updateSections(templateSection);
		System.out.println("TemplateService Ends");
	}*/
	
	//used update
	public void updateSections(TemplateSection templateSection) throws VResumeDaoException{
	    //if(templateSection.getSectionId()<=0) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.updateSections(templateSection);
	}
	
	
	public void deleteTemplate(int templateId, int id) throws VResumeDaoException {
		if(templateId <= 0 ) throw new VResumeDaoException(TEMPLATE_ID_ERROR);
		templateDao.deleteTemplate(templateId,id);
	}

	public Templates fetchTemplateById(int templateId) throws VResumeDaoException {
		return templateDao.fetchTemplateById(templateId);
		// templateDao.fetchSectionPriority(templateId);
	}
	
	public TemplateSection fetchSectionsById(int sectionId) throws VResumeDaoException {
		return templateDao.fetchSectionsById(sectionId);
		// templateDao.fetchSectionPriority(templateId);
	}

	

}
