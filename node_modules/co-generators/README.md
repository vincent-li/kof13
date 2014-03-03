## Generators

Generators for CompoundJS MVC framework. 

## model

### command

<code>compound generate model <strong>modelName</strong> [ <strong>field</strong>, ... ]</code>

**modelName:** `word` in singular form

**field:** `word` OR `word:datatype`, when `:datatype` is missing `String` property created

### files

Model generator create/patch following files and directories:

    create  ./app
    create  ./app/models
    create  ./app/models/modelName.js
    patch   ./db/schema.js

### examples

    compound g model user email password approved:boolean

Example above will generate User model with the following fields:

- email: String
- password: String
- approved: Boolean

Following example will generate Post(title, content) model using coffee-script

    compound g post title content --coffee

## controller

Generate controller with number of actions and views

### command

<code>compound generate controller <strong>controllerName</strong> [<strong>actionName</strong>, ...]</code>

**controllerName:** `word` (plural or singular form)

**actionName:** `word` in camelcase with first lowercase letter

### files

Model generator create/patch following files and directories:

    exists  ./app
    exists  ./app/controllers
    create  ./app/controllers/controllerName_controller.js
    exists  ./app/helpers
    create  ./app/helpers/controllerName_helper.js
    exists  ./app/views
    create  ./app/views/controllerName
    create  ./app/views/controllerName/actionName1.ejs
    create  ./app/views/controllerName/actionName2.ejs
    ...
    create  ./app/views/controllerName/actionNameN.ejs

### examples

compound generate controller profile show edit

    exists  app/
    exists  app/controllers/
    exists  app/helpers/
    exists  app/views/
    create  app/views/profile
    create  app/controllers/profile_controller.js
    create  app/helpers/profile_helper.js
    create  app/views/profile/show.ejs
    create  app/views/profile/edit.ejs

## scaffold (crud)

Generate controller with CRUD actions, views, and model. Patch routes and
schema. Most powerful generator for quick prototyping.

### command

<code>compound generate crud <strong>modelName</strong> [ <strong>field</strong>, ... ] [ <strong>options</strong> ]</code>

**modelName:** `word` in singular form

**field:** `word` OR `word:datatype`, when `:datatype` is missing `String` property created

**options:**

- *--noeval* - create noeval controllers
- *--tpl* - specify templating engine (ejs and jade supported)

### example

    compound generate crud post title content

Will generate scaffold for Post(title, content) model. Following
files/directories will be created:

    create  client-side.js
    create  app/
    create  app/controllers/
    create  app/helpers/
    create  app/views/
    create  app/views/posts/
    create  app/views/layouts
    exists  test/
    exists  test/controllers/
    create  app/controllers/posts_controller.js
    exists  app/
    create  app/models/
    create  app/models/post.js
    patch   db/schema.js
    create  app/views/layouts/posts_layout.ejs
    create  app/views/posts/_form.ejs
    create  app/views/posts/show.ejs
    create  app/views/posts/new.ejs
    create  app/views/posts/edit.ejs
    create  app/views/posts/index.ejs
    create  app/helpers/posts.js
    exists  test/controllers/posts_controller_test.js
    exists  test/test_helper.js
    patch   config/routes.js

## License (MIT)

```text
Copyright (C) 2011 by Anatoliy Chakkaev <mail [åt] anatoliy [døt] in>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
```

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

```text
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
