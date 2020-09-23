FROM node:13.12.0 AS development

ENV CI=true
ENV PORT=3000

RUN mkdir /tools
COPY bin /tools

WORKDIR /src
VOLUME ["/src"]

