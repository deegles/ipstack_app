#!/usr/bin/env node

import "dotenv/config";

import axios from "axios";
import { Command } from "commander";
import net from "net";

const API_KEY = process.env["API_KEY_IPSTACK"];

const geoCoder = new Command();
const isValidIpAddress = (ip: string) => net.isIP(`${ip}`.trim()) !== 0;

interface IPStackGeoData {
  ip: string;
  type: "ipv4" | "ipv6";
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: string;
    capital: string;
    languages: string;
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: string;
  };
}

geoCoder
  .version("1.0.0")
  .description("CLI tool for Geocoding IP addresses")
  .option("-i, --ip <value>", "IP address")
  .option("-f, --format <value>", "output format", "LATLONG")
  .action(async ({ ip, format }) => {
    let stdin = "";

    if (process.stdin.isTTY) {
      await geocode(ip);
    } else {
      // support for piping in the value
      process.stdin.on("readable", () => {
        let chunk = process.stdin.read();
        if (chunk !== null) {
          stdin += chunk;
        }
      });
      process.stdin.on("end", async function () {
        await geocode(stdin);
      });
    }
  })
  .parse(process.argv);

async function geocode(ipLike: string): Promise<void> {
  try {
    if (!API_KEY) {
      throw new Error("IPStack API key is not set.");
    }

    if (!isValidIpAddress(ipLike)) {
      throw new Error("Invalid IP address: " + ipLike);
    }

    const { data, status, statusText } = await axios({
      method: "GET",
      url: `http://api.ipstack.com/${ipLike.trim()}?access_key=${API_KEY}`,
      timeout: 4000,
    });

    if (status !== 200) {
      throw new Error(`Error fetching geodata: ${status} ${statusText}`);
    }

    const options = geoCoder.opts();

    switch (options.format) {
      case "JSON":
        process.stdout.write(JSON.stringify(data));
        break;
      case "LATLONG":
        process.stdout.write(`${data.latitude},${data.longitude}`);
        break;
      default:
        throw new Error("Unsupported output format");
    }

    process.exit(0); // success!
  } catch (error) {
    process.stderr.write(`${error}\n`);
    process.exit(1);
  }
}
