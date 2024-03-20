import "reflect-metadata";

async function handler() {
  console.log("Inicio");

  return {
    statusCode: 200,
    headers: {
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify({
      message: "http cheese",
    }),
  };
}

export { handler };
