@echo off
title ������עh5�

rem author lan
rem dateTime 2017-08-18

rem ����h5����½����ѹ��
:select
echo ==================��Ŀ����ѡ��=====================
echo    1.��Ŀ���Զ�����         
echo    2.��Ŀ�ĳ�ʼ������
echo    3.�½�h5�Ļ��Ŀ
echo ==================��Ŀ����ѡ��=====================

:select_line
set /p line=��ѡ����������:
:select_line2
if %line%=="" goto select_line
if %line%==1 (
    npm run dev
) else if %line%==2 (
    npm run build
) else if %line%==3 (
    goto input_name
) else (
   echo ѡ������
   goto select_line
)

:input_name
set /p projName=��������Ŀ���ƣ�����Ŀ¼����:
if "projName"=="" goto input_name
echo ���ڴ�����Ŀ%projName% ...
md "src/app/%projName%/"
xcopy /s "src/common/_template" "src/app/%projName%"


echo ===========================================
echo   %projName% �����ɹ���
echo   ·����src/app/%projName%/
echo   ע�⣺��ʼ����ǰ�����ȳ�ʼ����Ŀ������ģʽѡ2��
echo ===========================================
pause
cls
goto select
