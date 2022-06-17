import * as path from 'path';
const rootFolder = path.basename(path.resolve());
const buildFolder = './dist';
const srcFolder = './src';

export const pathConfig = {
    build: {<% if(svgSprites || pngSprites){ %>
        icons: `${buildFolder}/icons/`,<%}%>
        img: `${buildFolder}/img/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
        fonts: `${buildFolder}/fonts/`,
    },
    src: {<% if(pngSprites){ %>
        pngIcons2x: `${srcFolder}/png-icons/**/*@2x.png`,
        pngIcons: `${srcFolder}/png-icons/**/*.png`,<%}%><% if(svgSprites){ %>
        svgMulti: `${srcFolder}/svg-icons/multi/*.svg`,
        svgMono: `${srcFolder}/svg-icons/mono/*.svg`,<%}%>
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg}`,
        js: `${srcFolder}/js/index.js`,
        scss: `${srcFolder}/scss/[^_]*.scss`,
        html: `${srcFolder}/njk/[^_]*.njk`,
        files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.{woff,woff2}`,
    },
    watch: {<% if(pngSprites){ %>
        pngIcons: `${srcFolder}/png-icons/**/*.png`,<%}%><% if(svgSprites){ %>
        svgMulti: `${srcFolder}/svg-icons/multi/*.svg`,
        svgMono: `${srcFolder}/svg-icons/mono/*.svg`,<%}%>
        img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg}`,
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/njk/**/*.njk`,
        files: `${srcFolder}/files/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.{woff,woff2}`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    njkFolder: `${srcFolder}/njk`,
    scssMixinsFolder: `${srcFolder}/scss/mixins`,
}