# Hello, My name is Kyoung Hwan Namkoong and this is my COMP 482 Assignment 3 project.

Instructions on how to run the system:

1.  Download Node.js (version 14.15.1 or newer) from this link: https://nodejs.org/en/.
2.  Install Node.js on your computer.
3.  Download Microsoft Visual Studio Code (https://code.visualstudio.com/)
4.  Install Visual Studio Code on your computer.
5.  Open Visual Studio Code and click on File -> Open Folder... to the "nkg-graphics" folder
6.  Click Terminal -> New Terminal and you should see the terminal open up at the bottom of Visual Studio Code
7.  first, run the following command to check that node has been installed correctly: 
        node -v
    Make sure that it returns a value of "v14.15.1" or newer
8.  Next, run the following command to make sure the node package manager is installed:
        npm -v
    It should return a value of "6.14.8" or newer
9.  Next, we will install all the front end libraries using the following command:
        npm install
10. Afterwards, we will move to the back end and install the back end libraries as well:
    First, run the following command to change the directory to the backend:
        cd backend
    Next, run the following command to install the backend libraries:
        npm install
11. While the terminal is still in the backend directory, start the Server
    Run this command to start the server
        npm start server
    You should get the following messages
        Server is running on port: 5000
        MongoDB database connection established successfully
12. Open another terminal by following step 6.
13. We will run a command to run the front end now
    First, confirm that the terminal has been opened in the frontend, and not the backend:

    Run this command to run the front end
        npm run start
    It will take a few seconds to load, but the front end has started, a new tab/window should open to
    the localhost:3000 URL
14. You should now be able to explore the full NKG Graphics system with access to the database I have created.

