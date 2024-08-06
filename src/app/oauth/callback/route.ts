export async function GET(request: Request) {
  console.log("test1", request);
  console.log("test2", request.body);
  const res = await fetch("https://api.sampleapis.com/beers/ale", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY ?? "",
    },
  });

  const data = await res.json();

  return Response.json({ data });
}
