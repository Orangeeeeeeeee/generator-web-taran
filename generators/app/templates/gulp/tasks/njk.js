import gulpNunjucksRender from 'gulp-nunjucks-render';
import frontMatter from 'gulp-front-matter';
import prettify from 'gulp-prettify';
import versionNumber from 'gulp-version-number';

export const njk = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(
            app.plugins.if(
                app.isDev,
                app.plugins.plumberError({title: 'NUNJUCKS'})
            )
        )
        .pipe(
            frontMatter(
            {
                    property: 'data',
                }
            )
        )
        .pipe(
            gulpNunjucksRender(
                {
                    PRODUCTION: app.isBuild,
                    path: [app.path.njkFolder],
                }
            )
        )
        .pipe(
            prettify(
                {
                    indent_size: 4,
                    wrap_attributes: 'auto',
                    preserve_newlines: false,
                    end_with_newline: true
                }
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber(
                    {
                        value: '%DT%',
                        append: {
                            key: '_v',
                            cover: 0,
                            to: ['css', 'js'],
                        },
                        output: {
                            file: 'gulp/version.json'
                        }
                    }
                )
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}