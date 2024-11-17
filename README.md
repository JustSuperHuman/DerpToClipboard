# DerpToClipboard VSCode Extension

This extension allows you to quickly copy all IntelliSense problems from your current file to the clipboard.

## Features

- Three convenient ways to copy IntelliSense problems:
  1. Basic problem copying with line numbers and messages
  2. Problems with an introduction text (great for sharing in discussions)
  3. Problems with complete file content (perfect for troubleshooting)
- Works on the currently active file
- Problems are formatted in an easy-to-read format
- Clear feedback messages when copying is complete

## Usage

The extension provides three commands that can be accessed through the Command Palette (Ctrl+Shift+P / Cmd+Shift+P):

1. **Copy All IntelliSense Problems**
   - Basic command that copies only the problems
   - Format:
     ```
     File: path/to/file.ts
       Line X, Column Y: Problem message
     ```

2. **Copy All IntelliSense Problems with Introduction**
   - Copies problems with an introduction text including the filename
   - Format:
     ```
     I have these problems in my file "path/to/file.ts":

     File: path/to/file.ts
       Line X, Column Y: Problem message
     ```

3. **Copy All IntelliSense Problems with File Content**
   - Copies problems and the complete file content with clear section markers
   - Format:
     ```
     I have these problems in my file "path/to/file.ts":

     File: path/to/file.ts
       Line X, Column Y: Problem message

     === File Content ===

     [Complete file content here]

     === End of File Content ===
     ```

## Requirements

- Visual Studio Code version 1.95.0 or higher

## Extension Settings

This extension does not contribute any settings.

## Known Issues

None at this time.

## Release Notes

### 1.0.0

Initial release of DerpToClipboard