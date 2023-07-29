# roamnote
Send notes and URLs to Roam from MacOSX and iOS using Siri, or the Share Sheet, or the Services/Context menu

1. Create a roam block containing the text {{[[roam/js]]}}
2. Create a javascript code block as a child, containing the code in roamnote.js
3. Create your own databaseToken. This should contain only numbers or letters. It should be unique
4. Add your databaseToken to the appropriate place in the javascript code.
5. You can change noteTag and timeInterval or leave default. Please do not leave timeInterval at less than 10 minutes when you have finsinhed testing unless you have set up your own database, in which case change databaseURL
6. Download the Apple Shortcut 'Roam Note' from https://www.icloud.com/shortcuts/e2cacf8bca6b401fbb9b8f349792da26
8. When you first run the shortcut, enter the same databaseToken
9. try "Hey Siri, Roam Note"
10. try sharing a page from Chrome, Arc or Safari using the Share Menu -> Shortcuts -> Roam Note
11. try selecting text and R clicking / Ctl clicking on it, then Services->Roam or Share -> Shortcuts -> Roam Note
12. on Mac, add Shortcuts to the MenuBar and then select 'Roam Note' from there
13. on iOS, in the Shortcuts App, add  'Roam Note' to the Home Screen and run the app
14. In the latest version of the js code, if the url is an image or pdf file, roamnote will attempt to import the file into Roam. pdfs will often not work due to CORS restrictions. Images will need to be opened in their own tab before sharing, or the url of the image can be copied and then pasted into Roam Note (The Roam Note that runs in the SHortcuts on the MenuBar is useful for this, or I use the shortocde opt-ctl-R).


## Notes
    1. your Mac or iOS device may hear 'Roam Note' as 'Rome Note'. If so, duplicate the shortcut Roam Note and rename the duplicate to 'Rome Note'
    2. notes are sent and stored unencrypted. Do not use personal or private data. Use at your own risk.
    3. The php code I used for the server is in roamnotes.php. You can use my server so you won't need to use this, but also feel free to implement your own.

## Credit
    This implementation is based off the idea of Artur Piszek
    Firebase did my head in
    https://piszek.com/2022/01/13/firebase2roam/ 
