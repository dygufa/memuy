# Memuy site

[![Build Status](https://travis-ci.org/dygufa/memuy_site.svg?branch=master)](https://travis-ci.org/dygufa/memuy_site)

Memuy is a file share system made to make easy the process of sharing files for a short amount of time. It doesn't require any kind of authentication and it's free. It only sets a maximum size for the "room" and a deadline for the files, 1 day usually.

This repository has only the front-end part of Memuy: a React web app that uses MobX to manage states.  

You can find the API in this repo: <https://github.com/dygufa/memuy_api>

## How to run

First, install all the project depencies by running: `yarn`. Don't use `npm`, otherwise you will lose all the benefits of the `yarn.lock` file.

In order to run webpack-dev-server on port 7005 you need to execute: `yarn run dev`.

## TODO:
- [x] Drag file
- [x] Copy files (ctrl + v) to upload
- [ ] Copy url when clicking on it
- [ ] Prevent duplicated file submission
- [ ] About
- [ ] PWA
- [ ] Server-side rendering

