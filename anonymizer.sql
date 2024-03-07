CREATE EXTENSION IF NOT EXISTS anon CASCADE;

-- Replace the first_name with a random first name
SECURITY LABEL FOR anon ON COLUMN employees.employee.first_name
IS 'MASKED WITH FUNCTION anon.fake_first_name()';

-- Replace the last_name with a random last name
SECURITY LABEL FOR anon ON COLUMN employees.employee.last_name
IS 'MASKED WITH FUNCTION anon.fake_last_name()';

-- Shift hire_dates by +/- 28 days
SECURITY LABEL FOR anon ON COLUMN employees.employee.hire_date
IS 'MASKED WITH FUNCTION anon.dnoise(employees.employee.hire_date, ''28 days''::interval)';

-- DANGER ZONE! Perform static anonymization. Do not run this on production.
-- This will replace all data in columns defined above with masked data!
SELECT anon.anonymize_database();
