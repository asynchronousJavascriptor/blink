#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <output-format> <folder>"
    echo "Supported output formats: jpg, png"
    exit 1
fi

# Get the output format and folder from the arguments
output_format=$1
input_folder=$2

# Check if the output format is valid
if [[ "$output_format" != "jpg" && "$output_format" != "png" ]]; then
    echo "Invalid output format: $output_format"
    echo "Supported formats are jpg and png"
    exit 1
fi

# Check if the input folder exists
if [ ! -d "$input_folder" ]; then
    echo "The specified folder does not exist: $input_folder"
    exit 1
fi

# Create a new folder inside the input folder to store the converted images
output_folder="$input_folder/converted_$output_format"
mkdir -p "$output_folder"

# Loop through all the files in the input folder
for input_file in "$input_folder"/*; do
    # Check if the file is a regular file
    if [ -f "$input_file" ]; then
        # Extract the file name without the extension
        filename=$(basename "$input_file" | cut -d. -f1)

        # Determine the output file name
        output_file="$output_folder/${filename}.${output_format}"

        # Convert the file to the desired format using ImageMagick's convert tool
        convert "$input_file" "$output_file"

        # Check if the conversion was successful
        if [ $? -eq 0 ]; then
            echo "Converted $input_file to $output_file"
        else
            echo "Failed to convert $input_file"
        fi
    fi
done