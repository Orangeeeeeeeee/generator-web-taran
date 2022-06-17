import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import getWebpackConfig from'../../webpack.config.js';

const webpackConfig = getWebpackConfig();

export const js = () => {
    return app.gulp.src(app.path.src.js)
        .pipe(
            app.plugins.if(
                app.isDev,
                app.plugins.plumberError({title: 'JS', show: false})
            )
        )
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
};