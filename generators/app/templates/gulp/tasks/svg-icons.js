import svgSprite from 'gulp-svg-sprite';
import rename from 'gulp-rename';

export const svgMulti = () => {
    return app.gulp.src(app.path.src.svgMulti)
        .pipe(
            app.plugins.if(
                app.isDev,
                app.plugins.plumberError({title: 'SVG MULTI'})
            )
        )
        .pipe(app.plugins.newer(app.path.src.svgMulti))
        .pipe(
            rename(
                {
                    prefix: 'icon-',
                }
            )
        )
        .pipe(
            svgSprite(
                {
                    mode: {
                        symbol: {
                            sprite: '../icons-multi.svg'
                        }
                    },
                    shape: {
                        transform: [
                            {
                                svgo: {
                                    plugins: [
                                        {
                                            removeAttrs: {
                                                attrs: ['class', 'data-name'],
                                            },
                                        },
                                        {
                                            removeUselessStrokeAndFill: false,
                                        },
                                        {
                                            inlineStyles: true,
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                }
            )
        )
        .pipe(app.gulp.dest(app.path.build.icons))
        .pipe(app.plugins.browsersync.stream());
};

export const svgMono = () => {
    return app.gulp.src(app.path.src.svgMono)
        .pipe(
            app.plugins.if(
                app.isDev,
                app.plugins.plumberError({title: 'SVG MONO'})
            )
        )
        .pipe(app.plugins.newer(app.path.src.svgMono))
        .pipe(
            rename(
            {
                    prefix: 'icon-',
                }
            )
        )
        .pipe(
            svgSprite(
                {
                    mode: {
                        symbol: {
                            sprite: '../icons-mono.svg'
                        }
                    },
                    shape: {
                        transform: [
                            {
                                svgo: {
                                    plugins: [
                                        {
                                            removeAttrs: {
                                                attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                }
            )
        )
        .pipe(app.gulp.dest(app.path.build.icons))
        .pipe(app.plugins.browsersync.stream());
};