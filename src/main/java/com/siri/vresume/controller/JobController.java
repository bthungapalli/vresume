/**
 * 
 */
package com.siri.vresume.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.siri.vresume.config.SecurityUser;
import com.siri.vresume.constants.VResumeConstants;
import com.siri.vresume.domain.BulkJobs;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.UpdateAvailability;
import com.siri.vresume.exception.VResumeDaoException;
import com.siri.vresume.service.JobService;
import com.siri.vresume.service.TemplateService;

/**
 * @author bthungapalli
 *
 */
@RestController
@RequestMapping("/job")
public class JobController {

	private static final int CORPORATE_ROLE = 7;

	@Autowired
	private JobService jobService;

	@Autowired
	private TemplateService templateService;

	@Autowired
	private UserController userController;
	
	private static final Logger logger = Logger.getLogger(JobController.class);

	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobs(HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			List<Job> activeJobs = jobService.fetchJobsByStatus(VResumeConstants.ACTIVE_STATUS,securityUser);
			for(Job job:activeJobs){
				job.getSections();
			}
			logger.debug("job is sucessfully fetched");
		
			return new ResponseEntity<List<Job>>(activeJobs, HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@RequestMapping(value = "/{jobId}/{userId}" , method=RequestMethod.GET)
	public ResponseEntity<?> fetchAppliedStatusForUser(@PathVariable("jobId") int jobId,@PathVariable("userId") int userId) {
		try {
			return new ResponseEntity<Boolean>(jobService.fetchAppliedStatusForUser(jobId,userId), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	
	/**
	 * 
	 * @param jobId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{jobId}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobByJobId(@PathVariable("jobId") int jobId, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			return new ResponseEntity<Job>(jobService.fetchJobByJobId(jobId,securityUser), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	/**
	 * 
	 * @param job
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@JsonIgnoreProperties
	public ResponseEntity<?> postJob(@RequestBody Job job, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			job.setCreatedById(securityUser.getId());
			jobService.postJob(job);
			logger.debug("job is sucessfully posted");
			return new ResponseEntity<List<Job>>(jobService.fetchJobs(securityUser.getId(),securityUser), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 
	 * @param job
	 * @param request
	 * @return
	 */
	@RequestMapping( method = RequestMethod.PUT)
	public ResponseEntity<?> updateJob(@RequestBody Job job, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			jobService.updateJob(job);
			return new ResponseEntity<Job>(jobService.fetchJobByJobId(job.getId(),securityUser), HttpStatus.OK);
		

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fetJobTemplate", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobTemplate(HttpServletRequest request) {
		SecurityUser securityUser = userController.fetchSessionObject();

		Map<String, Object> model = new HashMap<>();
		try {
			model.put("templates", templateService.fetchTemplates(securityUser.getId()));
			if(securityUser.getRole()!=CORPORATE_ROLE){
				model.put("hiringMgr", jobService.getHiringMgr(securityUser.getId()));
			}
		} catch (VResumeDaoException vre) {
			logger.error("Proble occured:::"+vre.getMessage());
			return new ResponseEntity<String>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(model, HttpStatus.OK);
	}
	
	/**
	 * 
	 * @param status
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/fetchJobs/{status}", method = RequestMethod.GET)
	public ResponseEntity<?> fetchJobsByStatus(@PathVariable("status") String status, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			return new ResponseEntity<List<Job>>(jobService.fetchJobsByStatus(status, securityUser),
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/**
	 * 
	 * @param jobId
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{jobId}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteJob(@PathVariable("jobId") int jobId, HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			jobService.delteJob(jobId);
			return new ResponseEntity<List<Job>>(jobService.fetchJobs(securityUser.getId(),securityUser), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@RequestMapping(value = "/downloadBulkJobExcel", method = RequestMethod.GET)
	public Object downloadBulkJobExcel( HttpServletRequest request,HttpServletResponse response) {
		response.setContentType("application/vnd.ms-excel");
        response.setHeader("Content-disposition",
                "attachment; filename=Bulk_Job_Excel.xls");
		SecurityUser securityUser = userController.fetchSessionObject();
		  XSSFWorkbook workbook = new XSSFWorkbook();
	        XSSFSheet sheet = workbook.createSheet("Bulk Job Creation");
	        Object[][] datatypes = {
	                {"TITLE","TEMPLATE", "LOCATION", "POSITION TYPE","START DATE","DURATION","DESCRIPTION","SKILLS","COMPENSATION","PAY RATE TYPE","CURRENCY","MIN EXPERIENCE","MAX EXPERIENCE","DIVERSE TYPE","PREFERRED ONLY","DIVERSE ONLY","DEPARTMENT","QUOTA","OTHERS","DIVERSE"},
	        };

	        int rowNum = 0;
	        
	        for (Object[] datatype : datatypes) {
	            Row row = sheet.createRow(rowNum++);
	            int colNum = 0;
	            for (Object field : datatype) {
	                Cell cell = row.createCell(colNum++);
	                if (field instanceof String) {
	                    cell.setCellValue((String) field);
	                } else if (field instanceof Integer) {
	                    cell.setCellValue((Integer) field);
	                }
	            }
	        }
	        
	        try {
	            workbook.write(response.getOutputStream());
	            workbook.close();
	        } catch (FileNotFoundException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        
	        return null;
	}
	
	@RequestMapping(value = "/uploadBulkJobs", method = RequestMethod.POST)
	public ResponseEntity<?> uploadBulkJobs(@RequestBody MultipartFile jobs, HttpServletRequest request,HttpSession session) {
		try{
			 SecurityUser securityUser = userController.fetchSessionObject();
			return new ResponseEntity<List<BulkJobs>>(jobService.uploadBulkJobs(securityUser,jobs),HttpStatus.OK);
		}catch(Exception ex){
			logger.error("Problem while sending email:::"+ex.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@RequestMapping(value = "/viewJob/{jobId}", method = RequestMethod.GET)
	public ResponseEntity<?> viewJobByJobId(@PathVariable("jobId") int jobId, HttpServletRequest request) {
		try {
			return new ResponseEntity<Job>(jobService.viewJobByJobId(jobId), HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@RequestMapping(value = "/updateAvailability",method = RequestMethod.POST)
	@JsonIgnoreProperties
	public ResponseEntity<?> updateAvailability(@RequestBody UpdateAvailability updateAvailability, HttpServletRequest request) {
		try {
			
			jobService.updateAvailability(updateAvailability);
			logger.debug("updateAvailability");
			return new ResponseEntity<>(HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/techJobs", method = RequestMethod.GET)
	public ResponseEntity<?> fetchTechJobs( HttpServletRequest request) {
		try {
			SecurityUser securityUser = userController.fetchSessionObject();
			return new ResponseEntity<List<Job>>(jobService.fetchTechJobs(securityUser),
					HttpStatus.OK);

		} catch (VResumeDaoException vre) {
			logger.error("Error Occured :: "+ vre.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
