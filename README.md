To send notes,URLs, pdfs and images from MacOSX and iOS to Roam Research using Siri, the Share Sheet, or the Services/Context menu, follow these steps:

1. Create a new block in your Roam graph with the text `{{[[roam/js]]}}`.

2. Make a child block under the `{{[[roam/js]]}}` block, and set it as a JavaScript code block. Copy and paste the code from `roamnote.js` into this block.

3. Generate your own unique `databaseToken`. This token can only contain numbers or letters, for example, "6DftgR64aY".

4. Search for the designated area in the JavaScript code to place your `databaseToken`, and insert it there.

5. Optional: Modify `noteTag` and `timeInterval` in the code. If you're using the default database server at lemlink.com.au, keep `timeInterval` greater than 5 minutes after testing.

6. Import the Apple Shortcut 'Roam Note' from [this link](https://www.icloud.com/shortcuts/e2cacf8bca6b401fbb9b8f349792da26).

7. Upon initial execution of the shortcut, you will be prompted to input the `databaseToken` you generated in step 3.

8. Test the shortcut by saying, "Hey Siri, Roam Note".

9. For MacOSX users, share a page from Chrome, Arc, or Safari using the following path: Share Menu -> Shortcuts -> Roam Note.

10. Try selecting text, then right-click or control-click on it. Choose either Services -> Roam or Share -> Shortcuts -> Roam Note.

11. For MacOSX users, add Shortcuts to the MenuBar and select 'Roam Note' from the options.

12. On iOS, you can use the 'Roam Note' option on the share menu to share a webpage, image, or text.

13. In the iOS Shortcuts App, add 'Roam Note' to the Home Screen and execute the app.

14. The latest `roamnote.js` code will attempt to import an image or PDF file's URL into Roam. Note that due to CORS restrictions, PDFs may not work. Images must be opened in a separate tab before sharing, or you can copy the image URL and paste it into 'Roam Note'.

   Please be aware of the following:

   1. Your Mac or iOS device might misinterpret 'Roam Note' as 'Rome Note'. If this happens, create a duplicate of the 'Roam Note' shortcut and rename it to 'Rome Note'.

   2. All notes are sent and stored unencrypted, so avoid using personal or sensitive information. Use at your own risk.

   3. The PHP code for the server is available in `roamnotes.php`. You can utilize my server, or feel free to set up your own.

Credit: This implementation is based on the idea by Artur Piszek. [Here's the link to the source](https://piszek.com/2022/01/13/firebase2roam/).
