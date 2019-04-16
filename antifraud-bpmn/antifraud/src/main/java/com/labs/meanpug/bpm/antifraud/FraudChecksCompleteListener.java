package com.labs.meanpug.bpm.antifraud;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.ExecutionListener;

public class FraudChecksCompleteListener implements ExecutionListener {	
	public void notify(DelegateExecution execution) throws Exception {
		Boolean fraudPass = (Boolean) execution.getVariable("fraudPass");
		String orderProcessId = (String) execution.getVariable("processId");
		
		execution
			.getProcessEngineServices()
			.getRuntimeService()			
			.createMessageCorrelation("fraudCheckComplete")
			.processInstanceId(orderProcessId)
			.setVariable("fraudPass", fraudPass)			
			.correlate();
	}
}
