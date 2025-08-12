# Conway's Game of Life

A dynamic implementation of Conway’s Game of Life built with Ruby on Rails, featuring real-time interactivity via Stimulus and background processing with Sidekiq. The board state is temporarily stored and updated in the database after a 5-second delay, simulating the evolution of cellular automata.

## Features

- Interactive grid rendered with Rails views and Stimulus controllers
- Board state stored in the database and updated asynchronously
- Background job queue powered by Sidekiq

## Tech Stack

| Layer      | Tech                  |
| :--------- |---------------------: |
| Backend    | Ruby on Rails 7       |
| Frontend   | StimulusJS, ERB views |
| Background | Sidekiq + Redis       |
| Database   | SQLite                |

## Installation

It is necessary to previously install Redis.

Add your `.env` using the `.env.example` as base.

```bash
git clone https://github.com/schorts99/conways-game-of-life.git
cd conways-game-of-life

# Install dependencies
bundle install

# Setup DB
rails db:create
rails db:migrate

# Start the app
rails s

# Start Sidekiq
bundle exec sidekiq
```
