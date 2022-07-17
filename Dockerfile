FROM node:latest
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
  tee -a /etc/apt/sources.list.d/google.list && \
  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | \
  apt-key add - && \
  apt-get update && \
  apt-get install -y google-chrome-stable libxss1

RUN google-chrome --version | grep -oE "[0-9]{1,10}.[0-9]{1,10}.[0-9]{1,10}" > /tmp/chromebrowser-main-version.txt
RUN wget --no-verbose -O /tmp/latest_chromedriver_version.txt https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$(cat /tmp/chromebrowser-main-version.txt)
RUN wget --no-verbose -O /tmp/chromedriver_linux64.zip https://chromedriver.storage.googleapis.com/$(cat /tmp/latest_chromedriver_version.txt)/chromedriver_linux64.zip && rm -rf /opt/selenium/chromedriver && unzip /tmp/chromedriver_linux64.zip -d /opt/selenium && rm /tmp/chromedriver_linux64.zip && mv /opt/selenium/chromedriver /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) && chmod 755 /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) && ln -fs /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) /usr/bin/chromedriver

ARG WORK_DIRECTORY=/program
RUN mkdir -p $WORK_DIRECTORY
WORKDIR $WORK_DIRECTORY

ENV NODE_ENV=development NODE_PATH=$WORK_DIRECTORY
ENV HEADLESS_BROSWER=true
RUN npm install -g yarn --force
COPY package.json .
RUN yarn install
RUN yarn build
COPY . .

EXPOSE 8080

CMD ["yarn", "start"]