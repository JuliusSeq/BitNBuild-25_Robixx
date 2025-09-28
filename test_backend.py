import requests

url = "http://localhost:5000/sentiment"
payload = {
    "comments": [
        "I love this product! It is amazing.",
        "Worst experience ever.",
        "It was okay, nothing special."
    ]
}

response = requests.post(url, json=payload)
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
