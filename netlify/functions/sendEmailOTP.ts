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
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    }
  }

  try {
    const { email } = JSON.parse(event.body || '{}')

    const response = await axios.post(
      'https://email-pan-api-proxy-2led60.5sc6y6-2.usa-e2.cloudhub.io/otp/email/generate',
      { email },
      {
        headers: {
          'client_id': '78778fe63aab428493a507be54fd4820',
          'client_secret': '8B0bE01F547E452e83E0879a51B6660C',
        },
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
