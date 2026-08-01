@echo off
REM Pi Agent Setup Script (Windows Batch)
REM
REM Usage:
REM   1. Clone the repo anywhere on your machine
REM   2. Open Command Prompt (cmd) in the cloned directory
REM   3. Run: install.bat
REM
REM No admin permissions required.

set "TARGET=%USERPROFILE%\.pi\agent"
set "SOURCE=%~dp0"

echo.
echo === Pi Agent Frontend Suite Installer ===
echo.

REM 1. Create target directories
echo [1/5] Setting up %TARGET% ...
if not exist "%TARGET%" mkdir "%TARGET%"
if not exist "%TARGET%\extensions" mkdir "%TARGET%\extensions"
if not exist "%TARGET%\skills" mkdir "%TARGET%\skills"

REM 2. Copy core config files
echo [2/5] Copying configuration files...
for %%F in (SYSTEM.md AGENTS.md settings.json models.json models.json.example mcp.json mcp.json.example .gitignore) do (
    if exist "%SOURCE%%%F" (
        copy /Y "%SOURCE%%%F" "%TARGET%\%%F" >nul 2>&1
        echo   Copied %%F
    )
)

REM 3. Copy extensions
echo [3/5] Copying extensions...
if exist "%SOURCE%extensions" (
    xcopy /E /Y /I /Q "%SOURCE%extensions" "%TARGET%\extensions" >nul 2>&1
    echo   Extensions installed
)

REM 4. Copy skills
echo [4/5] Copying skills...
if exist "%SOURCE%skills" (
    xcopy /E /Y /I /Q "%SOURCE%skills" "%TARGET%\skills" >nul 2>&1
    echo   Skills installed
)

REM 5. Install Pi packages
echo [5/5] Installing Pi packages...
echo   Installing pi-token-speed ...
pi install "https://github.com/gsanhueza/pi-token-speed" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing pi-dynamic-workflows ...
pi install "https://github.com/QuintinShaw/pi-dynamic-workflows" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing mattpocock/skills ...
pi install "https://github.com/mattpocock/skills" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing pi-agent-browser-native ...
pi install "npm:pi-agent-browser-native" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing pi-mcp-adapter ...
pi install "npm:pi-mcp-adapter" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing pi-web-access ...
pi install "npm:pi-web-access" >nul 2>&1 || echo   (Skipped - install manually)
echo   Installing pi-lens ...
pi install "npm:pi-lens" >nul 2>&1 || echo   (Skipped - install manually)

echo.
echo === Installation Complete ===
echo.
echo Installed to: %TARGET%
echo.
echo IMPORTANT: Edit %TARGET%\models.json and replace placeholders:
echo   ^<GEMMA_ENDPOINT_URL^>  -^> Your Gemma vLLM endpoint
echo   ^<QWEN_ENDPOINT_URL^>   -^> Your Qwen vLLM endpoint
echo   ^<GEMMA_API_KEY^>       -^> Your Gemma API key
echo   ^<QWEN_API_KEY^>        -^> Your Qwen API key
echo.
echo IMPORTANT: Edit %TARGET%\mcp.json and replace:
echo   ^<YOUR_PASSWORD^>       -^> Your MSSQL Database Password
echo.
echo Available local models (after config):
echo   - gemma-4-31B-it
echo   - qwen3.6-27b-nvfp4
echo.
echo To start: cd into your project repo and run "pi"
echo To switch model: /model inside Pi session
echo.
pause
