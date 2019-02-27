# Frontend BuildKit
This is the basic starter kit for Knight Lab frontend projects

## Using Docker for Dev
An alternative to installing to your system is to just use Docker
Make sure you have [Docker](https://www.docker.com/products/docker-desktop) installed.

### Install 
Only need to run this once on your machine.
```
docker-compose -f docker-compose.builder.yml run --rm install
```

### Run Dev
Run this everytime you want to work on the project.
```
docker-compose up
```

## Local Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)

Install the BuildKit dependencies by running this command from the project directory:
```bash
npm install
```

Use this command to run the auto-compiler:
```bash
npm run start
```
Use this command to compile for distribution:
```bash
npm run dist
```

## Configuration
### JS
The main *js* file is defined in `webpack.config`
```js
entry: {
    app: "./src/js/your_app_name.js"
},
```

### CSS
The *css* name is defined in `tasks/minify-css.js`
```js
css = fs.readFileSync("dist/css/your_css_name.css", 'utf8'),
```

### Handlebars html
The data variables for the handlebars templates are in `src/data/data.yml`
