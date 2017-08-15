import axios from "axios";

export default async function handler(event, context) {
  if (!event.queryStringParameters || !event.queryStringParameters.ethAccount) {
    return context.succeed({
      statusCode: 500,
      headers: {
        "Content-Type": "Content-Type:application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Invalid or No Ethereum account on Request" }),
    });
  }

  const ethAccount = event.queryStringParameters.ethAccount;

  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${ethAccount}&tag=latest`,
    );

    const responseData = response.data;
    console.log(responseData, "responseData");
    const weiBalance = responseData.result;
    const etherBalance = parseFloat(weiBalance, 10) / Math.pow(10, 18);

    return context.succeed({
      statusCode: 200,
      headers: {
        "Content-Type": "Content-Type:application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(etherBalance),
    });
  } catch (e) {
    console.error(e);
    console.error(e.meesage);
    return context.succeed({
      statusCode: 500,
      headers: {
        "Content-Type": "Content-Type:application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(e.message),
    });
  }
}
