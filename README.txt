API  calls:

1. for scheduling a meeting :-
url- "/meetings"
request type - POST
content-type - application/json
request body - {
"title": "...",
"participants": [ {"name": "...", "email": "...", "rsvp": "..."} ],
"startTime": "dd-mm-yyyy||aa:bb",
"endTime": "dd-mm-yyyy||aa:bb"

//Note: dd-mm-yyyy is the date format and aa:bb ranges from 00:00 to 23:59 .
Year of date should be kept greater than or equal to 2021 to pass the validity check.
}
the scheduled meeting is returned as response to the request.


2. for getting meeting with id :-
url - "/meeting/:id"
request type - GET
The meeting with the provided id is returned as response.

3. for getting meetings within a time frame
url - "/meetings/?start=dd-mm-yy||aa:bb&end=dd-mm-yyyy||aa:bb"
request type - GET
An array of meetings that fall with the mentioned within time limits is returned as the response

4. for getting all meetings of a participant with given email id.
url - "/meeting/participant=<email>"
request type - GET
An array of all meetings of the participant is returned as the response.




=>NOTE:  1) async-await functionality has been used to maintain thread safety.
2) mongoDB has been chosen for storage and operated via mongoose module.
3) expressJS has been used for routing requests.
4) uuid module has been used to generate an id for each meeting.
5) each functionality has been mainained in a separate .js file.
