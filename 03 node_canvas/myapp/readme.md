<!--
 * @Description: 
 * @version: 
 * @Company: iflytek
 * @Author: hytang2
 * @Date: 2019-09-05 15:56:56
 * @LastEditTime: 2019-09-05 18:54:29
 -->
1. github地址:https://github.com/Automattic/node-canvas
2. 不同的操作系统安装有详细教程具体看github


-------------------------
# 神坑：
1. 在线网Linux上安装canvas  需要安装依赖项  brew install pkg-config cairo libpng jpeg giflib
2. node-canvas包在build的时候 需要c11，所以最低的gcc版本应该为gcc 4.8。但是许多centos系统中安装的gcc默认版本为Gcc 4.4.7. 导致node-canvas安装不成功。需要将服务器的gcc版本更新。