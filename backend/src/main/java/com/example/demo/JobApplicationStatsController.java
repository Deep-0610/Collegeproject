            package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/job-application-stats")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class JobApplicationStatsController {

    @Autowired
    private JobApplicationStatsRepository jobApplicationStatsRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobExportService jobExportService;

    @GetMapping
    public List<JobApplicationStats> getAllStats() {
        return jobApplicationStatsRepository.findAllSortedByJobId();
    }

    @PostMapping
    public JobApplicationStats createStats(@RequestBody JobApplicationStatsRequest request) {
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        JobApplicationStats stats = new JobApplicationStats(job, request.getApplicationsFilled(), request.getApplicationsAccepted());
        JobApplicationStats savedStats = jobApplicationStatsRepository.save(stats);
        jobExportService.exportJobsToSqlFile();
        return savedStats;
    }

    @PutMapping("/{id}")
    public JobApplicationStats updateStats(@PathVariable Long id, @RequestBody JobApplicationStatsRequest request) {
        JobApplicationStats stats = jobApplicationStatsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stats not found"));
        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));
        stats.setJob(job);
        stats.setApplicationsFilled(request.getApplicationsFilled());
        stats.setApplicationsAccepted(request.getApplicationsAccepted());
        JobApplicationStats updatedStats = jobApplicationStatsRepository.save(stats);
        jobExportService.exportJobsToSqlFile();
        return updatedStats;
    }

    @DeleteMapping("/{id}")
    public void deleteStats(@PathVariable Long id) {
        jobApplicationStatsRepository.deleteById(id);
        jobExportService.exportJobsToSqlFile();
    }
}
