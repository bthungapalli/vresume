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

import com.siri.vresume.domain.Sections;

/**
 * @author bthungapalli
 *
 */
public class SectionsEditor extends PropertyEditorSupport {
	Logger logger = LoggerFactory.getLogger(SectionsEditor.class);

	@Override
	public void setAsText(String text) {

		Sections value = null;
		JSONArray jsonArray = new JSONArray(text);
		JSONObject jsonObject;
		List<Sections> sections = new ArrayList<>();
		try {
			for (int i = 0; i < jsonArray.length(); i++) {
				jsonObject = jsonArray.getJSONObject(i);
				value = new Sections();
				value.setSectionName(jsonObject.getString("sectionName"));
				value.setUserRating(jsonObject.getInt("userRating"));
				sections.add(value);
			}
		} catch (Exception e) {
			setValue(new ArrayList<>());
		}
		setValue(sections);
	}}
