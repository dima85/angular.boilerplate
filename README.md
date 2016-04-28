# angular.boilerplate
##### Simple AngularJS boilerplate project, uses gulp as build system, karma + jasmine as test system, LESS pre-processor for handling styles. Project has basic structure with separation on components. Includes sample controller, directive, service and filter with sample unit tests for each of this components.

Use gulp to run development server, test application, prepare for deployment by minimizing and concatenating all resource.

### Gulp commands: 
* ```gulp tdd``` - runs karma, execute all tests and watch on files in app folder, if files has been changed re-run all tests.
* ```gulp test``` - runs karma and all tests once
* ```gulp run``` - runs (browsersync server)[https://www.browsersync.io/docs/gulp/] that points to app folder and watches for file changes, reloads browsers if any file has been changed
* ```gulp build``` - minimize, concantenate and inject all resources into *dist* folder 
