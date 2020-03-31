# Pull base image
FROM nikolaik/python-nodejs:latest

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv && pipenv install --system
COPY ./package.json /code/package.json
RUN npm install

# Copy project
COPY . /code/
