const connect = require('connect');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');

// Create a Connect app
const app = connect();

// Middleware to serve static files from the '../angularjs' directory
app.use(serveStatic('../angularjs'));
// Middleware to serve static files from the '../angularjs' directory
app.use(serveStatic(path.join(__dirname, '../angularjs')));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for appointments
let appointments = [];

// Route to handle form submissions
app.use('/book-appointment', (req, res, next) => {
    if (req.method === 'POST') {
        // Extract appointment details from the request body
        const { name, email, date, time } = req.body;

         // Log the collected appointment details
         console.log('Received appointment details:');
         console.log('Name:', name);
         console.log('Email:', email);
         console.log('Date:', date);
         console.log('Time:', time);

        // Create a new appointment object
        const appointment = {
            name,
            email,
            date,
            time
        };

        // Add the appointment to the appointments array
        appointments.push(appointment);

        // Respond with a success message
        res.end('Appointment booked successfully!');
    } else {
        next(); // Pass the request to the next middleware
    }
});

//app.use('/appointments', serveStatic(path.join(__dirname, 'public')));
// Route to retrieve all appointments
app.use('/appointments', (req, res) => {
    // Send the HTML file as a response
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Appointments Page</h1></body></html>');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
