# File uploading

---

## Table of Contents

- [File uploading](#file-uploading)
  - [Table of Contents](#table-of-contents)
  - [General info](#general-info)
  - [Drivers support](#drivers-support)
  - [Uploading and attach file flow](#uploading-and-attach-file-flow)
    - [An example of uploading an avatar to a user profile](#an-example-of-uploading-an-avatar-to-a-user-profile)

---

## General info

`MulterModule` from `@nestjs/platform-express` is used to upload files. General principles you can read in [official documentation](https://docs.nestjs.com/techniques/file-upload).

---

## Drivers support

Out of box boilerplate support two drivers: `local` and `s3`. You can set it in `.env` file, variable `FILE_DRIVER`. If you want use other service for storing files, you can extend it.

---

## Uploading and attach file flow

Endpoint `/api/files/upload` is used for uploading files, which return `File` entity with `id` and `url`. After receiving `File` entity you can attach this to another entity.

#### An example of uploading an avatar to a user profile

```mermaid
sequenceDiagram
    participant A as Fronted App
    participant B as Backend App

    A->>B: Upload file via POST /api/files/upload
    B->>A: Receive File entity with "id" and "url" properties
    note left of A: Attach File entity to User entity
    A->>B: Update user via PATCH /api/auth/me
```
