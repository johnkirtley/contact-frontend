# STAGE 1
# pull official base image
FROM node:13.12.0-alpine AS builder
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
RUN npm install --silent
# add app
COPY . ./
# build app
RUN npm run build

# STAGE 2
# pull official image
FROM nginx:1.19.0-alpine
# copy files to nginx
COPY --from=builder /app/build /usr/share/nginx/html
# expose port
EXPOSE 80
# start nginx
CMD ["nginx", "-g", "daemon off;"]
