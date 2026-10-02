# ccmsub-mkdocs-template
Template Python Mkdocs project with a ReadTheDocs-based custom theme

## Setup

To use this template project to create your own documentation site, you will need to follow 3 steps:
1. **Setup:** Copy the code to a development computer and make sure you have all the needed components.
2. **Build:** Write your documentation and add files to the site.
3. **Deploy:** Compile your docs into HTML pages and host them somewhere.

> **WARNING!** This guide assumes reasonable technical competence and doesn't go in depth on how to install Python, how to host website files, etc. \
> It also assumes you are using Linux (Ubuntu-based, specifically) for your development and deployment environments; some commands will be different on Windows, Mac, or other Linux distros.

### Repository
Clone this repository onto a development machine.
```sh
git clone https://github.com/AidenBoll/ccmsub-mkdocs-template.git
```
Alternatively, click the green `<> Code` button, choose "Download ZIP," and extract the zip file.

Navigate into the directory that you just cloned/unzipped.
```sh
cd ccmsub-mkdocs-template/
```

### Python
Ensure Python is installed on your system.
```sh
# The command may be `python3` on some systems.
python --version
```

> I recommend using Pyenv to keep your Python versions, projects and their dependencies isolated. You can find the [Pyenv GitHub here](https://github.com/pyenv/pyenv), and a great [installation and usage guide here](https://realpython.com/intro-to-pyenv/).\
> Pyenv can be used to install new Python versions. It builds them from source, so it requires the installation of [build dependencies](https://github.com/pyenv/pyenv/wiki#suggested-build-environment) on your development machine.

### Virtual Environment
Create a virtual environment for the project.
> This is recommended so that the MkDocs dependencies are kept seperate from your system-wide Python installation. If you don't mind adding packages to your global installation, you can skip everything to do with virtual environments.
```sh
# Again, the command may be python3.
# The second "venv" is the name of the directory to create and can be whatever you want.
python -m venv venv
```

Activate the newly created virtual environment.
```sh
source venv/bin/activate
```

Install Python project dependencies.
```sh
pip install -r requirements.txt
```

### Test
Run the MkDocs development server to test that everything is installed correctly.
```sh
mkdocs serve
```

Visit [127.0.0.1:8000](http://127.0.0.1:8000) in a web browser to view your site. When you've verified that the site is working, enter `Ctrl+C` in the terminal to stop the MkDocs server.

## Build
Now the fun part: [write your documentation](https://www.mkdocs.org/user-guide/writing-your-docs/#file-layout)! Fill the `docs/` folder with [Markdown](https://www.markdownguide.org/) files that plumb the unfathomable depths of your endless wisdom.

[Configure navigation](https://www.mkdocs.org/user-guide/writing-your-docs/#configure-pages-and-navigation) around your site using the `mkdocs.yml` file's "nav" section.

## Deploy
Open a terminal in the folder containing `mkdocs.yml` and run:
```sh
mkdocs build
```

This creates a folder called `site/` adjacent to your `docs/` folder. This folder just contains static HTML and supporting files. Copy the contents of `site/` and put them in a location that can be served by Apache, Nginx, or whatever web server system you choose.