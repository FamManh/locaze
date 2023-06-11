# Locaze

## ⭐ Features
* Translation management
* Context screenshots
* Language permissions
* User roles
* Invite contributors
* Support namespace
* ...

## 🔧 How to Install

### 🐳 Docker
```bash
docker run -d --restart=always -p 3001:3001 -v locaze:/app/data --name locaze locaze/locaze
```

### 💪🏻 Non-Docker

Requirements: 
- Platform
  - ✅ Major Linux distros such as Debian, Ubuntu, CentOS, Fedora and ArchLinux etc. 
  - ✅ Windows 10 (x64), Windows Server 2012 R2 (x64) or higher
- [Node.js](https://nodejs.org/en/download/) 16
- [pnpm](https://pnpm.io/) = 8.5.1
- [Git](https://git-scm.com/downloads) 

```bash
# install your pnpm
npm install -g pnpm@8.5.1 

git clone git@github.com:FamManh/locaze.git
cd locaze
pnpm install

pnpm web:dev

pnpm server:dev

```

## Motivation

* I was looking for a translation management tool like "localazy", but it is hard to find a suitable one.
* Want to build a fancy UI.
* Learn Vue 3 and vite.js.
* Learn NestJS vs sql.
* Deploy my first Docker image to Docker Hub.

If you love this project, please consider giving me a ⭐.

## Contribute

### Bug Reports / Feature Requests
If you want to report a bug or request a new feature, feel free to open a [new issue](https://github.com/FamManh/locaze/issues).


### Create Pull Requests
If you want to modify Locaze, please read this guide and follow the rules here: https://github.com/FamManh/locaze/blob/master/CONTRIBUTING.md