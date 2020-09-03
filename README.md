# flattensql README

This extension allows you to take SQL in a text editor that has newlines, and turn it into SQL with those newlines removed. This makes it easier to copy/paste into CLI tools (e.g., Sqlite). It retains comments by turning `--` comments into `/* */` comments.

## Features

See description.

## Requirements

No requirements.

## Extension Settings

No extension settings.

## Known Issues

There is not much testing, so there may be problems.

## Development

To create vsix, you must have vsce installed (`npm install -g vsce`). You can then run `vsce package`. Install locally with `code --install-extension flattensql-0.0.1.vsix`