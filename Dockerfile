FROM python:3.6
ENV PYTHONUNBUFFERED 1

RUN apt update && apt install -y vim nano less screen htop supervisor \
    curl  \
    --no-install-recommends

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY config/supervisor.conf /etc/supervisor/conf.d/

ADD . /code/

EXPOSE 8080

CMD ["supervisord", "-n"]
