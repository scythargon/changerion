FROM python:3.6
ENV PYTHONUNBUFFERED 1

RUN apt update && apt install -y vim nano less screen htop supervisor nginx \
    curl  \
    --no-install-recommends

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/supervisor.conf /etc/supervisor/conf.d/
COPY config/.screenrc /

ADD . /code/

EXPOSE 80

CMD ["supervisord", "-n"]
