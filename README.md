# LAMP CRUD

A task management system built using the LAMP stack.

## How to run

In `task-mgmt`:

1. Create a MySQL database with name `task_mgmt`, user `user` and password `pass`. Make sure to update the corresponding fields in the `.env` file.
2. Run `composer install`
3. Run `php artisan serve`

In `task-mgmt-ui`:

1. Run `npm install`
2. Run `npm start`