# Using a multi stage build to reduce the build size

# STAGE 1

FROM node:16-alpine AS build

WORKDIR /eventmanager

COPY package.json ./

RUN yarn  install

COPY . /eventmanager/

RUN yarn build


# STAGE 2

FROM nginx:stable-alpine

COPY --from=build /eventmanager/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
