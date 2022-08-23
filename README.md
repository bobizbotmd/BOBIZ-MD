# Ansible Role with "Flat" Layout

This role is a template that helps to work around Ansible's irritating convention of using lots and lots of `main.yml` files that you can't easily distinguish in your editor.  Instead of e.g. `defaults/main.yml`, `tasks/main.yml`, etc., it uses the following files in the role's base directory:

* `defaults.yml`
* `handlers.yml` 
* `tasks.yml`
* `vars.yml`

The only `main.yml` you actually need to edit is the `meta/main.yml`, which must remain where it is in order to work with the Ansible Galaxy tools.  The other `main.yml` files remain, but are just symlinks pointing to the matching files from the role's base directory.

To use this template, start by making a copy of it (either by downloading a [release](//github.com/pjeby/ansible-flat-role/releases), or creating a new repository and importing this one).  Then, delete everything in this README from this paragraph up, and edit it and the other files to suit your needs.  (Note: since github only allows you to have one fork of a project at a time, don't fork this repo if you're just using it to create a new role.  Download a release or import into a new repository instead!)

---

Role Name
=========

A brief description of the role goes here.

Requirements
------------

Any pre-requisites that may not be covered by Ansible itself or the role should be mentioned here. For instance, if the role uses the EC2 module, it may be a good idea to mention in this section that the boto package is required.

Role Variables
--------------

A description of the settable variables for this role should go here, including any variables that are in defaults/main.yml, vars/main.yml, and any variables that can/should be set via parameters to the role. Any variables that are read from other roles and/or the global scope (ie. hostvars, group vars, etc.) should be mentioned here as well.

Dependencies
------------

A list of other roles hosted on Galaxy should go here, plus any details in regards to parameters that may need to be set for other roles, or variables that are used from other roles.

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
         - { role: username.rolename, x: 42 }

License
-------

BSD

Author Information
------------------

An optional section for the role authors to include contact information, or a website (HTML is not allowed).
