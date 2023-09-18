<!-- Author _Vee -->
<!-- Sept 05 2023 0:12 -->
# Branch Meetings

This document entails documentation about Pharmaplus ZiadaLite Communacation meetings.Br

## Requirements

- Meetings will happen on mondays between a certain time and another
- if a meeting is not concluded by the end time Ziada is closed untill the meeting is logged.
- A meeting will be created, opened, closed and confirmed by the users in attendance.
- If admin is logged in // get all meetings,  else get branch meetings

### Meeting Resources

1. Meetings
    **Properties**
    1. Meeting Id
    2. Type
       1. |Company| |Branch| |Regional|
    3. Created By
    4. Created At
    5. Chairperson
    6. Secretary
    7. Host Branch
    8. Attended By *(A list of attendees)*
    9. Closed At
    10. Closed By
    11. Confirmed By

2. Minutes
    **Properties**

   1. Minute Id
   2. Meeting Id
   3. Minute Id
   4. Type
      1. |Default| |User|
   5. Title
   6. Proposed By -D Null
   7. Seconded By -D Null
   8. Discussion
   9. Added At
   10. Added By (Meeting Secretary)

3. MeetingSettings (Settings)
    **Properties**

    **Weekly Meetings**

   1. Default Weekly Meeting Day *(Day)*
   2. Default Weekly Meeting Start *(Time)*
   3. Default Weekly Meeting End *(Time)*

4. Default Meeting Minutes
    **Properties**

    1. Minute Id
    2. Title
    3. Description
    4. Created By
    5. Created At
    6. Deleted By -D Null
    7. Deleted At -D Null

<!-- Flags -->
# Flags

 1. -D - Default Value
