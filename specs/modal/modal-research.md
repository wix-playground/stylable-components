In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. It creates a mode that disables the main window, but keeps it visible with the modal window as a child window in front of it. Users must interact with the modal window before they can return to the parent application. This avoids interrupting the workflow on the main window. Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box.

https://en.wikipedia.org/wiki/Modal_window

* Modals are built with HTML, CSS, and JavaScript. They’re positioned over everything else in the document and remove scroll from the <body> so that modal content scrolls instead.
* Clicking on the modal “backdrop” will automatically close the modal.
* Bootstrap only supports one modal window at a time. Nested modals aren’t supported as we believe them to be poor user experiences.
* Modals use position: fixed, which can sometimes be a bit particular about its rendering. Whenever possible, place your modal HTML in a top-level position to avoid potential interference from other elements. You’ll likely run into issues when nesting a .modal within another fixed element.
* One again, due to position: fixed, there are some caveats with using modals on mobile devices. See our browser support docs for details.
* Lastly, the autofocus HTML attribute has no affect in modals. Here’s how you can achieve the same effect with custom JavaScript.

https://v4-alpha.getbootstrap.com/components/modal/

http://elemental-ui.com/modal

