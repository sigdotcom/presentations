# SIG.com Presentations

All of the slides for SIG.com are written using
[reveal.js](https://github.com/hakimel/reveal.js/)

## Cloning the repository
The presentation repository utilizes the [reveal.js framework](https://revealjs.com/#/)
and in doing so requires it as a submodule. Due to this, cloning the repository
is a little trickier. Please use the following command
```bash
# With SSH
git clone --recursive git@github.com:sigdotcom/presentations.git

# With HTTPS
git clone --recursive https://github.com/sigdotcom/presentations.git
```

This will gather all of the necessary presentation files as well as the
submodules recursively.

## Opening a presentation
The easiest way to open a presentation is to open it directly in the
webbrowser or use the command line. For example, let us say the the
`presentations` repo is located at `/home/local/git-local/presentations/`. To
open a meeting presentation you can open your favorite webbrowser and type 
`file:///home/local/git-local/presentations/meetings/2018-02-02/index.html`.

Otherwise, you can use the terminal:
```bash
firefox /home/local/git-local/presentations/meetings/2018-02-02/index.html
```

The same situation applies for workshops, but the path will be different.

## Meeting Presentations
Any presentation that SIG.com gives during one of the meetings are stored in the
[meetings](meetings/) folder. In this folder, you will find a subfolder for each
meeting in which there was a presentation using the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) data standard which is YYYY-MM-DD.

### Creating a new meeting presentation
In order to create a new meeting presentation, follow the process below:
1. Create a folder with the specific date.
    ```bash
    mkdir meetings/2018-02-02/
    ```
2. Copy the previous meeting presentation to preserve the template.
    ```bash
    cp -r meetings/2018-01-26/* meetings/2018-02-02/
    ```
3. Edit the corresponding `index.html` file to add the necessary sections and
   fields.


## Workshops
SIG.com workshops are training sessions meant to provide the participates an
introduction or demo to a specific topic. All folders will be labeled with the
name of the workshop.
