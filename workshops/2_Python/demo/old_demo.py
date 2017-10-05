# idonotwantthis@mailinator.com
import json
import requests

def generate_api_key():
    client_id = "36bdebfe6f154bdb92d9f133dbeaeee5" # Enter your client id here
    client_secret = "e465732fb65a4631b6611b99565e204f" # Enter your client secret here

    grant_type = 'client_credentials'

    #Request based on Client Credentials Flow from
    # https://developer.spotify.com/web-api/authorization-guide/

    # Request body parameter: grant_type Value: Required. Set it to
    # client_credentials
    body_params = {'grant_type' : grant_type}

    url='https://accounts.spotify.com/api/token'

    response=requests.post(url, data=body_params, auth = (client_id, client_secret))

    return response.json()


def gather_songs(api_key, bearer_header):
    request_url = "https://api.spotify.com/v1/users/kevin.schoonover/playlists"

    request = requests.get(
        request_url,
        headers={'Authorization': bearer_header}
    )

    return request.json()

if __name__ == "__main__":
    # print(generate_api_key())
    api_key = "BQCZvvwjEysbi5ehV29LA3DyFQiu1UUJTxVRPKvLHvxuYcKIRBs4pbCmblGWjzg_xZRBn7vskdCYrRKqRJZzhA"
    request_url = "https://api.spotify.com/v1/users/kevin.schoonover/playlists"
    bearer_header = "Bearer {}".format(api_key)

    playlist_list = gather_songs(api_key, bearer_header)

    for playlist in playlist_list['items']:
        if "Discover" not in playlist['name']:
            continue

        response = requests.get(
            request_url + "/{}/".format(playlist['id']),
            headers={'Authorization': bearer_header}
        )
        print(json.dumps(response.json(), indent=4))
