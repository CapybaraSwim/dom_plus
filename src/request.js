const response = await client.request.post('/api/v4/contacts', [
    {
      name: "Walter White",
      request_id: 143,
      // другие поля ...
    }
  ]
);