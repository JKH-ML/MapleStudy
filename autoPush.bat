@echo off
cd /d "C:\study\web\MapleStudy"
set date=%date:~0,4%%date:~5,2%%date:~8,2%
git add .
git commit -m "%date%"
git push
pause