"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

const getArrayFromParameters = (...args) => args.flat().filter(Boolean);

module.exports = class extends Generator {
    async prompting() {
        this.log(yosay(`Welcome to the ${chalk.red("generator-web-taran")}!`));
        this.gitAnswers = {};
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Input project name",
                default: "app"
            },
            {
                type: "input",
                name: "author",
                message: "Input author name"
            },
            {
                type: "input",
                name: "description",
                message: "Input description"
            },
            {
                type: "confirm",
                name: "svgSprites",
                message: "Use SVG sprites?",
                default: true
            },
            {
                type: "confirm",
                name: "pngSprites",
                message: "Use PNG sprites?",
                default: false
            },
            {
                type: "confirm",
                name: "needInstallDependencies",
                message: "Install dependencies right now?",
                default: false
            },
            {
                type: "confirm",
                name: "needGitInit",
                message: "Initialize git repo right now?",
                default: false
            }
        ]);

        if (this.answers.needGitInit) {
            this.gitAnswers = await this.prompt([
                {
                    type: "input",
                    name: "repo",
                    message: "Input remote repository"
                }
            ]);
        }

        this.answers = {
            ...this.answers,
            ...this.gitAnswers
        };
    }

    _copyResources(from, to, props) {
        if (props) {
            this.fs.copyTpl(
                this.templatePath(from),
                this.destinationPath(to),
                props
            );
        } else {
            this.fs.copy(this.templatePath(from), this.destinationPath(to));
        }
    }

    writing() {
        this._copyResources(
            "gulp/config/path.js",
            "gulp/config/path.js",
            this.answers
        );
        this._copyResources("gulp/config/plugins.js", "gulp/config/plugins.js");
        this._copyResources(
            "gulp/helpers/plumberError.js",
            "gulp/helpers/plumberError.js"
        );

        const tasks = getArrayFromParameters(
            "clear",
            "copy",
            "fonts",
            "img",
            "js",
            "njk",
            "scss",
            "server",
            "zip",
            this.answers.svgSprites && "svg-icons",
            this.answers.pngSprites && "png-icons"
        );

        for (let i = 0; i < tasks.length; i++) {
            const path = `gulp/tasks/${tasks[i]}.js`;
            this._copyResources(path, path);
        }

        mkdirp(this.destinationPath("src/files"));
        this._copyResources("src/fonts", "src/fonts");
        this._copyResources("src/img", "src/img");
        this._copyResources("src/js", "src/js");
        this._copyResources("src/scss", "src/scss", this.answers);
        this._copyResources("src/njk", "src/njk", this.answers);

        this._copyResources("gulpfile.js", "gulpfile.js", this.answers);
        this._copyResources("package.json", "package.json", this.answers);
        this._copyResources("babelrc", ".babelrc");
        this._copyResources("browserslistrc", ".browserslistrc");
        this._copyResources("eslintrc", ".eslintrc");
        this._copyResources("gitignore", ".gitignore");
        this._copyResources("stylelintrc.json", ".stylelintrc.json");
        this._copyResources("stylelintignore", ".stylelintignore");
        this._copyResources("nvmrc", ".nvmrc");
        this._copyResources("README.md", "README.md");
        this._copyResources("webpack.config.js", "webpack.config.js");

        if (this.answers.svgSprites) {
            this._copyResources("src/svg-icons", "src/svg-icons");
        } else {
            this.fs.delete(
                this.destinationPath("src/scss/components/_svg-icon.scss")
            );
        }

        if (this.answers.pngSprites) {
            this._copyResources("src/png-icons", "src/png-icons");
        } else {
            this.fs.delete(
                this.destinationPath("src/scss/components/_png-icon.scss")
            );
            this.fs.delete(
                this.destinationPath("src/scss/mixins/_png-sprite.scss")
            );
        }
    }

    install() {
        if (this.answers.needInstallDependencies) {
            this.installDependencies({
                yarn: true,
                npm: false,
                bower: false
            });
        } else {
            this.log("Run " + chalk.blue("yarn install") + " to install dependencies later");
        }
    }

    end() {
        try {
            if (this.answers.needGitInit) {
                this.spawnCommandSync("git", ["init"]);
                this.spawnCommandSync("git", ["branch", "-M", "main"]);
            }

            if (this.answers.repo) {
                const lsRemote = this.spawnCommandSync("git", ["ls-remote", this.answers.repo]);

                if (lsRemote.status === 0) {
                    this.spawnCommandSync("git", ["remote", "add", "origin", this.answers.repo]);
                }
            }
        } catch (error) {
            this.log(chalk.red(error));
        }

        this.log(chalk.green("Done!"));
    }
};
