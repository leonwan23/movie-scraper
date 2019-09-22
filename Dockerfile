# ---- Base Node ----
FROM node:8.9-alpine AS base
# Create app directory
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies  
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm config set unsafe-perm true

# install app dependencies including 'devDependencies
RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g node-gyp node-pre-gyp && npm install\
	&& npm rebuild bcrypt --build-from-source

# ---- Copy Files/Build ----
FROM dependencies AS build  
WORKDIR /app
COPY . .
#RUN npm run build

# --- Release with Alpine ----
FROM base AS release  
# Create app directory
WORKDIR /app

# optional
# RUN npm -g install serve
COPY --from=dependencies /app/package.json ./

COPY --from=build /app ./

# expose port 8000
EXPOSE 8000

CMD ["npm", "run", "dev"]