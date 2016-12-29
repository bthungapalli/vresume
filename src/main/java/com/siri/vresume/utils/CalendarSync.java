/**
 * 
 */
package com.siri.vresume.utils;

import java.io.IOException;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.siri.vresume.domain.Availability;

import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.TimeZone;
import net.fortuna.ical4j.model.TimeZoneRegistry;
import net.fortuna.ical4j.model.TimeZoneRegistryFactory;
import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.model.property.Description;
import net.fortuna.ical4j.model.property.Organizer;
import net.fortuna.ical4j.model.property.ProdId;
import net.fortuna.ical4j.model.property.TzName;
import net.fortuna.ical4j.model.property.Version;
import net.fortuna.ical4j.util.CompatibilityHints;

/**
 * @author bthungapalli
 *
 */
@Component
public class CalendarSync {

	public Calendar sendCalendarSync(Availability availability, String hostEmail, String subject, String description)
			throws ParseException, URISyntaxException, IOException {
		// Creating a new calendar
		net.fortuna.ical4j.model.Calendar calendar = new net.fortuna.ical4j.model.Calendar();
		String timeZoneValue = fetchTimeZone(availability.getTimeZone());
		calendar.getProperties().add(new ProdId("-//Ben Fortuna//iCal4j 1.0//EN"));
		calendar.getProperties().add(Version.VERSION_2_0);
		calendar.getProperties().add(new TzName(timeZoneValue));
		CompatibilityHints.setHintEnabled(CompatibilityHints.KEY_OUTLOOK_COMPATIBILITY, true);
		  final TimeZoneRegistry registry = TimeZoneRegistryFactory.getInstance().createRegistry();
		   final TimeZone timezone = registry.getTimeZone(timeZoneValue);//availability.getTimeZone());
				
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm a");
		Date startDate = dateFormat.parse(availability.getDate() + 'T' + availability.getFromTime());
		Date endDate = dateFormat.parse(availability.getDate() + 'T' + availability.getToTime());
		net.fortuna.ical4j.model.DateTime interviewDate = new net.fortuna.ical4j.model.DateTime(startDate);
		interviewDate.setTimeZone(timezone);
		net.fortuna.ical4j.model.DateTime interviewEndDate = new net.fortuna.ical4j.model.DateTime(endDate);
		interviewEndDate.setTimeZone(timezone);
		VEvent vevent = new VEvent(interviewDate, interviewEndDate, subject);
		if (description != null) {
			vevent.getProperties().add((new Description()));
			vevent.getProperties().getProperty(Property.DESCRIPTION).setValue(description);
		}
		vevent.getProperties().add(new Organizer("MAILTO:" + hostEmail));
		calendar.getComponents().add(vevent);
		return calendar;

	}
	
	
	private String fetchTimeZone(String timzoneValue){
		switch (timzoneValue) {
		case "CST":
			return "America/Chicago"; 
		case "EST":
			return "America/New_York"; 
		case "PST":
			return "America/Los_Angeles";
		case "MST":
			return "America/Denver";
		default:
			return "";
		}
		
		
	}

}
