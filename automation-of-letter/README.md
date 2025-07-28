📄 Automation of FLN Letter Generation
Overview
In this module of the FLN Data Analysis project, we built an automated workflow using Google Apps Script to generate personalized Foundational Literacy and Numeracy (FLN) letters at scale. These letters are distributed to teachers across various schools and batches, and the automation eliminates the manual workload traditionally involved in customizing each document.

This project leverages the integration between Google Sheets, Google Docs, and Google Drive, orchestrated by a custom script written in Google Apps Script (GAS).

Problem Statement
Previously, teachers' letters were created manually by copy-pasting content into a Google Doc template, adjusting dates, names, gender-based salutations, time, subjects, and batch numbers — a process that was time-consuming, error-prone, and inefficient for large-scale rollouts.

Automation Objective
The goal was to automate the following:

Read teacher-specific data (name, gender, school, subjects, etc.) from a Google Sheet.

Use a common Google Docs template with placeholders.

Replace placeholders with real data for each teacher.

Save the file with a clear naming format: B16 Suguna V (where B16 is the batch and Suguna V is the teacher's full name).

Organize files inside batch-wise folders in Google Drive.

Tools & Technologies
Google Sheets: Source of structured data (rows for each teacher).

Google Docs: Standardized letter template with merge placeholders like {{TeacherName}}, {{SchoolName}}, etc.

Google Apps Script: JavaScript-based scripting platform used to automate interactions between Sheets, Docs, and Drive.

Google Drive: Storage and organization of generated letters by batch.

Add README for automation-of-letter module


