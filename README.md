# puppyhangout

pkill -f node


HOW TO RUN LOCALLY
	1. `sudo killall -9 node`
	2. cd to frontend
`npm run dev`
	1. cd to backend
`npm i -g typescript`
`npm link typescript`
`npm run sd`


how to change database:

`npm i -g db-migrate`

should be in backend folder
`./node_modules/db-migrate/bin/db-migrate create migration_name  --sql-file`

put alter table commands in a folder, then
`./node_modules/db-migrate/bin/db-migrate up`
