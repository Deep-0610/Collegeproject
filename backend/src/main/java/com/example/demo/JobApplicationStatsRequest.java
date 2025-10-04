package com.example.demo;

public class JobApplicationStatsRequest {
    private Long jobId;
    private Integer applicationsFilled;
    private Integer applicationsAccepted;

    public JobApplicationStatsRequest() {}

    public JobApplicationStatsRequest(Long jobId, Integer applicationsFilled, Integer applicationsAccepted) {
        this.jobId = jobId;
        this.applicationsFilled = applicationsFilled;
        this.applicationsAccepted = applicationsAccepted;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public Integer getApplicationsFilled() {
        return applicationsFilled;
    }

    public void setApplicationsFilled(Integer applicationsFilled) {
        this.applicationsFilled = applicationsFilled;
    }

    public Integer getApplicationsAccepted() {
        return applicationsAccepted;
    }

    public void setApplicationsAccepted(Integer applicationsAccepted) {
        this.applicationsAccepted = applicationsAccepted;
    }
}
