-- SQL Export of Job Data
-- This file will be automatically updated when job data changes in the backend.
DELETE FROM job;
INSERT INTO job (id, title, company, salary, sector) VALUES (2, 'Updated Test Job', 'Updated Company', 55000.000000, 'Updated Testing');
INSERT INTO job (id, title, company, salary, sector) VALUES (5, 'Log Test', 'Log Corp', 80000.000000, 'Log');
INSERT INTO job (id, title, company, salary, sector) VALUES (6, 'Flush Test', 'Flush Corp', 90000.000000, 'Flush');
INSERT INTO job (id, title, company, salary, sector) VALUES (7, 'Debug Test', 'Debug Corp', 100000.000000, 'Debug');
INSERT INTO job (id, title, company, salary, sector) VALUES (8, 'Final Debug', 'Final Corp', 110000.000000, 'Final');
INSERT INTO job (id, title, company, salary, sector) VALUES (33, 'Restart Test', 'Restart Corp', 120000.000000, 'Restart');
