FROM python:3.7

MAINTAINER Mehdi Sadour

ENV PYTHONUNBUFFERED 1
RUN mkdir /combat_tarczylo
WORKDIR /combat_tarczylo
COPY requirements.txt /combat_tarczylo/
RUN pip install -r requirements.txt
COPY . /combat_tarczylo/