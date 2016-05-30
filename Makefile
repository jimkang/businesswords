PROJECTNAME = businesswords
HOMEDIR = $(shell pwd)
USER = bot
SERVER = smidgeo
SSHCMD = ssh $(USER)@$(SERVER)
APPDIR = /opt/$(PROJECTNAME)

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/
	$(SSHCMD) "cd $(APPDIR) && npm install"

run:
	node post-business-tweet.js

template-offsets:
	node node_modules/.bin/get-file-line-offsets-in-json data/words.txt > \
		data/wordslineoffsets.json

