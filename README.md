#GrandApp

This app aims to connect volunteers with seniors.

#How to start

To currently run GrandApp, you will need to: 

1) set up a server with Docker Compose & match the port to the .env_default
2) make the .env_default .env
3) push the prisma DB scheme to it with: yarn prisma migrate dev init
4) follow that with: prisma generate
5) run the app with 'yarn dev'
