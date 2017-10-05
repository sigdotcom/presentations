secret_file = open("top_secret.txt", mode="r")
for index, line in enumerate(secret_file):
    print("{}: {}".format(index, line))
secret_file.close()
