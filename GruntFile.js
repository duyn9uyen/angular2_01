module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // contact or bundles multiple files together
    // all .js files in the app folder will get bundled into 1 bundle.js file
    concat: {
        js: {
            files: {'app/bundle.js': 'app/**/*.js' } 
        }
    },
        
    //Minify javascript files with UglifyJS
    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'app/bundle.js', // file to minify
        dest: 'app/bundle.min.js'
      }
    }
  });

  // Load the plugins that tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat:js','uglify']);

};

//To run command line: 
// 1. $grunt (runs the GruntFile.js and all its task)
// 2. You can also specify a task like $grunt uglify