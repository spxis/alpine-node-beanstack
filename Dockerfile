FROM alpine:edge
MAINTAINER SPX Interactive Software <docker@spxis.com>

# ---- Expose the necessary ports ----
EXPOSE 3000

# ---- Setup some basic ENV variables ----
ENV NODE_ENV production \ 
    && NODE_DOCKER true \
    && NODE_HOST "alpine:edge" \
    && NODE_VERSION "6.2.0" \
    && NODE_NPM_VERSION 3.8.9"

# ---- ENV variables for building the docker ----
ENV CONFIG_FLAGS "--fully-static --without-npm" \
    && DEL_PKGS "libgcc libstdc++" \
    && RM_DIRS /usr/include

# ---- Install base Linux packages ----
RUN apk update \
    && apk upgrade \
    && apk add bash \
    && apk add curl \
    && apk add git \
    && apk add make \
    && apk add nodejs \
    && apk add wget \
    && apk add ca-certificates \
    && update-ca-certificates \
    # A very light emacs
    && apk add mg \
    --update-cache \
    --repository http://dl-3.alpinelinux.org/alpine/edge/testing/

# ---- Install ruby for compass and remove it ----
RUN apk add --update build-base libffi-dev ruby ruby-dev \
    && gem install sass compass --no-ri --no-rdoc \
    && apk del build-base libffi-dev ruby-dev

# ---- Upgrade the npm package ----
# RUN npm install -g npm@3.8.9
# This does not currently work correctly, so we cannot update NPM.

# ---- Add some node/beanstack/fullstack development global binaries ----
RUN npm install -g \
    grunt-cli \
    bower \
    jspm \
    nodemon

# ---- Do linux package cleanup ----
RUN apk del make gcc g++ python linux-headers paxctl gnupg 

# ---- Do some APK cleanup ----
# RUN rm -rf \
#     /var/cache/apk/* \
#    /tmp/* /usr/share/man \
#    /root/.npm /root/.node-gyp /root/.gnupg 

WORKDIR /home/src
