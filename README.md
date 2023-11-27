# Geocoder CLI App

A simple utility to geocode an IP address into a latitude,longitude. Uses the IPStack API.

## Notes

- This implementation does not implement caching or throttling. I would add a SQLite based cache and a rate limiter so that the app does not get throttled by the API.
- We do check that the input is valid

## Prerequisites

Create a `.env` file in the root of the project and add `API_KEY_IPSTACK=YOURIPSTACKAPIKEY`.

## Usage
Run `npm i -g` and then `geo -i 192.168.1.1` or alternatively pipe in the address `echo "192.168.1.1" | geo` 

Setting the output format to JSON is also supported `echo "192.168.1.1" | geo -f JSON`

## Docker Usage