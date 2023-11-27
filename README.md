# Geocoder CLI App

A simple utility to geocode an IP address into a latitude,longitude result. Uses the IPStack API.

## Notes

- This implementation does not implement caching or throttling. I would add a SQLite based cache and a rate limiter so that the app does not get throttled by the API.
- We do check that the input is valid
- Docker integration can be better, it's just a simple wrapper at the moment
- 

## Prerequisites

Create a `.env` file in the root of the project and add `API_KEY_IPSTACK=YOURIPSTACKAPIKEY`.

## Usage
Run `npm i -g` and then `geo -i 192.168.1.1` or alternatively pipe in the address `echo "192.168.1.1" | geo` 

Setting the output format to JSON is also supported `echo "192.168.1.1" | geo -f JSON`

## Docker Usage

Run `npm i && npm build:docker`

In your bash.rc or zsh.rc add `alias geo_docker= docker run -i geo_docker geo`

Run `echo "192.168.1.1" | geo_docker`