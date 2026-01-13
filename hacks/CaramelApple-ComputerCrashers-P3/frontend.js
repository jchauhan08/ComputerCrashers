// JavaScript file for Flask Deployment

// Export the base URI for the Flask application
export var pythonURI;
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    pythonURI = "http://localhost:8305";  // Updated to match the Flask port
} else {
    pythonURI = "https://flask.opencodingsociety.com";
}