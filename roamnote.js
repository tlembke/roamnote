// Change these constant
// you can make up your own databaseToken as long as it is unique. Letters and digits only
// use the same databseToken in the Apple Shortcut

const databaseToken = 'YourTOKENhereDigitsandLettersOnly';

// You shouldn't need to change these, but you can.
// After testing, please change timeInterval back to at least 10 minutes

const noteTag = "#Inbox";
const databaseURL = 'https://lemlink.com.au/roamnotes.php';
const timeInterval = 10; // in minutes


function getFilename(theFile){
    segments = theFile.split("/");
    filename = segments[segments.length - 1];
    return filename.split(".")[0];
}

function checkURL(noteText) {
    try {
        // Parse the string as a URL
        const url = new URL(noteText);

        // Remove the query parameters
        const path = url.pathname.split('?')[0].toLowerCase();

        // Check if the path ends with a valid extension
        return path.endsWith('.pdf') || path.endsWith('.jpeg') || path.endsWith('.jpg') || path.endsWith('.gif') || path.endsWith('.png');
    } catch (err) {
        // If parsing as a URL throws an error, then it's not a valid URL
        return false;
    }
}


function getChildBlock(parent_uid, block) {
  // returns the uid of a specific child block underneath a specific parent block.
  // _parent_uid_: the uid of the parent block.
  // _block_: the text of the child block.
  let results = window.roamAlphaAPI.q(`
    [:find ?block_uid
     :in $ ?parent_uid ?block_string
     :where
     [?parent :block/uid ?parent_uid]
     [?block :block/parents ?parent]
     [?block :block/string ?block_string]
     [?block :block/uid ?block_uid]
    ]`, parent_uid, block);
  if (results.length) {
    return results[0][0];
  }
}

async function insertFile(fileURL) {
  try {
    const todayUID = getTodayUid();
    const response = await fetch(fileURL);
    const blob = await response.blob();

    const file = new File([blob], "blah.pdf", { type: blob.type });
    const theNewFile = await roamAlphaAPI.file.upload({ file: file });

    const filename = getFilename(fileURL);
    const theMarkdown = "["+ filename + "](" + fileURL + ")";

    await window.roamAlphaAPI.createBlock({
      "location": { "parent-uid": todayUID, "order": "last" },
      "block": { "string": theMarkdown }
    });

    let newBlockUID;
    let attempts = 0;

    while (!newBlockUID && attempts < 5) { // Limit to 5 attempts
      newBlockUID = getChildBlock(todayUID, theMarkdown);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for a second
    }

    if (!newBlockUID) {
      throw new Error('Could not get block UID');
    }

    await window.roamAlphaAPI.createBlock({
      "location": { "parent-uid": newBlockUID, "order": "last" },
      "block": { "string": theNewFile }
    });

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}


function zeroPad(data) {
    if (data < 10) {
        return '0' + data;
    }
    return '' + data;
}

function getTodayUid() {
    const d = new Date();
    return zeroPad(d.getMonth() + 1) + "-" + zeroPad(d.getDate()) + "-" + d.getFullYear();
}

async function importFromRoamnote() {
    const response = await window.fetch(databaseURL + '?auth=' + databaseToken);
    const text = await response.text();

    if (!text.trim()) {
        return;
    }

    const data = JSON.parse(text);

    for (const noteObj of data) {
        let entry = noteObj.Note;
        console.log('Entry:', entry);

        let skipPlainInsert = false;

        if (checkURL(entry)) {
            skipPlainInsert = await insertFile(entry);
        }

        if (!skipPlainInsert) {
            entry = '{{[[TODO]]}} ' + entry + ' '+ noteTag;

            window.roamAlphaAPI.createBlock({
                "location": { "parent-uid": getTodayUid(), "order": "last" },
                "block": { "string": entry }
            });
        }
    }

    window.setTimeout(importFromRoamnote, timeInterval * 60 * 1000);
}

window.setTimeout( importFromRoamnote, 60 * 1000 ); 
