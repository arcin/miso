# Miso

Use `miso` in the command line to create, list, and delete remote repositories.

Miso is a simple [node](http://nodejs.org) wrapper around the Github API (v3). It will give you some handy commands that make managing repositories even easier!

## Usage

### Create

    $ miso c repo_name

  - Create a local repository.
  - Create a remote repository.
  - Automatically set the origin of the local repository to point to the remote.

### Destroy

    $ miso d repo_name

  - Destroys a remote repository without confirmation.

### List

    $ miso l

  - list all public remote repositories.

## Before Installation

Miso requires a **Github Personal API Token** and a **Github Username** to make changes on Github servers.  

### If you have an API token

You'll need to store your API token and github username as environment variables.  
Add the following lines to your .bashrc, .bash_profile, or .zshrc.

```bash
export GITHUB_USERNAME=your_username
export GITHUB_TOKEN=your_github_token
```

### If you don't have an API token.

It's super easy to get one! You just need to follow this github guide on getting a [personal token](https://github.com/blog/1509-personal-api-tokens).  
When setting up your API token, make sure to check off the following options:

  - `repo`
  - `delete_repo`
  - `repo:status`
  - `user`
  - `admin:repo_hook`

After you get your API token, save your information as environment variables!

## Installation

    npm install miso -g

You want to install miso globally in order to get access to the command line tool.

***note***: *you may need to prefix the command with* `sudo`.
