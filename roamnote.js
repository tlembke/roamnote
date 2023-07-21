// Change these constant
// you can make up your own databaseToken as long as it is unique. Letters and digits only
// use the same databseToken in the Apple Shortcut

const databaseToken = 'YourTOKENhereDigitsandLettersOnly';

// You shouldn't need to change these, but you can.
// After testing, please change timeInterval back to at least 10 minutes

const noteTag = "#Inbox";
const databaseURL = 'https://lemlink.com.au/roamnotes.php';
const timeInterval = 10; // in minutes

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

function importFromRoamnote() {
    window.fetch(databaseURL + '?auth=' + databaseToken)
        .then(response => response.text())
        .then(text => {
            if (!text.trim()) {
                return;
            }
            const data = JSON.parse(text);

            // Now, 'data' is an array of notes, so we use forEach to iterate over each note
            data.forEach(noteObj => {
                var entry = noteObj.Note; // Access the "Note" property of each note object
                console.log('Entry:', entry);

                entry = '{{[[TODO]]}} ' + entry + ' '+ noteTag;

                window.roamAlphaAPI.createBlock({
                    "location": { "parent-uid": getTodayUid(), "order": "last" },
                    "block": { "string": entry }
                });
            });
        })
      .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            window.setTimeout(importFromRoamnote, timeInteral * 60 * 1000); // Run in another 10 minutes
        });
}
window.setTimeout( importFromRoamnote, 60 * 1000 ); // We run this a minute after Roam starts.