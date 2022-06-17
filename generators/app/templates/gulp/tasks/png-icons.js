import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import imageMin, {optipng} from "gulp-imagemin";

export const pngSprite = () => {
    const spriteData = app.gulp.src(app.path.src.pngIcons)
        .pipe(
            app.plugins.if(
                app.isDev,
                app.plugins.plumberError({title: 'PNG SPRITE'})
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imageMin(
                    [
                        optipng({optimizationLevel: 4}),
                    ],
                    {
                        verbose: true,
                    }
                )
            )
        )
        .pipe(
            spritesmith(
                {
                    imgName: 'png-sprite.png',
                    imgPath: '/icons/png-sprite.png',
                    cssName: '_png-sprite.scss',
                    retinaSrcFilter: app.path.src.pngIcons2x,
                    retinaImgName: 'png-sprite@2x.png',
                    retinaImgPath: '/icons/png-sprite@2x.png',
                    padding: 5
                }
            )
        );

        const imgStream = spriteData.img.pipe(app.gulp.dest(app.path.build.icons));
        const cssStream = spriteData.css.pipe(app.gulp.dest(app.path.scssMixinsFolder));

        return merge(imgStream, cssStream).pipe(app.plugins.browsersync.stream());
};