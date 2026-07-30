import fs from "fs";

const archivo = "./src/data/equivalencias.json";

const datos = JSON.parse(fs.readFileSync(archivo, "utf8"));

const nuevo = {};

for (const [clave, valor] of Object.entries(datos)) {
  nuevo[valor] = clave;
}

fs.writeFileSync(
  archivo,
  JSON.stringify(nuevo, null, 2),
  "utf8"
);

console.log("✅ equivalencias.json corregido.");