# Online Portfolio Workshop

## Greetings

## Discord info and links

## Goals
- Jekyll removes most of tedium in front end
- What is a web framework
- How Github Pages uses git
- Audience could replicate this on their own

## Setup
- create repo
- use cmd git or desktop
- optional ruby/ gem setup
  - Install ruby
  - install bundler and jekyll
  - serve
- set up theme (cayman)

## Development
- index.md
  - front matter
  - just put `# Hello World`
  
- rename to index.html
  - include html files
  ```
  layout: default
  title: "anything"
  ```

  - includes (what are they)
  ```
  {% include header.html %}
  ```

  - in header.html
  ```
  <h1>Hi. I am Clay McGinnis</h1>
  <p>Find me on <a href="https://linkedin.com/in/claymav">LinkedIn</a> and <a href="https://github.com/claymav">Github</a></p>
  ```

- using a few liquid templates
  - create three .md files with filler content
  - add to index.html
    - explain capture
    ```
    {% capture x %}
    {% endcapture %}
    ```

    - include\_relative and including markdown, problems
    ```
    {% include_relative education.md %}
    {% include_relative experience.md %}
    {% include_relative skills.md %}
    ```

    - markdownify
    ```
    <div markdown="1">
    {{ x | markdownify }}
    </div>
    ```
      - explain no spacing or indentation
      - explain "templates"
      - in config
      ```
      markdown: kramdown // is default
      kramdown:
        input: GFM // is also default
      ```

- Extensibility because generates based on files
- easy to set up and most people don't need machine learning and big data
- can be fully changed if you dont like it

- We were just in the config, a data file
  - extensible
  - `title: "something"` in config
  - for loops, and if statements

  - new page (make new folder projects) 
  - index.html
  ```
  <ul>
      <li>
        <h3>Project Name</h3>
        <p>Some info</p>
        <h5>Tech Used:</h5>
        <ul>
          <li>This is tedious</li>
        </ul>
      </li>
  </ul>
  ```
  then add some data in \_data/projects
  - swoly.yml
  ```
  name: Swoly
  desc: Swoly is an in progress fitness app designed by myself and Innocent Niyibizi.
  techs:
    - name: Java
    - name: SQLite
    - name: XML
  ```
  - acmmstedu.yml
  ```
  name: acm.mst.edu
  desc: acm.mst.edu is the website for the Missouri S&T branch of ACM.
  techs:
    - name: HTML/ CSS
    - name: Django
    - name: Python
  ```
  - lets do some for loops in projects/index.html
  ```
  <ul>
    {% for project in site.data.projects %}
    {% assign projec = project[1] %}
    <li>
      <h3>{{ projec.name }}</h3>
      <p>{{ projec.desc }}</p>
      {% if projec.techs %}
      <h5>Tech Used:</h5>
      <ul>
        {% for tech in projec.techs %}
        <li>{{ tech.name }}</li>
        {% endfor %}
      </ul>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
  ```

- Customizing
  - you can easily change themes, or
  - go to the cayman files linked and change \_layouts
  
- Similairity to Django
  - filters, templates, loops
  - liquid tags

## End
