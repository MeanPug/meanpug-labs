const sass = require('node-sass');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
		    options: {
                implementation: sass,
                sourceMap: true
            },
			dist: {
				files: {
					'src/dist/site.css' : 'static/scss/site.scss'
				}
			}
		},

		watch: {
			css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            }
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass']);
	grunt.registerTask('dev', ['watch']);
};
