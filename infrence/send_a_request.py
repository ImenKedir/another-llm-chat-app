import requests
from typing import TypedDict
import json

# this will send a request to a streaming enpoint
# and print the response, place your url in the url variable
def send_request(url):
    with requests.get(url, stream=True) as response:
        # Check if the request was successful
        if response.status_code == 200:
            # Iterate over the response
            for line in response.iter_lines():
                # Decode the line and handle it
                if line:
                    try:
                        # Parse the JSON object
                        decoded_line = json.loads(line.decode('utf-8'))
                        # Print only the text content
                        if 'text' in decoded_line:
                            print(decoded_line['text'])
                    except json.JSONDecodeError:
                        print("Error: Unable to decode JSON.")
        else:
            print(f"Error: Received response code {response.status_code}")

url = ""
send_request(url)
        