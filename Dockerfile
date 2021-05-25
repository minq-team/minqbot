FROM mhart/alpine-node:14.15.4 AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./src ./src
ENV NODE_ENV production
RUN npm ci --quiet --only=production
EXPOSE 80
RUN wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem
CMD bash -c "wget https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem && node --max_old_space_size=4096 --max_semi_space_size=256 ./src/index.js"