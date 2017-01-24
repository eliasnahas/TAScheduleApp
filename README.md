"# TAScheduleApp" 

This is a web app that reads a JSON file to load appointments into a list

From the list you can edit individual appointments, create a new appointment or delete an appointment.

The individual appointment page will display all of the information about your appointment and let you either edit and save or delete the appointment.

This app uses HTML sessionStorage to store the information once it has been loaded from the JSON file.

Future revisions will include a reset button (clear sessionStorage and reload), a "Write to JSON file" button (store appointments permanently), and a proper date/time chooser and formatting for the list view and appointment view.

To run this, install Node.js and run the following:

"npm install"
"npm run dev"

and visit http://localhost:8080