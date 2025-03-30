# Usa una imagen base ligera de Python
FROM python:3.12-slim

# Establece el directorio de trabajo
WORKDIR /app

# Instala dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    libpq-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Copia los archivos de requerimientos y los instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del proyecto
COPY . .

# Expone el puerto de Django
EXPOSE 8000

# Comando para ejecutar Gunicorn con Django
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "boosting_site_backend.wsgi:application"]
