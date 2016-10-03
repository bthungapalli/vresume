/**
 * 
 */
package com.siri.vresume.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.siri.vresume.dao.JobDao;
import com.siri.vresume.domain.Job;
import com.siri.vresume.domain.UserDetails;
import com.siri.vresume.exception.VResumeDaoException;

/**
 * @author bthungapalli
 *
 */
@Service
public class JobService {

	@Autowired
	private JobDao jobDao;
	
	public List<Job> fetchJobs(int id) throws VResumeDaoException {
		return jobDao.fetchJobs(id);
	}

	public List<UserDetails> getHiringMgr() {
		return jobDao.fetchHiringMgr();
	}

	public List<Job> fetchJobsByStatus(String status, int userId) throws VResumeDaoException {
		return jobDao.fetchJobsByStatus(status,userId);
	}

}
