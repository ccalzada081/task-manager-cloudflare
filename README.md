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

---

# Arquitectura

## Frontend
- HTML/CSS/JavaScript

## Backend
- Cloudflare Workers

## Base de datos
- Cloudflare D1

## Monitoreo
- Sentry

---

# Infraestructura con Terraform

La infraestructura se administra mediante Terraform.

Recursos configurados:

- Cloudflare Worker
- Base de datos D1
- Variables de entorno
- Configuración de despliegue

---

# Pipeline CI/CD

El proyecto utiliza GitHub Actions para automatizar:

- Instalación de dependencias
- Ejecución de pruebas unitarias
- Validación del proyecto
- Despliegue automático
- Flujo de aprobación entre ambientes

---

# Pruebas unitarias

Las pruebas unitarias fueron implementadas utilizando Vitest.

## Comando de ejecución

```bash
npm run coverage
```

## Resultado esperado

```text
Test Files  1 passed
Tests       2 passed
```

Las pruebas también se ejecutan automáticamente dentro del pipeline de GitHub Actions.

---

# Monitoreo y observabilidad

El proyecto integra Sentry como herramienta APM para monitoreo en tiempo real.

## Funcionalidades implementadas

- Captura automática de errores
- Dashboard de monitoreo
- Registro de excepciones
- Métricas en tiempo real

## Endpoint de prueba

```text
/error
```

---

# Ejecución local

## Instalar dependencias

```bash
npm install
```

## Ejecutar localmente

```bash
npm run dev
```

---

# URL del proyecto

https://task-manager-cloudflare.carloscalzada169.workers.dev
