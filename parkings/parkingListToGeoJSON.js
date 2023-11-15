import axios from "axios";
import * as fs from "fs";

const parkingListGeoJSON = [];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  try {
    // 5231
    const parkingListJSON = fs.readFileSync("parkingList.json", "utf-8");
    if (!parkingListJSON) throw new Error("Can't read file");

    const parkingList = JSON.parse(parkingListJSON);
    for (let i = 4801; i < parkingList.length - 1; i++) {
      console.log(`Fetching number ${i}`);
      const response = await axios.get(
        `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${parkingList[i].lat}%2C${parkingList[i].lng}&lang=pl-PL&apiKey=${process.env.NEXT_PUBLIC_HERE_API_KEY}`
      );
      if (response.data && response.data.items.length > 0) {
        const p = response.data.items[0];

        parkingListGeoJSON.push({
          type: "Feature",
          properties: {
            address: {
              label: p.address.label ?? "",
              countryName: p.address.countryName ?? "",
              state: p.address.state ?? "",
              county: p.address.county ?? "",
              city: p.address.city ?? "",
              street: p.address.street ?? "",
              postalCode: p.address.postalCode ?? "",
              houseNumber: p.address.houseNumber ?? "",
            },
          },
          geometry: {
            type: "Point",
            coordinates: [p.position.lng, p.position.lat],
          },
        });

        await sleep(200).then(() => {
          console.log("Fetch OK");
        });
      }
    }

    const json = JSON.stringify(parkingListGeoJSON, null, 2);

    fs.writeFile("parkingListGeoJSON_4800-5800.json", json, "utf8", () => {
      console.log("File saved");
    });
  } catch (err) {
    console.log(err);
  }
}

main();
