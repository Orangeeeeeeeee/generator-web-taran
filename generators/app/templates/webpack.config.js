import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const createConfig = () => {
    const isProd = process.argv.includes('--build');
    const mode = isProd ? 'production' : 'development';
    const devtool = !isProd ? 'eval-source-map' : false;

    const config = {
        devtool: devtool,
        mode: mode,
        output: {
            filename: 'build.[name].js',
        },
        module: {
            rules: [
                {
                    use: 'babel-loader',
                    test: /\.js?$/,
                    exclude: /node_modules/,
                },
            ]
        },
        performance: {
            hints: false,
        },
        optimization: {},
        plugins: [
            new ESLintPlugin(),
        ],
    }

    if (isProd) {
        config.optimization.minimizer = [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false
                    }
                }
            })
        ];
    }

    return config;
};


export default createConfig;