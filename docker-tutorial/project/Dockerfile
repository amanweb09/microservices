# base image
FROM node:alpine

# specifying our working directory/root directory
WORKDIR /usr/app

# copy the files to our container relative to WORKDIR
# all files will be copied to /usr/app dir
# make sure we copy files before running yarn
COPY ./ ./

# install dependencies
RUN yarn

# port mapping -> done in the cmd while docker run command

# default command
CMD ["yarn", "start"]