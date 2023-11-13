# Project Employee Portal
 Employee Portal
Instructions 

1) Install WAMP on the system.

2) Replace httpd config file contents with the contents of httpd configuration file in this repo.

3) Open phpmyadmin in localhost and create new database with name eptables.

4) Import all the tables into it using eptables SQL file.

5) Navigita to Apache installation folder and replace www folder with my-app folder. The final path should be www/my-app.

6) Install Node.js in a relevant folder other than Apache installation or on desktop. 

7) In the same folder or desktop, install sql-await and express.js using npm install command.

8) Now place epbackend.js in the Node.js installation folder or on desktop.

9) Create a new folder in the same location or on desktop with name epstorage.

10) Run the backend using npm epbackend.js command.

11) Start the WAMP server. Going to localhost will show the home page.