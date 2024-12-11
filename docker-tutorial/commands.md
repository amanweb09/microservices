# DOCKER COMMANDS

* ## RUN AN IMAGE
    - sudo docker run hello-world
*docker run is a combination of 2 commands - docker run (which creates a container) and docker start (starts a container)*

* ## list all container
    - sudo docker ps

* ## list containers ever created on our machine
    - sudo docker ps --all

* ## restarting a container
    - sudo docker start container_id

* ## deleting stopped containers
    - sudo docker system prune

* ## showing container logs
    - sudo docker logs container_id
*-a flag shows output in the terminal*

* ## stop a container
    - sudo docker stop container_id
*use docker kill if you want to stop immediately*

* ## going inside a container and running commands
    - sudo docker exec -it container_id command_name
*exec = execute    -it = interactive mode*
    - sudo docker create redis
    - sudo docker run redis_instance_string (say abcdefgh)
    - sudo docker ps (say container id is 12345)
    - sudo docker exec -it 12345 redis-cli

*-it means that i want to interact further after the command is executed*

* ## going into containers (a better way)
    - sudo docker exec -it 12345 sh
*sh will open a shell and we need not write docker exec again and again*

* ## building an image
    *create a file named dockerfile*

    ### dockerfile contains 3 things:
        * base image FROM
        * commands to install additional programmes RUN
        * command to run the container CMD

* ## building image from dockerfile
    - sudo docker build .
    - copy container_string (after sha:___)
    - sudo docker run container_string

* ## naming our custom image (image tagging)
    - *docker_id/custom_name:version* (convestion for naming an image)
    - sudo docker build -t amankhanna/myimage:latest .
    *-t means tag*
    - sudo docker run amankhanna/myimage

* ## port mapping
    - done while docker run command
    - sudo docker run 8080:8080 -t aman/node
    - map = request from:request to