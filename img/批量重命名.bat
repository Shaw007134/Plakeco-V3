@echo off
set /p str1= input the string to be removed:
set /p str2= input the string to be added:
echo.
echo modifying......
for /f "delims=" %%a in ('dir /s /b ^|sort /+65535') do (
  if "%%~nxa" neq "%~nx0" (
    set "file=%%a"
    set "name=%%~na"
    set "extension=%%~xa"
    call set "name=%%name:%str1%=%str2%%%"
    setlocal enabledelayedexpansion
    ren "!file!" "!name!!extension!" 2>nul
    endlocal
  )
)
exit


