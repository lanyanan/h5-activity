var gulp = require('gulp');

var qiniu = require('gulp-qn-sync')

var config = require('./src/env/' + process.env.NODE_ENV);


gulp.task('uploadqn', function(){
     gulp.src('./dist/**')
       .pipe(qiniu({
                accessKey: 'X2rsWcDOO-pvQFC6zNBE8DFrF_pSjzbDzP5n2AnB',
                secretKey: 'rrq2E78gyGJmJ4nyQIvsuewfexMJNPgghzDPu15c',
                bucket: 'jiuzhihtml',
                domain: 'http://file.9zhitx.com/',
                private: false
            }, {
                dir: config.staticUrl + 'dist/',
                versioning: false,
                recordInFile: 'staticfiles.json'
            }))
 });


gulp.task('default',['uploadqn']);