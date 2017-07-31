# Contributing to Stylable Components

## Branch naming
We use scheme in branch naming.
It should contain branch author user name at first and branch name divided by `/`, and optional number of the issue. All words in branch name are separated by underscore: `_`
`username/own_theme_park/42`

## Pull requests and issues
 * Each pull request should be linked with an issue or have the meaningful description. Better is to have both.
 * Each issue should contain meaningful description.

### Examples:

#### Issue:
`issue#42`
**Title**: Build Our Own Theme Park
**Description**: We need to build own theme park, because at the current park we don't have Blackjack.

#### Pull Request:
**Title**: Our own Theme park
**Description**: This PR contains our own theme park implementation, which contains `Blackjack` module and closes #42

## Merging PR's
We love to squash and merge PR's, but doing that we are using **meaningful** merge commit messages.
Bad is to keep commits history, because most likely it will be like

### Bad example:
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

That is ugly, please write meaningful text, when you're merging PR, like

### Good example:
```md
Our own Theme park  …
Made the Theme Park Implementation, added Blackjack module as discussed in issues/42.
Docs are in `docs/own-park.md`, unit and integration tests are available.
```

