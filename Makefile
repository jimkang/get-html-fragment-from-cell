HOMEDIR = $(shell pwd)

prettier:
	prettier --single-quote --write "**/*.js"

pushall:
	git push origin master && npm publish

test:
	node tests/get-html-fragment-tests.js
