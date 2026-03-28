PS C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\node_app> npm init -y
Wrote to C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\node_app\package.json:

{
  "name": "node_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}


PS C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\node_app> npm install express cors nodemon

added 93 packages, and audited 94 packages in 4s

28 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


1. Configure the "Start" Script
Before we write the code, let’s make it easier to run the server.
Open the package.json file in your node_app folder.
Find the "scripts" section and add a "start" and "dev" line so it looks like this:
json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
Use code with caution.

2. Create the Server Code
Now, create a new file named index.js inside the node_app folder and paste this code:
javascript
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Permits React to access this API
app.use(express.json()); // Allows the server to read JSON data

// Simple Test Route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: "Success", 
    message: "Node.js server is connected to React!" 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
Use code with caution.

3. Run the Backend
In your terminal (still inside node_app), run:
powershell
npm run dev
Use code with caution.

You should see: Server is running on http://localhost:5000.
4. Move to React Frontend
Now, let's set up the React side. Open a new terminal (so the backend stays running) and go into your react_app folder:
powershell
cd ..\react_app
Use code with caution.

Do you want to use Vite to set up the React app? (It is the modern, much faster replacement for create-react-app).

1. Update your Scripts
In your package.json, replace the "scripts" section with this. This allows you to start your server easily with npm run dev.
json
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },


PS C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\node_app> npm run dev

> node_app@1.0.0 dev
> nodemon index.js

[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server is running on http://localhost:5000


# Now React configurations

Microsoft Windows [Version 10.0.26200.8039]
(c) Microsoft Corporation. All rights reserved.

C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\react_app>npm create vite@latest . -- --template react
Need to install the following packages:
create-vite@9.0.3
Ok to proceed? (y) y

> npx
> create-vite . --template react

|
o  Install with npm and start now?
|  Yes
|
o  Scaffolding project in C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project\react_app...
|
o  Installing dependencies with npm...

added 151 packages, and audited 152 packages in 14s

36 packages are looking for funding
  run `npm fund` for details

5 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
|
o  Starting dev server...

> react_app@0.0.0 dev
> vite


  VITE v8.0.3  ready in 619 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
  
>> The Final Step: Making them Talk
Currently, your React app is just showing the default Vite "Hello World" page. Let's replace that with code that actually fetches data from your Node.js server.
Open VS Code.
Go to the folder: react_app/src/
Open the file: App.jsx
Delete everything inside it and paste this "Handshake" code:
jsx
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [serverMessage, setServerMessage] = useState("Connecting to Backend...")

  useEffect(() => {
    // We are calling the API we created in your node_app/index.js
    fetch('http://localhost:5000/api/message')
      .then((response) => response.json())
      .then((data) => {
        setServerMessage(data.text);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setServerMessage("Backend is not responding. Check your Node terminal!");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#646cff' }}>React + Node.js Connection</h1>
      
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '8px',
        display: 'inline-block',
        backgroundColor: '#f9f9f9',
        color: '#333'
      }}>
        <h2>Message from Server:</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {serverMessage}
        </p>
      </div>
    </div>
  )
}

export default App
Use code with caution.

Check the result:
Open your browser to http://localhost:5173/.
You should see the message: "Hello! The Node.js server is successfully connected."



To run your project again after closing everything, you just need to open two separate terminals (one for the "brain" and one for the "face") and start them up.
Here is exactly how to do it in VS Code:
1. Open your project in VS Code
Open the main folder: C:\Users\Vyom\OneDrive\Desktop\Project_data\first_react_project.
2. Start the Backend (Terminal 1)

* Open a terminal in VS Code (`Ctrl + Shift + ``).
* Type these commands:

cd node_app
npm run dev

Wait until you see: Server is running on http://localhost:5000

3. Start the Frontend (Terminal 2)

* Click the + icon in the top right of the terminal panel to open a second terminal tab.
* Type these commands:

cd react_app
npm run dev

Wait until you see: ➜ Local: http://localhost:5173/

4. Check your Browser
Go to http://localhost:5173/ and your app will be back online!
------------------------------
💡 Pro Tip: The "Shortcut"
Since you are using VS Code, you can actually split the terminal screen so you can see both at once:

   1. Open one terminal.
   2. Click the "Split Terminal" icon (it looks like a small square split in half) in the terminal menu bar.
   3. Now you have two side-by-side terminals! Use one for node_app and the other for react_app.

Shall we try adding a "Submit" button in React so you can send data FROM React TO Node.js?

| Service  | URL                                                                    |
| -------- | ---------------------------------------------------------------------- |
| React    | [http://localhost:5173](http://localhost:5173)                         |
| Django   | [http://localhost:8000](http://localhost:8000)                         |
| Node API | [http://localhost:5000/api/message](http://localhost:5000/api/message) |
