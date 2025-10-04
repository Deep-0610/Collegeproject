package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationStatsRepository extends JpaRepository<JobApplicationStats, Long> {

    @Query("SELECT s FROM JobApplicationStats s ORDER BY s.job.id ASC")
    List<JobApplicationStats> findAllSortedByJobId();
}
