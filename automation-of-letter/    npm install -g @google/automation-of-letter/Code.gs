function generateFLNLetters() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const templateId = 'xxxxx'; // Replace with your actual template ID
  const parentFolder = DriveApp.createFolder('FLN_Letters_' + new Date().toISOString());

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    if (row.length < 11) {
      Logger.log(`Skipping row ${i + 1}: not enough columns`);
      continue;
    }

    const [
      date, schoolName, schoolAddress, teacherName, startDate, standards,
      gender, startTime, endTime, language, batchNo
    ] = row;

    if (!teacherName || !batchNo || !language) {
      Logger.log(`Skipping row ${i + 1}: missing data`);
      continue;
    }

    const salutation = gender === 'M' ? 'Headmaster' : 'Headmistress';
    const greeting = gender === 'M' ? 'Sir' : 'Madam';
    const honorific = gender === 'M' ? 'Mr.' : 'Ms.';

    let subjects = 'Maths, English, Science';
    if (typeof language === 'string') {
      const langLower = language.toLowerCase();
      if (langLower === 'tamil') {
        subjects = 'Maths, English';
      } else if (langLower === 'english') {
        subjects = 'English, Science and Maths';
      }
    }

    // Create folder for this batch
    let batchFolder;
    const folders = parentFolder.getFoldersByName(batchNo);
    batchFolder = folders.hasNext() ? folders.next() : parentFolder.createFolder(batchNo);

    // Correct filename format: "B16 Suguna V"
    const fileName = `${batchNo} ${teacherName}`;

    // Copy the template and personalize it
    const copy = DriveApp.getFileById(templateId).makeCopy(fileName, batchFolder);
    const doc = DocumentApp.openById(copy.getId());
    const body = doc.getBody();

    body.replaceText('{{Date}}', date || '');
    body.replaceText('{{SchoolName}}', schoolName || '');
    body.replaceText('{{SchoolAddress}}', schoolAddress || '');
    body.replaceText('{{TeacherName}}', teacherName || '');
    body.replaceText('{{StartDate}}', startDate || '');
    body.replaceText('{{Standards}}', standards || '');
    body.replaceText('{{Salutation}}', salutation);
    body.replaceText('{{Greeting}}', greeting);
    body.replaceText('{{Honorific}}', honorific);
    body.replaceText('{{StartTime}}', startTime || '');
    body.replaceText('{{EndTime}}', endTime || '');
    body.replaceText('{{Subjects}}', subjects);

    doc.saveAndClose();
  }

  Logger.log("All letters created and saved in their batch folders.");
}

    
