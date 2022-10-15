FROM node:16-alpine
RUN apk --update add chromium-chromedriver
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p /app
ADD . /app
RUN chown -R appuser:appgroup /app
USER appuser
WORKDIR /app
RUN npm install
CMD ["npm", "test"]