# School inventory app
Aplication preview: [School Inventory App](https://school-inventory-app.up.railway.app/)

## Description
This is a web application for controlling hardware inventory of laptops and tablets in school. Main problem was that there was no control of how many devices are available/unavailable and who had which device. For backend I used NodeJS (Express) and PostrgreSQL database is used for storing data with tables for each device type (laptops, tablets, ...). 
Application shows in a table format all device details. Users can add a new single device or multiple at the same time through uploading .csv file, which is then added to the database. Each device in the application can be edited through form or deleted. Home screen shows current states of different devices such as availability, reservations etc.

### Things that still need to be added:
* user authentication with user permissions(login screen, profile)
* responsive design for mobile use
* display users full name instead of user_id
* more categories: desktop PCs, printers, projectors

## Instalation
To run this application locally, follow these steps:
1. clone the repository: `git clone https://github.com/jangmz/school-inventory-app.git`
2. install dependencies: `npm install`
3. create .env file with database credentials: 
    * DB_USER -> database username
    * DB_PASSWORD -> database password
    * DB_NAME -> database name
    * DB_PORT=5432
    * DB_HOST=localhost
4. start the development server: `npm run dev`
5. open your browser and navigate to: http://localhost:5000/

## Usage
- homepage: availability status
- laptops/tablets: table with all device data
    - edit: edit form for changing device data
    - delete: removes device from the database
- upload laptop/tablet data: .csv file upload
- add new laptop/tablet: form for adding a single new device

## Technologies used
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Railway](https://a11ybadges.com/badge?logo=railway)

## Contact
Contact me here for any collaborations/inquiries: [LinkedIn](https://si.linkedin.com/in/jan-jankovi%C4%8D-03429b247)