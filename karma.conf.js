// Karma configuration
// Generated on Wed Apr 20 2016 22:12:18 GMT+0200 (W. Europe Daylight Time)
 var wiredep = require('wiredep');

module.exports = function(config) {

  var bower = wiredep({
    directory: 'app/bower_components',
    dependencies: true,
    devDependencies: true
  });

  var files = bower.js.concat([
    './app/**/*.tpl.html',
    './app/app.js',
    'app/!(bower_components)/**/*.js',
  ]);

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'jasmine'],

    plugins: [
    'karma-jasmine',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-ng-html2js-preprocessor'
    ],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app'
    },
    // list of files / patterns to load in the browser
    files: files,
    // [
    //     './app/bower_components/angular/angular.js',
    //     './app/bower_components/angular-route/angular-route.min.js',
    //     './app/bower_components/angular-mocks/angular-mocks.js',
    //   './app/app.js',
    //   './app/**/*.controller.js',
    //   './app/**/*.controller.spec.js'
    // ],


    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './app/**/*.tpl.html': ['ng-html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
