To send notes, URLs, pdfs and images from MacOSX and iOS to Roam Research using Siri, the Share Sheet, or the Services/Context menu, follow these steps:
NB - this is alpha so use at your own risk!

1. Create a back up of your graph before testing. Use at your own risk.
2. Download the Apple Shortcut 'Roam Note' from [iCloud](https://www.icloud.com/shortcuts/3cea56582d124c0f93664485ef6571ba)
3. Upon initial execution of the shortcut, you will be prompted to input your Roam Graph API Token and the name of your roam graph. These are available from Roam > Settings > Graph
4. You can use the default tags of 'roamnote' and 'new'. 'new' will be removed when the newly created block is processed (cf below). If you don't want to post process your notes, leave blank.
5. That's it!
6. You can test the shortcut by saying, "Hey Siri, Roam Note".
7. On MacOSX Shortcuts App > Settings > Sidebar, select Share Sheet, Apple Watch, Quick Actions and Menu Bar (if not already selected)
8. On MacOSX, you can run 'Roam Note' from Siri, or from the MenuBar, or from the Share Sheet or Services menu.
9. In iOS, in the Shortcuts menu, add 'Roam Note' to the home screen and you have a new app. You can also use Roam Note from the Sharing Sheet. Try sharing a web page or image or selected text.

If you would like to post-process the newly created roamnote blocks, you can add the javascript in the file roamnotes.js to your roam graph. This is optional.

Post-processing will check blocks added from Roam Note to see if they contain a url that points to a pdf or image. If they do, the image or pdf will be imported into your graph. 

Try added a block 'https://upload.wikimedia.org/wikipedia/commons/6/61/Astrolabe-black.png #roamnote #new' to see it in action.

The default setting is to check for new blocks every 2 minutes. You can change this by changing the constant 'timeInterval'

Note that due to CORS restrictions on some servers, PDFs will not always upload successfully. On IOS, you can share an image or the url link to a pdf file using the Share Sheet. In Safari, images must be opened in a separate tab before sharing that tab, or you can copy the image URL and paste it into 'Roam Note'. (sharing an image in iOS sends a URL, sharing an image on Mac sends the blob)

To add the javascript that enables post processing :

1. Create a new block in your Roam graph with the text `{{[[roam/js]]}}`.
2. Make a child block under the `{{[[roam/js]]}}` block, and set it as a JavaScript code block. Copy and paste the code from `roamnote.js` into this block.
3. Make sure 'tag1' and 'tag2' match the values you added to the shortcut
4. **Warning** Just in case, make sure you have a backup of your graph before clicking the button 'Yes, I know what I'm doing'. Use at your own risk.

   Please be aware of the following:

   1. Your Mac or iOS device might misinterpret 'Roam Note' as 'Rome Note'. If this happens, create a duplicate of the 'Roam Note' shortcut and rename it to 'Rome Note'.

   2. All notes are sent and stored unencrypted, so avoid using personal or sensitive information. Use at your own risk.


