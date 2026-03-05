import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();
  const { data } = body;

  if (!data) {
    return new Response(
      JSON.stringify({ error: "No data provided" }),
      { status: 400 }
    );
  }

  const secret = process.env.SECRET_KEY;

  if (!secret) {
    return new Response(
      JSON.stringify({ error: "SECRET_KEY missing" }),
      { status: 500 }
    );
  }

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

  return new Response(
    JSON.stringify({ signature }),
    { status: 200 }
  );
}
