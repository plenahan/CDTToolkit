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

### [Login](http://cdttoolkit.ece.iastate.edu/account/login)

If you are not logged in, you can go to the login page by clicking 'Login' from the [navbar](#navbar). On the login page, click 'Log In With Google' to login. Click the Google account you want to login with. You may be asked to allow some permissions, which you can do. Then, you'll be taken to your profile where you will see your first name displayed on the screen. Anytime you click 'Login' when you are already logged in, you will be taken to this screen.

To logout of your account, click the 'Logout' button from the [navbar](#navbar).

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
- [Personas](http://cdttoolkit.ece.iastate.edu/personas): The personas page follows the general tool page template. Personas can be used in other tools like Journey Maps.
   - [Creating a new persona](http://cdttoolkit.ece.iastate.edu/personas/new): A persona is used to imagine what certain types of students are like. You can use them as the base of other tools. There are three types of personas you can create. To select the type of persona you want to create, select an option from the 'Persona Type' dropdown. The fields will be updated for that type of persona.
      - Creating a Goal Directed Persona: The goal behind a Goal Directed Persona is to understand the desires and motivations of your types of students.
         - First, you can give your Persona a name by inputting into the 'Name' field.
         - Then, you can optionally give your Perona a description by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
         - Then, you can fill out the 3 main fields of a Goal Directed Persona. To describe who the Persona wants to be, input into the 'Who they want to be:' field. To describe what the persona wants to do, input into the 'what they want to do:' field. To describe how they want to feel, input into the 'How they want to feel:' field.
         - Click 'Create' to create your persona or 'Cancel' to go back to the tool page.
      - Creating a Simple Persona: The goal of a simple persona is to better understand the characteristics of your students.
         - First, you can give your Persona a name by inputting into the 'Name' field.
         - Then, you can optionally give your Perona a description by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
         - You can describe your persona's background & demographic by inputting into 'Background & Demographic'.
         - You can input the persona's hobbies and interests by clicking the '+' under 'Hobbies & Interests'. This will add an input field and a red 'X' below the '+'. You can add up to 10 input fields. Enter the persona's hobbies and interests into these fields. To remove an input, click the red 'X' under the input. Use this process to add the persona's 'Roles & Functions', 'Personalities & Emotions', and 'Values & Goals'.
         - Click 'Create' to create your persona or 'Cancel' to go back to the tool page.
      - Creating a Custom Persona: The goal of a custom persona is to give the user the freedom to create their own type of persona.
         - First, you can give your Persona a name by inputting into the 'Name' field.
         - Then, you can optionally give your Perona a description by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
         - To add a shorter input, click the '+' next to 'Line Input'. A 'Label' input and an 'Input' input will appear below. You can add your field label to the 'Label' and your response to the 'Input'. You can add up to 10 of these fields. Click the red 'X' next to the input if you want to delete it. If you want a bigger response, you can follow this process for the 'Textarea'.
         - Click 'Create' to create your persona or 'Cancel' to go back to the tool page.

### [Define](http://cdttoolkit.ece.iastate.edu/define)

On the Define page, you will see the 3 define tools: Need Statements, Abstraction Ladders, and Rocks. Click the respective 'Call to action' link to navigate to that tools page. You can also click the 'Empathize' button to the left of 'Define' to go back to [Empathize](#empathize) or the 'Ideate' button to the right of 'Define' to go to [Ideate](#ideate).

- [Need Statements](http://cdttoolkit.ece.iastate.edu/statements): The need statements page follows the general tool page template. The goal of a need statement is to define what a student needs in a concise, simple statement.
   - [Creating a Need Statement](http://cdttoolkit.ece.iastate.edu/statements/new): The structure of a need statement is the following: [User] needs (a way) to [Do Something] because [Insight about User]. Fill in each input to create your need statement. Click 'Create' to create your need statement or 'Cancel' to go back to the tool page.
- [Abstraction Ladders](http://cdttoolkit.ece.iastate.edu/abstractionladders): The abstraction ladders page follows the general tool page template. The goal of an abstraction ladder is to state a problem, why it's a problem, and how to solve it.
   - [Creating an Abstraction Ladder](http://cdttoolkit.ece.iastate.edu/abstractionladders/new): The abstraction ladder starts with one problem. The abstraction ladder will then go up and down to describe why that's a problem and how it's going to be solved.
      - First, you can give your abstraction ladder a name by inputting into the 'Name' field.
      - The abstraction ladder will start with one block named 'Start'. To change the text of this block and define your problem, click on the block and type in the field below the abstraction ladder. The block text will update as you type.
      - To explain why, click the 'Add Why?' button. A new block will appear to the top right of the last block. You can change the text the same way you did for the starting block.
      - To explain how, click the 'Add How?' button. A new block will appear to the bottom right of the last block. You can change the text the same way you did for the starting block.
      - You can add as many whys and hows as you'd like.
      - Click 'Create' to create your abstraction ladder or 'Cancel' to go back to the tool page.
- [Rocks](http://cdttoolkit.ece.iastate.edu/rocks): The rocks page follows the general tool page template. The goal of rocks is to determine the importance of tasks and problems/improvements.
   - [Creating Rocks](http://cdttoolkit.ece.iastate.edu/rocks/new): To create a rock, give it a name by inputting into the 'Name' field and a description into the 'Description' field. You can also give it a cover by clicking 'Browse' and uploading an image. Then, give the rock a size (level of importance/priority). Click 'Create' to create your rock or 'Cancel' to go back to the tool page.


### [Ideate](http://cdttoolkit.ece.iastate.edu/ideate)

On the Ideate page, you will see the 2 ideate tools: Lotus Blossoms and Brainstorms. Click the respective 'Call to action' link to navigate to that tools page. You can also click the 'Define' button to the left of 'Ideate' to go back to [Define](#define) or the 'Prototype' button to the right of 'Ideate' to go to [Prototype](#prototype).

- [Lotus Blossoms](http://cdttoolkit.ece.iastate.edu/lotusblossoms): The lotus blossoms page follows the general tool page template. The goal of a lotus blossom is to create ideas by building off of a central idea.
   - [Creating a Lotus Blossom](http://cdttoolkit.ece.iastate.edu/lotusblossoms/new): The lotus blossom starts with one block named 'Key Idea' in the center. This is the main idea you're building around.
      - First, you can give your lotus blossom a name by inputting into the 'Name' field.
      - Then, you can input your 'Key Idea' by typing in the input field below the lotus blossom. The key idea block text will change as you type.
      - To build off of your key idea, click the 'Create Annotation' button just above the input field. This will add a blossom to the left of the key idea, and add a new button, dropdown menu, and text input to the below the new blossom at the bottom of the lotus blossom. You can add up to 6 blossoms off of the key idea, 3 to the left, and 3 to the right.
      - Then, you can build off of these blossoms and create 2nd level blossoms. You can select you blossoms for the left and right side by using the dropdown menus that appeared. Once you select a blossom, clicking the corresponding 'Create Annotation' will create a second level blossom. You can follow this process for 3rd level blossoms as well. You can have 3 2nd level blossoms per blossom, and 2 3rd level blossoms per 2nd level blossom.
      - You can change the text of any blossom by selecting it with the dropdown by its text, then inputting into the corresponding input field.
      - Click 'Create' to create your lotus blossom or 'Cancel' to go back to the tool page.
- [Brainstorms](http://cdttoolkit.ece.iastate.edu/brainstorms): The brainstorms page follows the general tool page template. The goal of a brainstorm is to generate many ideas in one session.
   - [Creating a Brainstorm](http://cdttoolkit.ece.iastate.edu/brainstorms/new):
      - First, you can give your brainstorm a name by inputting into the 'Name' field.
      - Then, you can optionally give your brainstorm a description by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
      - Then, in the 'Ideas' input field, you can list your ideas.
      - Click 'Create' to create your brainstorm or 'Cancel' to go back to the tool page.

### [Prototype](http://cdttoolkit.ece.iastate.edu/prototype)

On the Prototype page, you will see the 1 prototype tool: Prototype. Click the respective 'Call to action' link to navigate to that tool page. You can also click the 'Ideate' button to the left of 'Prototype' to go back to [Ideate](#ideate) or the 'Test' button to the right of 'Prototype' to go to [Test](#test).

- [Prototypes](http://cdttoolkit.ece.iastate.edu/prototypes): The prototypes page follows the general tool page template. The goal of a prototype is to form a real thing based on your ideas.
   - [Creating a Prototype](http://cdttoolkit.ece.iastate.edu/prototypes/new): This tool is mostly incomplete, with not a lot of unique features. However you can still upload a PDF to store your prototype.
      - First, you can give your prototype a name by inputting into the 'Name' field.
      - Then, you can describe your prototype by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
      - Click 'Create' to create your prototype or 'Cancel' to go back to the tool page.

### [Test](http://cdttoolkit.ece.iastate.edu/test)

On the Test page, you will see the 1 test tool: Test. Click the respective 'Call to action' link to navigate to that tool page. You can also click the 'Prototype' button to the left of 'Test' to go back to [Prototype](#prototype).

- [Tests](http://cdttoolkit.ece.iastate.edu/tests): The tests page follows the general tool page template. The goal of a test is to get the impact of your prototypes.
   - [Creating a Test](http://cdttoolkit.ece.iastate.edu/tests/new):
      - First, you can give your test a name by inputting into the 'Name' field.
      - Then, you can optionally give your test a description by inputting into the 'Description' field and give it a cover by clicking 'Browse' and uploading an image.
      - You can input your test data into the 'Data' field.
      - You can input the metric you are measuring in the 'Metric' field.
      - You can input your goal for your test in the 'Goal' field.
      - Click 'Create' to create your test or 'Cancel' to go back to the tool page.


### Viewing, Editing, and Deleting Tools
When you are viewing a list of creations either on a tool page or in a [project](#projects) and click a creation, you will be taken to that creation's page. All tools are displayed in a straight-forward way, generally very similar to the format when creating it. You will also be able to see the date it was created and the user's email who created it. 

In the rop right of the page, there's a 'Back' button, an 'Edit' button, and a 'Delete' button. The back button will take you back to the tool page. The edit button will allow you to edit the tool. the edit page will look the same as the creation page, but all fields will be populated with the current values of the tool. You can edit any part of a tool and click 'Update' to save your changes. You will then be taken back to viewing the tool. The delete button will permanently delete your creation. Deletion cannot be undone.

### Comments
When viewing a creation, you will also see a comment section at the bottom of the screen. By typing in the text box and clicking 'Create' you can add comments to any tool. Comments will appear just above the text box along with the user's email that commented it, the time they commented it, and, if it's your comment, a 'Delete' button to permanently delete the comment. Comments can be viewed by anyone that has access to view the tool. 

Your comments will also appear in your [notes page](#notes).

### [Notes](http://cdttoolkit.ece.iastate.edu/notes)

You can access your notes page from the Create > Home in the navbar then clicking 'Notes'. Your notes page will show all of your quick notes and comments in a normal tool page format.

### [Projects](http://cdttoolkit.ece.iastate.edu/projects)

Projects are a way to easily group creations with each other, if they are a part of the the same journey, project, class, etc. You can add creations to your project for other users and teams to be able to view and participate in. To navigate to your projects, go to Account > Projects in the sidebar. The Projects page follows a similar format to the tool pages.

To create a new project click '(New+)'. You can give your project a title by inputting into the 'Title' field. To add your tool creations, open the sidebar and navigate the dropdowns to the tools you want to add. Then, you can drag the tool creations you want to add to the 'Drag & Drop' area. The tool will appear in the 'Creations' box with a gray background. To remove a tool you have added, click on the tool and the gray background will go away. This means the tool creation is not selected and will not be included. The middle box will list the teams you are apart of. You can select as many teams as you'd like to include them in the project. All users in the teams can view and edit the project, and any tool creations in the project. The right box will list all users of the toolkit (should develop a search feature), and you can select any of them to include them in the project. When you are done adding your creations, teams, and users, click 'Create' to create the project or 'Cancel' to go back to the project page.

When viewing your project, you will see your tools separated into the five stages. You can click each stage name to get more information about the stage (incomplete information) and view the tools. Clicking on any tool type name will allow you to view the tool creations of that type in the project in a grid format. When you click on a tool creation, you will see the tool creation view inside the project view. This works for all stages, tool types, and tool creations. 

At the top of the project view you can view the users and teams that have access to the project. Clicking on a team will take you to that team page. You can edit or delete the project by using the respective buttons in the top right. They work similar to how any tool would.

### [Teams](http://cdttoolkit.ece.iastate.edu/account/teams)

Teams are groups of users and can be assigned to projects. To go to the teams page, click 'Teams' in the navbar. You will see the teams you're a part of in a grid format. 

To create a new team, click (New+). You can give your team a name by inputting into the 'Name' field. Then, in the box below, you can select any projects you're a part of to assign the team to. You can select as many projects as you'd like. To add users to the team, click the '+' next to 'Add User'. In the fields that appear, type the users' emails into the fields. Click 'Create' to create the team.

Once you create the team, you will be viewing the team. You will see a list of the team's members and projects. You will also see the name of the user that created the team. You can click on the projects to view the projects. When you go to the projects, you will see that the new team is now assigned to the project. Anyone in the team can view the team page and any of the projects the team is assigned to. You can edit and delete the team by clicking 'Edit' and 'Delete'. The 'Reflections' section is currently incomplete.
