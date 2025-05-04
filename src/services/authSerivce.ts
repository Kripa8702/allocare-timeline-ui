export const fetchLoginDetails = async (body: {
  email: string;
  password: string;
}) => {
  const response = await fetch(
    'https://b3ef-103-240-207-253.ngrok-free.app/api/login',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch allocation data');
  }

  return response.json();
};
