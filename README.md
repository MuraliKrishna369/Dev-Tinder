# Namsate NodeJS🚀

# Creating the server

What i understand 
1. How to intialise you node project => npm init
2. what is package.json file? => it's like id to our project
3. Now install npm i express ? => getting express and run our server on express
4. Now you see package-lock.json ? what is the differnce between package.json and package-lock.json?
    - You can see in your package.json file there is dependencies section inside that `express: "^5.1.0"`
    - The "^"(carrot) tells auto upgrade wheneven there is any patch or minor changes happend
    - to do that package-lock.json helps you that, it's give you the exact version and also store all
      minor details of our dependencies, bascially it maintains the intergrity of our dependencie that we are using.
5. Why node_modules?
    - It's stores all the code of our dependencies and `transative dependencies
6. How to create a server? => app.list(port_number)


# Objectives
1. create a server and initialize mongoose to perfrom crud operations