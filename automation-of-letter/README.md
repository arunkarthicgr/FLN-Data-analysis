📄 Automation of FLN Letter Generation
Overview
In this module of the FLN Data Analysis project, we built an automated workflow using Google Apps Script to generate personalized Foundational Literacy and Numeracy (FLN) letters at scale. These letters are distributed to teachers across various schools and batches, and the automation eliminates the manual workload traditionally involved in customizing each document.

This project leverages the integration between Google Sheets, Google Docs, and Google Drive, orchestrated by a custom script written in Google Apps Script (GAS).

Problem Statement
Previously, teachers' letters were created manually by copy-pasting content into a Google Doc template, adjusting dates, names, gender-based salutations, time, subjects, and batch numbers — a process that was time-consuming, error-prone, and inefficient for large-scale rollouts.

## Solution and Workflow

This automation solves the above problem using an end-to-end Google Apps Script (`generateFLNLetters()`), triggered directly from a Google Sheet containing the teacher and batch data.

### 🔁 The Script Automates:

1. **Reading each row** from a structured Google Sheet
2. **Extracting dynamic fields** like teacher name, school address, gender, batch, and language
3. **Selecting salutation and greeting** based on gender:
   - `"M"` → "Mr.", "Sir", "Headmaster"
   - `"F"` → "Ms.", "Madam", "Headmistress"
4. **Selecting subject list** based on language:
   - If **English** → Subjects: `English, Science and Maths`
   - If **Tamil** → Subjects: `Maths, English`
   - Else default: `Maths, English, Science`
5. **Replacing placeholders** in a Google Docs template like `{{TeacherName}}`, `{{SchoolName}}`, `{{Subjects}}` etc.
6. **Saving the final letter** as a new document inside a Google Drive folder named after the batch
7. **Naming the file** as:  
   📝 `B16 Suguna V`  
   (where `B16` = batch number, and `Suguna V` = teacher full name)

---

## Workflow Diagram

![FLN Letter Workflow](./A_flowchart_diagram_visually_represents_an_automat.png)

---

## Tools & Technologies

- **Google Sheets**: Source of dynamic input data
- **Google Docs**: Standard template document with placeholder fields
- **Google Apps Script**: Serverless automation that bridges Sheets, Docs, and Drive
- **Google Drive**: Used for storing organized output letters in batch-wise folders

---

## Code Highlights

- `generateFLNLetters()` reads data from the second row onwards to avoid headers.
- The script checks for missing fields and skips incomplete rows.
- Folders are automatically created if not already present (`getFoldersByName()`).
- Files are named using both batch number and teacher’s name for traceability.
- Each letter is saved in the correct batch folder.

---

## Output Example

For the row:
- `TeacherName`: Suguna V  
- `BatchNo`: B16  
- `Gender`: F  
- `Language`: English  

The script will:
- Use salutation: **Ms.**
- Use greeting: **Madam**
- Select subjects: **English, Science and Maths**
- Generate file name: **`B16 Suguna V`**
- Save it inside: `B16` folder in Google Drive

---

## Benefits

- 🔄 **Fully automated**, scalable for hundreds of records
- 🧠 **Context-aware** logic (gender, language, subjects)
- 🗂️ **Organized output** by batch and teacher
- 📑 **Error-free letters** with consistent formatting
- 🚀 **Fast execution** directly from Google Sheets

---

## Future Improvements

- Add UI buttons in the Google Sheet to trigger script with one click
- Log status of each letter (success/failure) in a new column
- Email letters to each teacher automatically
- Extend to support multiple templates or regional formats
- Integrate analytics on number of letters generated

---

## Conclusion

This automation is a robust, real-world solution that combines the flexibility of Google Workspace tools with the power of cloud scripting. It transforms a repetitive clerical task into a seamless digital workflow — ready to be scaled, improved, and reused across any educational program or organizational document processing system.

---

Add README for automation-of-letter module


