# TaskFlow - Cloudflare Task Manager

Aplicación serverless desarrollada con Cloudflare Workers y D1 para la gestión de tareas.

El proyecto implementa:

- Infraestructura como código con Terraform
- CI/CD con GitHub Actions
- Monitoreo y observabilidad con Sentry
- Pruebas unitarias automatizadas
- Despliegue automático en Cloudflare Workers

---

# Tecnologías utilizadas

- Cloudflare Workers
- Cloudflare D1
- Terraform
- GitHub Actions
- TypeScript
- Vitest
- Sentry
- HTML/CSS/JavaScript

---

# Arquitectura del proyecto

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Cloudflare Workers

## Base de datos
- Cloudflare D1

## Infraestructura
- Terraform

## Monitoreo
- Sentry

---

# Infraestructura como código (Terraform)

La infraestructura del proyecto se administra utilizando Terraform.

Recursos administrados:

- Cloudflare Worker
- Cloudflare D1 Database
- Variables de entorno
- Configuración de despliegue

## Comandos principales

Inicializar Terraform:

```bash
terraform init
