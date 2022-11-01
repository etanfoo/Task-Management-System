import requests
import json

from http import HTTPStatus

API_PORT = 7777
BASE_URL = f'http://localhost:{API_PORT}/api/v1'
LOGIN_ENDPOINT = f'{BASE_URL}/profile/login'
SIGNUP_ENDPOINT = f'{BASE_URL}/profile/signup'
PROFILE_ENDPOINT = f'{BASE_URL}/profile'
PROJECT_ENDPOINT = f'{BASE_URL}/project'
CONNECT_ENDPOINT = f'{BASE_URL}/profile/connect'
ACCEPT_CONNECT_ENDPOINT = f'{BASE_URL}/profile/accept'

MOCK_USER_DATA_FILE_PATH = 'mock_user_data.json'
PROFILE_ABOUTME_CHARACTER_LIMIT = 250

NUMBER_OF_USERS = 100
NUMBER_OF_CONNECTIONS = 30
NUMBER_OF_PROJECTS = 15

FIRST_USER_ID = 1

def create_users() -> dict:
    with open(MOCK_USER_DATA_FILE_PATH) as f:
        users = json.load(f)

    for i in range(NUMBER_OF_USERS):
        user = users[i]
        payload = { 
            "name": user.get("name"),
            "email": user.get("email"),
            "password": user.get("password"),
            "aboutMe": user.get("aboutMe")[:PROFILE_ABOUTME_CHARACTER_LIMIT],
            "happiness": user.get("happiness")
            }
        response = requests.post(SIGNUP_ENDPOINT, json=payload)
        if response.status_code != HTTPStatus.OK:
            print(f"Error {response.status_code}! Sent {i} POST requests to {SIGNUP_ENDPOINT} before exiting...")
            exit(1)

    print(f"Success! Sent {i+1} POST requests to {SIGNUP_ENDPOINT}.")

    payload = { 
        "email": users[0].get("email"),
        "password": users[0].get("password"),
        }

    response = requests.post(LOGIN_ENDPOINT, json=payload)
    if response.status_code != HTTPStatus.OK:
        print(f"Error {response.status_code}! Could not login as first user.")
        exit(1)

    first_user_access_token = response.json().get("access_token")
    return first_user_access_token


def create_connections(headers: dict):
    for i in range(FIRST_USER_ID + 1, NUMBER_OF_CONNECTIONS + 1):
        response = requests.post(f'{CONNECT_ENDPOINT}/{FIRST_USER_ID}/{i}', headers=headers)
        if response.status_code != HTTPStatus.OK:
            print(f"Error {response.status_code} when calling {CONNECT_ENDPOINT}.")
            exit(1)
    print(f"Success! Sent {NUMBER_OF_CONNECTIONS} POST requests to {CONNECT_ENDPOINT}.")

    for i in range(FIRST_USER_ID + 1, NUMBER_OF_CONNECTIONS + 1):
        response = requests.post(f'{ACCEPT_CONNECT_ENDPOINT}/{i}/{FIRST_USER_ID}', headers=headers)
        if response.status_code != HTTPStatus.OK:
            print(f"Error {response.status_code} when calling {ACCEPT_CONNECT_ENDPOINT}.")
            exit(1)
    print(f"Success! Sent {NUMBER_OF_CONNECTIONS} POST requests to {ACCEPT_CONNECT_ENDPOINT}.")

def create_projects(headers: dict):
    for i in range(NUMBER_OF_PROJECTS):
        payload = { 
            "profileId": FIRST_USER_ID,
            "profileIdsToAdd": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            "project": {
                "title": f"Epic Project #{i}.",
                "description": "An epic project description.",
                "profiles": []
            }
        }
        response = requests.post(f'{PROJECT_ENDPOINT}', json=payload, headers=headers)
        if response.status_code != HTTPStatus.OK:
            print(f"Error {response.status_code} when calling {PROJECT_ENDPOINT}.")
            exit(1)
    print(f"Success! Sent {NUMBER_OF_PROJECTS} POST requests to {PROJECT_ENDPOINT}.")

if __name__ == '__main__':
    first_user_access_token = create_users()
    headers = {
        "Authorization": first_user_access_token
    }
    create_connections(headers)
    create_projects(headers)