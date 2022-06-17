import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

const plumberError = function (options) {
    const config = {
        message: 'Error: <%= error.message %>',
    };

    if (options && options.title) {
        config['title'] = options.title;
    }

    if (!options.show) {
        return plumber(
            function () {
                this.emit('end');
            }
        );
    }

    return plumber(
        function (error) {
            notify.onError(config)(error);
            this.emit('end');
        }
    )
};

export default plumberError;