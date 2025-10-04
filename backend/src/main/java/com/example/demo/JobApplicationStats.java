package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class JobApplicationStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    private Integer applicationsFilled;

    private Integer applicationsAccepted;

    public JobApplicationStats() {}

    public JobApplicationStats(Job job, Integer applicationsFilled, Integer applicationsAccepted) {
        this.job = job;
        this.applicationsFilled = applicationsFilled;
        this.applicationsAccepted = applicationsAccepted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
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

    public Long getJobId() {
        return job != null ? job.getId() : null;
    }
}
