FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create instance folder for SQLite database
RUN mkdir -p /app/instance

# Create static folders in case they're missing
RUN mkdir -p /app/static/images/animals

EXPOSE 7860

ENV FLASK_APP=app.py
ENV FLASK_ENV=production

CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "1", "--timeout", "120", "app:app"]