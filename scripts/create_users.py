import requests
import json

from http import HTTPStatus

API_PORT = 7777
BASE_URL = f'http://localhost:{API_PORT}/api/v1'
SIGNUP_ENDPOINT = f'{BASE_URL}/profile/signup'
JSON_FILE_PATH = 'mock_user_data.json'
NUMBER_OF_USERS = 50
USER_ABOUTME_CHARACTER_LIMIT = 250

if __name__ == '__main__':

    with open(JSON_FILE_PATH) as f:
        users = json.load(f)

    for i in range(NUMBER_OF_USERS):
        user = users[i]
        payload = { 
            "name": user.get("name"),
            "email": user.get("email"),
            "password": user.get("password"),
            "aboutMe": user.get("aboutMe")[:USER_ABOUTME_CHARACTER_LIMIT],
            "happiness": user.get("happiness")
            }
        response = requests.post(SIGNUP_ENDPOINT, json=payload)
        if response.status_code != HTTPStatus.OK:
            print(f"Error {response.status_code}! Sent {i} POST requests to {SIGNUP_ENDPOINT} before exiting...")
            exit(1)

    print(f"Success! Sent {i+1} POST requests to {SIGNUP_ENDPOINT}.")