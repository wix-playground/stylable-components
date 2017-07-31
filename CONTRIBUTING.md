# Contributing to Stylable Components

## Branch naming

We use a branch naming scheme with the following form:

`user_name/branch_name/optional_issue_number`

* **username** is the name of the developer who created the branch
* **branch_name** is a descriptive name
* **optional_issue_number** is the issue being fixed or addressed by this branch

An example branch name might be:

`yuri/own_theme_park/42`

## Pull requests and issues

 * Each pull request should be linked with an issue or have a meaningful description. It's even better to have both.
 * Each issue being addressed by the branch should contain a meaningful description of what was done.

### Examples

#### Issue

**issue**: #42<br>
**Title**: Build Our Own Theme Park<br>
**Description**: We need to build own theme park, because at the current park we don't have Blackjack.

#### Pull Request

**Title**: Our own Theme park<br>
**Description**: This PR contains our own theme park implementation, which contains a **Blackjack module** and closes issue #42

## Merging PRs

We love to squash and merge PR's, but only when we have **meaningful** merge commit messages. Avoid including a commit history, since most likely it will be like this:

#### Bad example

```md
username/own_theme_park (#43)  …
* fix
* fix
* fix
* fix
* fix
* up
* smth else
* docs
* add module
* tests
```

That is ugly and quite useless. Write meaningful text when you're merging PRs, such as:

#### Good example

```md
Our own Theme park  …
Made the Theme Park Implementation, added Blackjack module as discussed in issue/42.
Docs are in `docs/own-park.md`, unit and integration tests are available.
```
