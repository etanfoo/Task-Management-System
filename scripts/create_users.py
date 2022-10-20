import requests
import json
import sys

from http import HTTPStatus

API_PORT = 7777
URL = f'http://localhost:{API_PORT}/api/v1/profile/signup'
JSON_FILE_PATH = 'mock_signup_data.json'
MAX_USERS_TO_CREATE = 1000
MIN_USERS_TO_CREATE = 1

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(f"Usage: python3 {sys.argv[0]} [number]")
        exit(1)
    number_of_users_to_create = int(sys.argv[1])
    if number_of_users_to_create > MAX_USERS_TO_CREATE:
        print(f"Maximum users to create is {MAX_USERS_TO_CREATE}")
        exit(1)
    elif number_of_users_to_create < MIN_USERS_TO_CREATE:
        print(f"Minimum users to create is {MIN_USERS_TO_CREATE}")
        exit(1)

    with open(JSON_FILE_PATH) as f:
        users = json.load(f)

    for i in range(number_of_users_to_create):
        user = users[i]
        payload = { "name": user.get("name"), "email": user.get("email"), "password": user.get("password")}
        response = requests.post(URL, json=payload)
        if response.status_code != HTTPStatus.OK:
            print(f"Error! Sent {i} POST requests to {URL} before exiting...")
            exit(1)

    print(f"Success! Sent {i+1} POST requests to {URL}.")