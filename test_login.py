import urllib.request
import urllib.parse
import json

try:
    data = urllib.parse.urlencode({'username': 'admin@srto.com', 'password': 'admin123'}).encode('ascii')
    req = urllib.request.Request('http://localhost:8000/api/v1/auth/login', data=data, method='POST')
    response = urllib.request.urlopen(req)
    token_data = json.loads(response.read())
    print("Login successful:", token_data)
    
    req2 = urllib.request.Request('http://localhost:8000/api/v1/auth/me', headers={'Authorization': f"Bearer {token_data['access_token']}"})
    response2 = urllib.request.urlopen(req2)
    print("Me successful:", response2.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
    if hasattr(e, 'read'):
        print(e.read().decode('utf-8'))
