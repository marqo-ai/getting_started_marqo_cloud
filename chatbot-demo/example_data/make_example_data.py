import os
import json

# Folder path and JSON file path
folder_path = "texts"
json_file_path = "example_data.json"

# List to store the objects
data_list = []

# Iterate over each file in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        print("Adding file:", filename)
        file_path = os.path.join(folder_path, filename)
        with open(file_path, "r") as file:
            # Read the contents of the file
            file_contents = file.read()

            # Create the object with "text" and "_id" keys
            data_object = {
                "text": file_contents,
                "_id": filename
            }

            # Add the object to the list
            data_list.append(data_object)

# Write the list of objects to the JSON file
with open(json_file_path, "w") as json_file:
    json.dump(data_list, json_file, indent=4)

print("JSON file created successfully.")
