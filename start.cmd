@echo off
title 牙牙关注h5活动

rem author lan
rem dateTime 2017-08-18

rem 用于h5活动的新建打包压缩
:select
echo ==================项目开发选项=====================
echo    1.项目的自动构建         
echo    2.项目的初始化构建
echo    3.新建h5的活动项目
echo ==================项目开发选项=====================

:select_line
set /p line=请选择命令配置:
:select_line2
if %line%=="" goto select_line
if %line%==1 (
    npm run dev
) else if %line%==2 (
    npm run build
) else if %line%==3 (
    goto input_name
) else (
   echo 选择有误
   goto select_line
)

:input_name
set /p projName=请输入项目名称（用作目录名）:
if "projName"=="" goto input_name
echo 正在创建项目%projName% ...
md "src/app/%projName%/"
xcopy /s "src/common/_template" "src/app/%projName%"


echo ===========================================
echo   %projName% 创建成功！
echo   路径：src/app/%projName%/
echo   注意：开始开发前，请先初始化项目（工作模式选2）
echo ===========================================
pause
cls
goto select
