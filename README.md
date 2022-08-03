# ToDoApi

ToDo Project

Description:

This ia a .net (C#) api with a ReactJS front end

Installation:

--- Server ---

1. Clone this Repo to your local machine

2.make sure you enable / Dowlnload the following nuget packages

- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Swashbuckle.AspNetCore

3. This application is designed to use a local instance of Microsoft SQL Server.  if you are going to use a remote SQL server, you will have to edit the connection string in the appsettings.json file

4. Once the connection string is correct, run the following command in the Package Manager Console to create the database and tables
- Update-Database

5. Run the API (F5)

--- React application ---

6. edit the .env file to have the proper API Address

  REACT_APP_API_URL = https://localhost:7008/api/  <= change this

7. open a terminal in the following directory \ToDoApi\ToDoApi\wwwroot

8. type npm install to download the dependencies for the application

9. type npm start to start the application 
 
