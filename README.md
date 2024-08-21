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
   - Home - brings you to the [Create Page](http://cdttoolkit.ece.iastate.edu/create) that allows you to navigate to the stages and gives a brief description of each. You can also navigate to your [Notes](#notes).
   - Empathize - brings you to the [Empathize Page](#empathize) that allows you to navigate to empathize tools
   - Define - brings you to the [Define Page](#define) that allows you to navigate to define tools
   - Ideate - brings you to the [Ideate Page](#ideate) that allows you to navigate to ideate tools
   - Prototype - brings you to the [Prototype Page](#prototype) that allows you to navigate to prototype tools
   - Test - brings you to the [Test Page](#test) that allows you to navigate to test tools
4. Login - allows you to [login](#login) with your Google account
5. Logout - logs you out of the account you're currently logged into
6. Teams - brings you to your [Teams](#teams)

### SideBar
By clicking on the hamburger menu on the top left of any page, you can open the sidebar. The sidebar consists of three main sections: Creations, Account, and Notes.

The 'Creations' dropdown will reveal dropdowns of the five stages. These stage dropdowns will reveal dropdowns for each of the tools in that stage. These dropdowns will reveal the tools you have created. You can click on these to go to your creation. These tools can also be added to [Projects](#projects) by dragging and dropping from this section of the sidebar.

The 'Account' dropdown will reveal a link to the [Projects Page](#projects) and a link to your Profile page, which right now will either prompt you to login if you are not, or display your name to show you are logged in.

The 'Notes' area is used to quickly add thoughts during your design thinking process. This section will list your quick notes and allow you to add a new one by typing into the text field and clicking 'Create Note'. You can click on any of these notes to view them, and you can also click the red X next to them to delete them. You can also view these notes on the [Notes Page](#notes).

### [Learn](http://cdttoolkit.ece.iastate.edu/learn)

The Learn page is a space for users to learn more about the design thinking process, however it is currently incomplete. There is some description written by Dr. Fila, but the Define stage onward is not complete.

### Tool Pages
All tool pages follow a similar general template. At the top left of the page, the 'Back' button will take you back to the respective stage page. The main body of the page will list your tools in a grid format. Each tile will show the name and description of the tool. If there is an image with the tool, the tile will show the image as well. You can click on any of the tiles to view them. 

There are 4 fields under the header to help you filter your tools: 'Name', 'Created After', 'Created Before', and 'Sort By'. The 'Name' field will search for empathy maps with a similar name as your input. 'Created After' will set a date and only show empathy maps created after that date, and 'Created Before' will set a date and only show empathy maps created before that date. You can use both of these at the same time to create a time range you want to search for. The 'Sort By' dropdown has 4 options and can sort the empathy maps by the following: 'Oldest to Newest', 'Newest to Oldest', 'A-Z', and 'Z-A'. After setting your filters, you can click 'Search' to apply them. 

To create a new tool, click '(New+)' next to the tool title. When creating a new tool, you will always have the option of uploading a PDF instead of creating inside the toolkit. To do this, just click 'Browse...' and select the PDF you want to upload from your files and click create. If you want to stop, click 'Cancel'. 

If there are any changes to this page for a specific stage or tool, they will be mentioned when discussing the stages and tools below.

### [Empathize](http://cdttoolkit.ece.iastate.edu/empathize)

On the Empathize page, you will see the 3 empathize tools: Empathy Maps, Journey Maps, and Personas. Click the respective 'Call to action' link to navigate to that tools page. You can also click the 'Define' button next to 'Empathize' to go to [Define](#define).

- [Empathy Maps](http://cdttoolkit.ece.iastate.edu/empathymaps): The empathy maps page follows the general tool page template.
   - [Creating a new empathy map](http://cdttoolkit.ece.iastate.edu/empathymaps/new): An empathy map consists of 4 main sections to used to empathize with a student. You do this by filling out 4 main fields: "What do they see/hear?", "What do they want to do?", "What do they want to say?", and "What do they want to think/feel?". First, you can give you empathy map a name by inputting into the 'Name' field. Then, you can optionally add an image 'Browse' and selecting an image, as well as add a description of your empathy map. Then, there are a couple of ways you can start fillout out the 4 fields.
      - First, you can drag and drop (the page will default to this). To perform a drag and drop, input a answer to one or many of the fields into the 'Input' field and click 'Add'. The text you just inputted will appear just above the 'Input' field. Then, you can drag this text into any of the colorful boxes and drop it in. The text will appear in that field with a gray background. You can drag and drop this text into multiple fields.
      - The other way to input into the fields is by selecting which field you want to input into then adding text. To do this, click on the 'Field Select' dropdown to the right of the 'Input' field and select the specific field you want to input into. Once you have your field selected, input your answer into the 'Input' field and click 'Add'. The text will automatically be added to the field you selected. The text will also appear above the 'Input' field if you still want to drag it to another field. To go back to drag and drop, click the 'Field Select' dropdown and select 'Drag & Drop'.
      - To remove an answer you already added to one of the fields, click on it and the gray background will go away. The answer is now unselected and will not be included when you create the empathy map.
      - Click 'Create' to create your empathy map or 'Cancel' to go back to the tool page.
- [Journey Maps](http://cdttoolkit.ece.iastate.edu/journeymaps): The journey maps page follows the general tool page template.
   - [Creating a new journey map](http://localhost:3000/journeymaps/new): A journey map is used to imagine the journey of a student through a process. The y-axis of a journey map is a construct to measure by, such as an emotion. The x-axis is a sequence of events to measure the construct for. Your goal is to imagine the level of the construct at each event and create a journey for a persona.
      - To start, you can give your journey map a name by inputting into the 'Name' field.
      - Then, you can determine a construct, aka, what you will be measuring during this journey (happiness, confidence, engagement, etc.). Do this by entering your construct into the 'Construct' field. You will see the y-axis of the journey map change as you type.
      - The journey map defaults to having 4 events with a random path for a persona named 'Example'. To remove an event, you can select the event by using the 'Select Event' dropdown and clicking 'Remove Event'. To remove a persona, you can select the persona by using the 'Add/Select Persona' dropdown and clicking 'Remove Persona'.
      - Once you have removed the default events and persona, you can add your own events and personas. The personas that this tool is using are personas that you've created so you must have some personas created to continue (Learn more about creating personas below). To add the personas you want to map this journey for, select a persona from the 'Add/Select Persona', select a color from the dropdown to the right of the 'Add/Select Persona' dropdown, and click 'Add Persona'. The Persona will be added to the bottom of the journey map in the legend with the color and persona name. If you have events already added, you will see the persona added to the journey map with a random path.
      - To add an event input the event into the 'Add Event' field and click 'Add Event'. This will append the event to the right of the other events. If you have personas on the map, the point for the new event will automatically correspond to the slider on the right for all current personas.
      - The slider on the right of the journey map is used to change the path for each persona for each event. To do this, select the persona you want to change using the 'Add/Select Persona' dropdown and select the event you want to change the persona at using the 'Select Event' dropdown. Then move the slider up and down to move the point on the path (NOTE: The slider seems to appear differently on different browsers. On Firefox, the slider is vertical and is able to slide up and down, however, on Chrome the slider is horizontal and slides left and right, which looks and operates much worse. Keep this in mind when using on Chrome.). Do this for each event and personas to create your map.
      - You can create annotations for each point on the paths to make notes about why you put the point where you did. To create an annotation, select the persona you want to add an annotation for using the 'Add/Select Persona' dropdown and select the event you want to add an annotation at using the 'Select Event' dropdown and click 'Create Annotation'. The annotation will appear with default text. To change the text, select the annotation the same way you did when you added it and type in the 'Edit Annotation' field. The annotation text will update as you input text. To delete an annotation, select it the same way you did before and click 'Delete Annotation'.
      - Click 'Create' to create your journey map or 'Cancel' to go back to the tool page.
- [Personas](http://cdttoolkit.ece.iastate.edu/personas): The personas page follows the general tool page template.
   - [Creating a new persona](http://cdttoolkit.ece.iastate.edu/personas/new): A persona is used to imagine what certain types of students are like. You can use them as the base of other tools. There are three types of personas you can create. To select the type of persona you want to create, select an option from the 'Persona Type' dropdown. The fields will be updated for that type of persona.
      - Creating a Goal Directed Persona:
      - Creating a Simple Persona:
      - Creating a Custom Persona:

### [Define](http://cdttoolkit.ece.iastate.edu/define)

On the Define page, you will see the 3 define tools: Need Statements, Abstraction Ladders, and Rocks. Click the respective 'Call to action' link to navigate to that tools page. You can also click the 'Empathize' button to the left of 'Define' to go back to [Empathize](#empathize) or the 'Ideate' button to the right of 'Define' to go to [Ideate](#ideate).


### [Ideate](http://cdttoolkit.ece.iastate.edu/ideate)

On the Ideate page, you will see the 2 ideate tools: Lotus Blossoms and Brainstorms. Click the respective 'Call to action' link to navigate to that tools page. You can also click the 'Define' button to the left of 'Ideate' to go back to [Define](#define) or the 'Prototype' button to the right of 'Ideate' to go to [Prototype](#prototype).


### [Prototype](http://cdttoolkit.ece.iastate.edu/prototype)

On the Prototype page, you will see the 1 prototype tool: Prototype. Click the respective 'Call to action' link to navigate to that tool page. You can also click the 'Ideate' button to the left of 'Prototype' to go back to [Ideate](#ideate) or the 'Test' button to the right of 'Prototype' to go to [Test](#test).

### [Test](http://cdttoolkit.ece.iastate.edu/test)

On the Test page, you will see the 1 test tool: Test. Click the respective 'Call to action' link to navigate to that tool page. You can also click the 'Prototype' button to the left of 'Test' to go back to [Prototype](#prototype).


### Editing and Deleting Tools

### Comments


### [Notes](http://cdttoolkit.ece.iastate.edu/notes)


### [Login](http://cdttoolkit.ece.iastate.edu/account/login)


### [Projects](http://cdttoolkit.ece.iastate.edu/projects)


### [Teams](http://cdttoolkit.ece.iastate.edu/account/teams)


## Code Overview
