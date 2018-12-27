## PreBook
![screenshot](https://cdn.pbrd.co/images/HRHJWWp.gif "screenshot")
A movie booking website made in Express, PUG, and MongoDB. Key features -
1. User login & registeration - using Express sessions and a MongoDB database.
2. Movie booking - with seat selection, hall selection, time selection.
3. Commenting - To post reviews of a specific movie.
4. User buy history - to quickly checkout the history of tickets purchased by a user.

Important Note - This is not ready for production, because it has multiple problems arising in real life (see future updates should include section). It was built as a project, and should be appropriate as a starting point.

### Future Updates should Include
*Reasons why you shouldn't put this up on a production level yet.*
1. Hashing password. Storing unsalted, unhashed passwords should be a crime.
2. Adding a payment gateway.
3. Handling simuntaneous transactions (so a way to put a seat on a sort of hold for the duration of buying).
4. Adding email verification.

### How to set it up
1. Unzip the database.zip file into the same folder having other stuff.
2. Open terminal in the folder, and run "npm install" to install the dependencies
3. Open a terminal in the MongoDB installation on your device, and run "./bin/mongod --dbpath YourPath/PreBook/data", where YourPath/PreBook/data is the data folder in the project folder.  (for 64-bit).
4. Start the server using "npm start" in the first terminal window.
5. Navigate to "localhost:3000".

### Try Me?
1. Of course. You can check out the PHP version [try me out](https://i.cs.hku.hk/~bschawla/project1/index.html "try me out").
2. For the Express version - set it up yourself and take it for test run!
3. Finally, you can also see the screenshots below.

### Screenshots
![screenshot](https://i.imgur.com/9JJxaFu.png "screenshot")

![screenshot](https://i.imgur.com/7C9CIc0.png "screenshot")
