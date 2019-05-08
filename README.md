# turniere-frontend

## Development Setup
### Prerequisites

You'll need Node.js and a package manager for Node.js (like npm or Yarn; We recommend Yarn) installed on your system in order to run this program. You can see how to install Node.js [here](https://nodejs.org/en/).

### Setup the Project

First of course you'll need to clone this repository:

```
$ git clone https://github.com/turniere/turniere-frontend.git
```

Afterwards you'll have to install the used libraries using following command:

```
$ yarn install
```

Then you can run the development server by executing:
```
$ TURNIERE_API_URL=https://api.example.com yarn run dev
```
The environment variable `TURNIERE_API_URL` must contain an valid url to a [turniere backend server](https://github.com/turniere/turniere-backend).
 
In production environment the server runs on port 80, otherwise on port 3000.

## Production Setup: Build the Docker Container

```
$ docker build -t turniere-frontend:latest .
```

The built container exposes port 80.