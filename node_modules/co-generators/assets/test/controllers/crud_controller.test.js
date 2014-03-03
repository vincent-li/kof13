var app, compound
  , request = require('supertest')
  , sinon   = require('sinon');

function {{ Model }}Stub () {
  return {
    {{ VALID_ATTRIBUTES }}
  };
}

describe('{{ Model }}Controller', function() {
  beforeEach(function(done) {
    app = getApp();
    compound = app.compound;
    compound.on('ready', done);
  });

  /*
   * GET /{{ models }}/new
   * Should render {{ models }}/new.{{ TPL }}
   */
  it('should render "new" template on GET /{{ models }}/new', function (done) {
    request(app)
      .get('/{{ models }}/new')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didRender(/{{ models }}\/new\.{{ TPL }}$/i).should.be.true;
        done();
      });
  });

  /*
   * GET /{{ models }}
   * Should render {{ models }}/index.{{ TPL }}
   */
  it('should render "index" template on GET /{{ models }}', function (done) {
    request(app)
      .get('/{{ models }}')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didRender(/{{ models }}\/index\.{{ TPL }}$/i).should.be.true;
        done();
      });
  });

  /*
   * GET /{{ models }}/:id/edit
   * Should access {{ Model }}#find and render {{ models }}/edit.{{ TPL }}
   */
  it('should access {{ Model }}#find and render "edit" template on GET /{{ models }}/:id/edit', function (done) {
    var {{ Model }} = app.models.{{ Model }};

    // Mock {{ Model }}#find
    {{ Model }}.find = sinon.spy(function (id, callback) {
      callback(null, new {{ Model }});
    });

    request(app)
      .get('/{{ models }}/42/edit')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        {{ Model }}.find.calledWith('42').should.be.true;
        app.didRender(/{{ models }}\/edit\.{{ TPL }}$/i).should.be.true;

        done();
      });
  });

  /*
   * GET /{{ models }}/:id
   * Should render {{ models }}/index.{{ TPL }}
   */
  it('should access {{ Model }}#find and render "show" template on GET /{{ models }}/:id', function (done) {
    var {{ Model }} = app.models.{{ Model }};

    // Mock {{ Model }}#find
    {{ Model }}.find = sinon.spy(function (id, callback) {
      callback(null, new {{ Model }});
    });

    request(app)
      .get('/{{ models }}/42')
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        {{ Model }}.find.calledWith('42').should.be.true;
        app.didRender(/{{ models }}\/show\.{{ TPL }}$/i).should.be.true;

        done();
      });
  });

  /*
   * POST /{{ models }}
   * Should access {{ Model }}#create when {{ Model }} is valid
   */
  it('should access {{ Model }}#create on POST /{{ models }} with a valid {{ Model }}', function (done) {
    var {{ Model }} = app.models.{{ Model }}
      , {{ model }} = new {{ Model }}Stub;

    // Mock {{ Model }}#create
    {{ Model }}.create = sinon.spy(function (data, callback) {
      callback(null, {{ model }});
    });

    request(app)
      .post('/{{ models }}')
      .send({ "{{ Model }}": {{ model }} })
      .end(function (err, res) {
        res.statusCode.should.equal(302);
        {{ Model }}.create.calledWith({{ model }}).should.be.true;

        done();
      });
  });

  /*
   * POST /{{ models }}
   * Should fail when {{ Model }} is invalid
   */
  it('should fail on POST /{{ models }} when {{ Model }}#create returns an error', function (done) {
    var {{ Model }} = app.models.{{ Model }}
      , {{ model }} = new {{ Model }}Stub;

    // Mock {{ Model }}#create
    {{ Model }}.create = sinon.spy(function (data, callback) {
      callback(new Error, {{ model }});
    });

    request(app)
      .post('/{{ models }}')
      .send({ "{{ Model }}": {{ model }} })
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        {{ Model }}.create.calledWith({{ model }}).should.be.true;

        app.didFlash('error').should.be.true;

        done();
      });
  });

  /*
   * PUT /{{ models }}/:id
   * Should redirect back to /{{ models }} when {{ Model }} is valid
   */
  it('should redirect on PUT /{{ models }}/:id with a valid {{ Model }}', function (done) {
    var {{ Model }} = app.models.{{ Model }}
      , {{ model }} = new {{ Model }}Stub;

    {{ Model }}.find = sinon.spy(function (id, callback) {
        callback(null, {
          id: 1,
          updateAttributes: function (data, cb) { cb(null) }
        });
    });

    request(app)
      .put('/{{ models }}/1')
      .send({ "{{ Model }}": {{ model }} })
      .end(function (err, res) {
        res.statusCode.should.equal(302);
        res.header['location'].should.include('/{{ models }}/1');

        app.didFlash('error').should.be.false;

        done();
      });
  });

  /*
   * PUT /{{ models }}/:id
   * Should not redirect when {{ Model }} is invalid
   */
  it('should fail / not redirect on PUT /{{ models }}/:id with an invalid {{ Model }}', function (done) {
    var {{ Model }} = app.models.{{ Model }}
      , {{ model }} = new {{ Model }}Stub;

    {{ Model }}.find = sinon.spy(function (id, callback) {
        callback(null, {
          id: 1,
          updateAttributes: function (data, cb) { cb(new Error) }
        });
    });

    request(app)
      .put('/{{ models }}/1')
      .send({ "{{ Model }}": {{ model }} })
      .end(function (err, res) {
        res.statusCode.should.equal(200);
        app.didFlash('error').should.be.true;

        done();
      });
  });

  /*
   * DELETE /{{ models }}/:id
   * -- TODO: IMPLEMENT --
   */
  it('should delete a {{ Model }} on DELETE /{{ models }}/:id');

  /*
   * DELETE /{{ models }}/:id
   * -- TODO: IMPLEMENT FAILURE --
   */
  it('should not delete a {{ Model }} on DELETE /{{ models }}/:id if it fails');
});