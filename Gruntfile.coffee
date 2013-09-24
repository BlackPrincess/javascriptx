module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    pkg:grunt.file.readJSON('package.json')
    coffee:
      core:
        files: [
          expand: true
          cwd: 'src/'
          src: ['src/**/*.coffee']
          dest: 'tmp/'
          ext: '.js'
        ]

    concat: 
      core: 
        src: [ "src/**/*.js", "tmp/**/*.js"]
        dest: "build/<%= pkg.name %>.js"
 
    uglify: 
      options: 
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      core: 
        src: "build/<%= pkg.name %>.js"
        dest: "build/<%= pkg.name %>.min.js"

    watch:
      coffee:
        files: "src/**/*.coffee"
        tasks:["build"]
 
  grunt.registerTask "run", ["coffee", "concat", "uglify", "watch"]
  grunt.registerTask "build", ["coffee", "concat", "uglify"]