     # Use the official Python base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY app/ ./app

# Expose the port the application will run on
EXPOSE 4007

# Start the application using Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "147.102.1.169", "--port", "4007"]