# Building  Maintenance
The following project is a proof of concept demonstrating how two feature services can be joined and used to track building related information.
A shape file serves to represent the rooms on a floor, and a point file allows different types of markers to be created in each room.

Both shape and point files are loaded as geojson.
The point file has been enabled with edit capabilities, and login is required when the app first loads. 
A column for the shape file acts as a filter for the floor number. A dynamic navigation is created with radio buttons so only one floor appears at a time.


# Testing the website locally
To test the website locally you'll need to run a web server.
Using python makes this easy, and having a virtual environment set-up for this allows you to install the needed package for this specific project.

To setup a virtual environment with a websever you can run the following from the terminal on osx and linux.
Note: The requirements.txt file contains all the required packages, which in this case is only the "simple-http-server" package.

```
python3 -m venv venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
# and to run the update script use
python add_html_path.py
```


To run a local server from the terminal on osx and linux use:
```
python -m http.server 8000
```
Then navigate to http://localhost:8000/ from your web browser