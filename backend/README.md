# Python backend

This is the code for the backend of hr.dmerej.info

## Running the server

Install Python (>=3.6)  and [Poetry](https://python-poetry.org/) then run:

```
$ python -m poetry install
$ python -m poetry run python manage.py migrate
$ python -m poetry run python manage.py runserver 5678
```
