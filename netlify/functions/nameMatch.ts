import axios from 'axios'

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
    }
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { bcifValue } = JSON.parse(event.body || '{}')

    const payload = {
      sourceAppId: 'CCSFDC',
      requestId: '99758eb77e624f9f',
      applicationValue: 'md moushuf alam',
      bcifValue
    }

    const response = await axios.post(
      'https://kotakcards-uat.kotak.com/api/eligibility/nameMatch',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-traceid': 'a0A9H000000lAYbUAM',
          'x-transactionid': 'ac10185bb7cb4c48',
          'x-amzn-trace-id': 'c101a17471da4473-a0A9H000000lAYbUAM'
        }
      }
    )

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(response.data),
    }
  } catch (err: any) {
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({
        error: err.response?.data || err.message,
      }),
    }
  }
}
