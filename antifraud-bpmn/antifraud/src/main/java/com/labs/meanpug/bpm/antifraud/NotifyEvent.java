package com.labs.meanpug.bpm.antifraud;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.labs.meanpug.bpm.ActionLogsWriter;

@Component
public class NotifyEvent implements ExecutionListener {	
	@Autowired
	private Environment env;
	
	private Expression event;
	private Expression message;
	
	public void notify(DelegateExecution execution) throws Exception {		
		String orderProcessId = (String) execution.getProcessInstanceId();		
		String eventValue = (String) event.getValue(execution);
		String messageValue = (String) message.getValue(execution);
		
		System.out.println(String.format("got event %s for order %s (%s)", eventValue, orderProcessId, messageValue));
		
		ActionLogsWriter logger = new ActionLogsWriter(
			env.getProperty("mongo.host"), 
			Integer.parseInt(env.getProperty("mongo.port")), 
			env.getProperty("mongo.username"), 
			env.getProperty("mongo.password"),
			env.getProperty("mongo.db"), 
			env.getProperty("mongo.collection")
		);
		
		logger.writeLog(orderProcessId, eventValue, messageValue);
	}}
