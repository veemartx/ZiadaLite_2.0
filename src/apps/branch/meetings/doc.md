<!-- This document highlights the structure and workings of the branch meetings module -->
# Meetings

This module allows branches to hold branch meetings with whey discuss several branch issues among other things

Meetings Db Schema

id
meetingId
meetingTitle // -> auto if not named  
branch // host branch
chairPerson //user id of the chair
secretary  //user id of the minutes taker // this is the person to create the minutes afer the meeting
createdBy // user id of the meeting creator
createdAt // timestamp when the meeting was created
attendedBy //  an array of attendant's user ids these to be added by the secretary and the each of the attendants to confirm.
startedAt
startedBy
adjournedAt
adjournedBy
status // [active,complete];

Meeting Minutes Db Schema

id
minuteId
minuteTitle // ->required
minuteDescription // -> A simple description about the minute. eg the goal, objective etc
minuteDiscussion -> the discussion about the minute.
minuteBy -> the user who suggested the minute // if default is default minuted
minuteAttachments-> An array of urls containing minute attachments. default = null

DefaultMeetingMinutes Db Schema
id
minuteTitle
minuteDescription
requiresAttachment // bool specified whether minute requires attachment
attachmentType  // if requires attachment a list [array] specifying the accepeted attachment type [image,document,audio,video]
hostBranch // the branch where the minute is set as default
status // [active,disabled].
                   Ability to toggle on  and off

## Features

    1. Ability to set default meeting minutes by branch.
    2. Ability to duplicate or set a minute default for all branches .
    3. Setting a minute already set as default in all branches should fail
    4. 


on The Front is . (Resources = Uploads)

// have a setting -> _"allowedUploadFileTypes"_-> an array of objects with the file type and a list of accepeted file extensions
                // eg  
                ``` js

                    let allowedUploadFileTypes={
                        image:['.jpg','.png','.webp','..jpeg'],
                        document:['.docx','.pdf'],
                        audio:['.mp3','.aac'],
                        video:['.mp4','.wav','.webm'];
                    }
                ```

Settings -> Sytem -> Uploads

                    Allowed Upload File Types 
 