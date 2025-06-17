import axios from 'axios';

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { phone } = JSON.parse(event.body || '{}');

  try {
    const response = await axios.post(
      'https://kotakcards-uat.kotak.com/api/apps/generateOTP',
      {
        mobileNumber: phone,
        notificationType: 'SMS',
      },
      {
        headers: {
          'x-traceid': '64f0d7bccf9a4b67',
          'x-transactionid': '691baa88229b4a67',
        },
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(response.data),
    };
  } catch (err: any) {
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({
        error: err.response?.data || err.message,
      }),
    };
  }
};
