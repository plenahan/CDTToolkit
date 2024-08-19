# CDTToolkit

## Maintaining the Server

CDTToolkit runs on a Node.js server and uses pm2 to run it in the background of our VM. ([Documentation for pm2](https://pm2.keymetrics.io/docs/usage/quick-start/))

If the server stops running for some reason, follow the steps below to get the server back up again. Some reasons the server may be down is a user ran into an error that caused the server to crash, or a developer stopped the server to pull changes from the repository. Make sure you are on the ISU Wi-Fi or VPN before proceeding.

### 1. Login to VM
Open "Remote Desktop Connection" and enter the VM URL. Our VM URL is "cdttoolkit.ece.iastate.edu". Enter our VM password to login.

### 2. Open "Visual Studio Code"
It may already be open. If it isn't, open it and open the "CDTToolkit" folder. You should see a "Terminal" window on the bottom. If you don't, click the "View" tab in the top-left and select "Terminal". This should open the terminal in Visual Studio. This is where you will enter commands. The path should be "PS C:\Users\vm-user\Documents\Toolkit\CDTToolkit>". If you see a different path, make sure you have opened the correct folder in Visual Studio.

### 3. Check if the server is running
To check the status of the server, type "pm2 list" in the terminal and hit enter. If the server is running correctly, you should see a table entry with a name of "server" and a status of "online". If the status is "offline"  or you don't see any table entries, the server is not running.

### 4. Restart the server
To restart the server, type "pm2 restart all" and hit enter. This should re-run the server assuming there are no errors from any potential code changes. If restarting the server didn't work, type "pm2 stop all" and hit enter. This will stop all running servers. Then, type "npm run start" and hit enter. This will run the script "pm2 start server.js" and should start the server successfully. If neither of these work, there is likely an error in the server code that will need to be changed.


## Navigating the Toolkit

### [Home Page](http://cdttoolkit.ece.iastate.edu/)
The home page consists of a basic description of what the toolkit consists of with some imagery. You can navigate the rest of the toolkit using the [NavBar](#navbar), the [SideBar](#sidebar), or by clicking 'Get Started' which will bring you to the [first stage of Design Thinking](http://cdttoolkit.ece.iastate.edu/empathize).

### NavBar
The NavBar consists of 6 navigation options:
1. Home - links to the [Home Page](#home-page)
2. Learn - links to the [Learn Page](#learn)
3. Create - lists navigation options to the stages of design thinking
   - Home - brings you to the [Create Page](http://cdttoolkit.ece.iastate.edu/create) that allows you to navigate to the stages and gives a brief description of each
   - Empathize - brings you to the [Empathize Page](#empathize) that allows you to navigate to empathize tools
   - Define - brings you to the [Define Page](#define) that allows you to navigate to define tools
   - Ideate - brings you to the [Ideate Page](#ideate) that allows you to navigate to ideate tools
   - Prototype - brings you to the [Prototype Page](#prototype) that allows you to navigate to prototype tools
   - Test - brings you to the [Test Page](#test) that allows you to navigate to test tools
4. Login - allows you to [login](#login) with your Google account
5. Logout - logs you out of the account you're currently logged into
6. Teams - brings you to your [Teams](#teams)

### SideBar

### [Learn](http://cdttoolkit.ece.iastate.edu/learn)


### [Empathize](http://cdttoolkit.ece.iastate.edu/empathize)


### [Define](http://cdttoolkit.ece.iastate.edu/define)


### [Ideate](http://cdttoolkit.ece.iastate.edu/ideate)


### [Prototype](http://cdttoolkit.ece.iastate.edu/prototype)


### [Test](http://cdttoolkit.ece.iastate.edu/test)


### [Login](http://cdttoolkit.ece.iastate.edu/account/login)


### [Teams](http://cdttoolkit.ece.iastate.edu/account/teams)

## Code Overview
