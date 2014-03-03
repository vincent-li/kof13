test:
	@./node_modules/.bin/mocha --require ./test/init.js test/*.test.js
test-verbose:
	@./node_modules/.bin/mocha --reporter spec --require ./test/init.js  test/*.test.js
testing:
	./node_modules/.bin/mocha --watch --reporter min --require ./test/init.js --require should test/*.test.js

.PHONY: test
