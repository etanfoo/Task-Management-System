import requests
import json

from http import HTTPStatus

API_PORT = 7777
BASE_URL = f'http://localhost:{API_PORT}/api/v1'
SIGNUP_ENDPOINT = f'{BASE_URL}/profile/signup'
JSON_FILE_PATH = 'mock_user_data.json'
NUMBER_OF_USERS = 50
USER_ABOUTME_CHARACTER_LIMIT = 250

PROJECT_ENDPOINT = f'{BASE_URL}/project'
REACT_APP_TOKEN = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvdHJhaGVhcjBAbGl2ZWludGVybmV0LnJ1IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3Nzc3L2FwaS92MS9wcm9maWxlL2xvZ2luIiwiZXhwIjoxNjY3MTk4NzgwfQ.INSe7YuZVsOMQYcxx_9LYFn65wflghbQY5RFr7hDtKU"


def main():
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

if __name__ == '__main__':
    main()

    #payload = { 
    #    "profileId": 11,
    #    "profiles": [1, 2, 3, 4, 5],
    #    "project": {
    #        "title": "project title",
    #        "description": "project description",
    #        "profiles": []
    #    }
    #}
    #headers = {
    #    "Authorization": REACT_APP_TOKEN
    #}

    #response = requests.post(PROJECT_ENDPOINT, json=payload, headers=headers)
    #print(response)