# Nodebook

Nodebook is a collaborative text editor desktop (Electron) app. With Nodebook, users can register and log in to create, edit, and share documents with others. Text editing is made easy and local to users' laptops.

## Creating a new document
After login, a user can create a new document by clicking on the "+" on the top right corner on the landing page. They have to give the document a name and a password for verification. Upon creation, the document is given a shareable ID (for collaborating purposes). It also contains the time, date, and owner of the document.

<img src="/frontend/public/img/nodebook_create_new.gif"/>

## Editing a document
Basic text editing features are incorporated within this app (including fonts, colors, sizes, inline styles, and block styles). All changes made to a file can be saved so that when the user logs into another session, the changes made previously are still preserved.

<img src="/frontend/public/img/nodebook_edit.gif"/>

## Collaborate with others
To collaborate on a document, a user can enter the shareable ID and the document's password. If a document with such credentials is found, it will appear under the "Shared documents" section. When multiple users share a document, all users can see each other's edits in real time.

<img src="/frontend/public/img/nodebook_collaborate.gif"/>

## Inline search
Inline search is incorporated so that a user can easily find any instance of the search term. Found instances are highlighted in blue for visibility.

<img src="/frontend/public/img/nodebook_inline_search.gif"/>

## Search for files
On the navigation bar, a user can search for files (both their own documents and shared documents) whose titles match the search term.

<img src="/frontend/public/img/nodebook_search_file.gif"/>
