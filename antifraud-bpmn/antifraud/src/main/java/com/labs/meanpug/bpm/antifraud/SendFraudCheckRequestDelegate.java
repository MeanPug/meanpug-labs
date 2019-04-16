package com.labs.meanpug.bpm.antifraud;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class SendFraudCheckRequestDelegate implements JavaDelegate {	
	public void execute(DelegateExecution execution) throws Exception {
		Integer orderValue = (Integer) execution.getVariable("orderValue");
		String processId = execution.getProcessInstanceId();
		
		execution
			.getProcessEngineServices()
			.getRuntimeService()
			.createMessageCorrelation("fraudCheckRequested")
			.processInstanceBusinessKey("AntifraudProcess")
			.setVariable("orderValue", orderValue)
			.setVariable("processId", processId)
			.correlate();
	}
}
