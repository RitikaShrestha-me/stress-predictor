FROM python:3.10-slim

WORKDIR /app

# Install node
RUN apt-get update && apt-get install -y nodejs npm

COPY . .

# Build React
WORKDIR /app/frontend
RUN npm install && npm run build

# Back to app
WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]