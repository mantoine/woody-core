/**
 * Build JS
 */
const gulp = require('gulp');

const webpack = require('webpack');
const del = require('del');
const path = require('path');

const config = require('../lib/config');

const webpackConfig = require('./webpack.config');
const Log = require('../lib/logger');

gulp.task('js_clean', done => {
    del.sync(path.resolve(config.dist, config.js.dist), {
        force: true
    });

    // Async signal
    done();
});

gulp.task('js_compile', done => {
    webpack(webpackConfig).run(webPackBuild(done));

    function webPackBuild(done) {
        return function (err, stats) {
            if (err) {
                new Log('Webpack', err).error();
                if (done) {
                    done();
                }
            } else {
                new Log(
                    'Webpack',
                    stats.toString({
                        assets: true,
                        chunks: false,
                        chunkModules: false,
                        colors: true,
                        hash: false,
                        timings: true,
                        version: false
                    })
                ).info();
                if (done) {
                    done();
                }
            }
        };
    }
});

// Main Task
gulp.task('js', gulp.series('js_clean', 'js_compile'));
