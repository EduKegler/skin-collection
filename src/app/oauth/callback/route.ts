import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const session_state = searchParams.get("session_state");
  const iss = searchParams.get("iss");

  const clientId = process.env.RIOT_APPLICATION_CLIENT_ID;
  const clientSecret = process.env.RIOT_APPLICATION_CLIENT_SECRET;

  const accessCode = request.nextUrl.searchParams.get("code") ?? "";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", accessCode);
  params.append("redirect_uri", "https://skincollection.gg/oauth/callback");

  // const basicAuth =
  //   "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // try {
  //   const response = await fetch(`${iss}/token`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       Authorization: basicAuth,
  //     },
  //     body: params.toString(),
  //   });

  //   const data = await response.json();
  //   // faça algo com a resposta?

  //   return NextResponse.json(data);
  // } catch (error) {
  //   console.error("Erro:", error);
  //   return NextResponse.error();
  // }

  const res = await fetch(`${iss}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code ?? "",
      redirect_uri: "https://skincollection.gg/oauth/callback",
    }),
  });

  console.table({
    code,
    session_state,
    iss,
    base: btoa(clientId + "" + clientSecret),
  });
  const data = await res.json();
  return Response.json({ data });
}
