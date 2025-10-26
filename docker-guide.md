# Docker构建和运行指南

## 构建Docker镜像

在项目根目录下运行以下命令构建Docker镜像：

```bash
docker build -t frontend-app .
```

这将创建一个名为`frontend-app`的Docker镜像。

## 运行Docker容器

构建完成后，使用以下命令运行容器：

```bash
docker run -d -p 8080:80 --name frontend-container frontend-app
```

这将启动容器并将容器内的80端口映射到主机的8080端口。

## 访问应用

应用启动后，可以通过浏览器访问：

```
http://localhost:8080
```

## 停止和删除容器

停止容器：

```bash
docker stop frontend-container
```

删除容器：

```bash
docker rm frontend-container
```

## 其他有用的命令

查看所有容器：

```bash
docker ps -a
```

查看所有镜像：

```bash
docker images
```

删除镜像：

```bash
docker rmi frontend-app
```