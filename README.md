In order to use these template files, copy the files from this project into your application directory.

## Installing the Templates

* All Files:  
  Use the "Clone or download" button and select "Download ZIP" to copy the entire set of templates, and copy those into your project.


## Using `Dockerfile`

The Dockerfile template creates a Docker image for your application that:

* Uses the `node:18-alpine` and `mongo:7.0` image version

The template also makes the following assumptions about your application:

* It listens on port 3001
* It can be started using `npm start`