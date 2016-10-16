/**
 * 
 */
package com.siri.vresume.utils;

import java.beans.PropertyEditorSupport;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.siri.vresume.domain.Availability;

/**
 * @author bthungapalli
 *
 */

// TODO : Need to implement more generic Property.
public class AvailabilityEditor extends PropertyEditorSupport {
	Logger logger = LoggerFactory.getLogger(Availability.class);

	@Override
	public void setAsText(String text) {

		Availability value = null;
		JSONArray jsonArray = new JSONArray(text);
		JSONObject jsonObject;
		List<Availability> availabilities = new ArrayList<>();
		try{
		for(int i=0;i<jsonArray.length();i++){
			jsonObject = jsonArray.getJSONObject(i);
			value = new Availability();
			String dateString =jsonObject.getString("date"); 
			value.setDate(dateString.substring(0,dateString.indexOf('T')));
			value.setTo(jsonObject.getString("to"));
			value.setFrom(jsonObject.getString("from"));
			availabilities.add(value);
		}
		}
		catch(Exception e){
			setValue(new ArrayList<>());
		}
		setValue(availabilities);
	}

}
