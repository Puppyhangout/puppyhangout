# Update a version
1. `npm run build`
2. `firebase deploy`



# Setting up environment
need admin rights to install something with -g
1. `sudo gives admin rights`
2. `sudo npm install -g firebase-tools`
>
# initialize firebase
1. `firebase logout`
2. `firebase login`
3. `firebase init`
4. `firebase init hosting`
>> use an existing project -> public is build
>>
>> yes for configure as a single page app


# Push to production
1. build the index.html file by
`npm run build`
> or build the project using `ng build --prod` if show welcome page
> https://github.com/coreui/coreui-react/issues/55
2. deploy by
`firebase deploy --only hosting`
3. Now it is hosted in 
> https://puppyhangout-9cde0.web.app
4. Change the website to www.puppyhangout.com



# Run locally
1. npx kill-port 3000 3001 3002
2. A good habit `git pull`
3. `npm i` `npm i firebase`
4. `sudo npm start`
 
 



