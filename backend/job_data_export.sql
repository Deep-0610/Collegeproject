-- SQL Export of Job Data
-- This file will be automatically updated when job data changes in the backend.
DELETE FROM job;
INSERT INTO job (id, title, company, salary, sector) VALUES (1, 'Gbcehe', 'Spiroedu', 560000.000000, 'Technical');
INSERT INTO job (id, title, company, salary, sector) VALUES (2, 'dpas', 'Lysd', 12345.000000, 'Technical');
INSERT INTO job (id, title, company, salary, sector) VALUES (3, 'Enginner', 'dcwhcfbej', 457889.000000, 'Private Job seaker');
DELETE FROM job_application_stats;
INSERT INTO job_application_stats (id, job_id, applications_filled, applications_accepted) VALUES (1, 1, 33, 12);
INSERT INTO job_application_stats (id, job_id, applications_filled, applications_accepted) VALUES (2, 3, 56, 12);
