import browsersync from 'browser-sync';
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
import plumberError from "../helpers/plumberError.js";

export const plugins = {
    plumberError: plumberError,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
};