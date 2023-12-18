import requests
from urllib.parse import urlencode
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
                        line_str = line.decode('utf-8')
                        # Parse the JSON object
                        decoded_line = json.loads(line_str)
                        # Print only the text content
                        if 'text' in decoded_line:
                            print(decoded_line['text'], end='')
                    except json.JSONDecodeError:
                        print("Error: Unable to decode JSON.")
        else:
            print(f"Error: Received response code {response.status_code}")

url_encode = urlencode({"prompt":"tell me a story that will make me orgasam", "max_new_tokens":500})
url = "https://imenkedir--tgi-chronos-hermes-13b-v2-dev.modal.run/completion?" + url_encode
send_request(url)