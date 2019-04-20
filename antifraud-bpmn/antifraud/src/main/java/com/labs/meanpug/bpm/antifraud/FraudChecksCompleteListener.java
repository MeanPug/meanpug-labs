package com.labs.meanpug.bpm.antifraud;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import com.labs.meanpug.bpm.ActionLogsWriter;

public class FraudChecksCompleteListener implements ExecutionListener {	
	@Autowired
	private Environment env;
	
	public void notify(DelegateExecution execution) throws Exception {
		Boolean fraudPass = (Boolean) execution.getVariable("fraudPass");
		String orderProcessId = (String) execution.getVariable("processId");
		
		ActionLogsWriter logger = new ActionLogsWriter(
			env.getProperty("mongo.host"), 
			Integer.parseInt(env.getProperty("mongo.port")), 
			env.getProperty("mongo.username"), 
			env.getProperty("mongo.password"),
			env.getProperty("mongo.db"), 
			env.getProperty("mongo.collection")
		);
		
		logger.writeLog(orderProcessId, "FRAUD_CHECKS_COMPLETE", String.format("all fraud checks have completed (success? %s)", fraudPass));
		
		execution
			.getProcessEngineServices()
			.getRuntimeService()			
			.createMessageCorrelation("fraudCheckComplete")
			.processInstanceId(orderProcessId)
			.setVariable("fraudPass", fraudPass)			
			.correlate();
	}
}
