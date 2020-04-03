<div align="center"><img width="100" src="https://mystats.pwp.app/img/logo_256.fda3c4a7.png"><h1>myStats</h1></div>

## 概述

该项目是基于Spring Boot + Vue打造的安装量统计平台，开箱即用，你可以在非常短的时间内部署属于你自己的私有安装量统计平台。

## 功能

- 完善的用户登录注册
- 基础的安装量统计功能，支持按平台/分支统计
- 重点数据图表化展示
- 自由的接口设计，简化接入的难度

## 使用方式

构建项目后，将得到的页面文件使用Apache/Nginx等Web服务器部署，并将路径/api反向代理至后端的URL。

## 后端

后端为Spring Boot + Shiro架构，你可以直接使用配套的后端程序，也可以根据前端的接口调用另外开发一套后端。

本项目并不意味着和后端项目完全捆绑，同样，后端项目也并不意味着完全和前端项目捆绑，你也可以基于我们的后端程序根据你的思路重新开发前端面板。

我们提供的后端：

[mystats-backend](https://github.com/pwp-app/mystats-backend)

## 许可证

Apache 2.0