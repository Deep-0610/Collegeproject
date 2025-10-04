package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Logger;

@Service
public class JobExportService {

    @Autowired
    private JobRepository jobRepository;

    private static final Logger logger = Logger.getLogger(JobExportService.class.getName());
    private static final String EXPORT_FILE_PATH = "e:/Collegeproject/backend/job_data_export.sql";

    public void exportJobsToSqlFile() {
        logger.info("Starting export of job data to SQL file");
        List<Job> jobs = jobRepository.findAll();
        logger.info("Found " + jobs.size() + " jobs to export");

        // Use absolute path to ensure correct file location
        Path absolutePath = Paths.get(EXPORT_FILE_PATH).toAbsolutePath();
        logger.info("Export file absolute path: " + absolutePath.toString());

        logger.info("About to check backend directory");
        try {
            // Ensure the backend directory exists
            Path backendDir = absolutePath.getParent();
            logger.info("Backend directory path: " + backendDir.toString());
            if (!Files.exists(backendDir)) {
                Files.createDirectories(backendDir);
                logger.info("Created backend directory");
            } else {
                logger.info("Backend directory already exists");
            }
        } catch (IOException e) {
            logger.severe("Error creating backend directory: " + e.getMessage());
            e.printStackTrace();
            return;
        }
        logger.info("Backend directory check completed");

        logger.info("About to enter try block for writing to file");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(absolutePath.toFile()))) {
            logger.info("Entered try block, creating BufferedWriter");
            writer.write("-- SQL Export of Job Data\n");
            writer.write("-- This file will be automatically updated when job data changes in the backend.\n");
            writer.write("DELETE FROM job;\n");
            logger.info("Wrote header and DELETE statement");
            for (Job job : jobs) {
                String sql = String.format(
                    "INSERT INTO job (id, title, company, salary, sector) VALUES (%d, '%s', '%s', %f, '%s');\n",
                    job.getId(),
                    escapeSql(job.getTitle()),
                    escapeSql(job.getCompany()),
                    job.getSalary(),
                    escapeSql(job.getSector())
                );
                logger.info("Writing SQL line: " + sql.trim());
                writer.write(sql);
            }
            writer.flush();
            logger.info("Flushed writer and successfully exported " + jobs.size() + " jobs to " + absolutePath.toString());
        } catch (IOException e) {
            logger.severe("Error writing to export file: " + e.getMessage());
            e.printStackTrace();
        }
        logger.info("Exited try block");
    }

    private String escapeSql(String input) {
        if (input == null) return "";
        return input.replace("'", "''");
    }
}
