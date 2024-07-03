###################
# Gaming Section
###################



URL1="https://api.github.com/repos/Not-Nik/raylib-zig"
URL2="https://api.github.com/repos/hexops/mach"
URL3="https://api.github.com/repos/zig-gamedev/zig-gamedev"
URL4="https://api.github.com/repos/Jack-Ji/jok"
URL5="https://api.github.com/repos/prime31/zig-gamekit"


# Define the final output file
OUTPUT_FILE="./games.json"

# Download the content from each URL, format it, and save it to the final file
{
  echo "["  # Start with a [
  wget -q -O - $URL1  # Get content from URL1
  echo ","  # Add a comma separator
  wget -q -O - $URL2  # Get content from URL2
  echo ","
  wget -q -O - $URL3
  echo ","
  wget -q -O - $URL4
  echo ","
  wget -q -O - $URL5
  echo "]"  # End with a ]
} > $OUTPUT_FILE

echo "Combined content saved to $OUTPUT_FILE"



#################
# Web Section
#################

URL1="https://api.github.com/repos/zigzap/zap"
URL2="https://api.github.com/repos/jetzig-framework/jetzig"
URL3="https://api.github.com/repos/karlseguin/http.zig"
URL4="https://api.github.com/repos/karlseguin/websocket.zig"
URL5="https://api.github.com/repos/ikskuh/zig-network"


# Define the final output file
OUTPUT_FILE="./web.json"

# Download the content from each URL, format it, and save it to the final file
{
  echo "["  # Start with a [
  wget -q -O - $URL1  # Get content from URL1
  echo ","  # Add a comma separator
  wget -q -O - $URL2  # Get content from URL2
  echo ","
  wget -q -O - $URL3
  echo ","
  wget -q -O - $URL4
  echo ","
  wget -q -O - $URL5
  echo "]"  # End with a ]
} > $OUTPUT_FILE

echo "Combined content saved to $OUTPUT_FILE"



#################
# GUI Section
#################

URL1="https://api.github.com/repos/capy-ui/capy"
URL2="https://api.github.com/repos/david-vanderson/dvui"
URL3="https://api.github.com/repos/kassane/qml_zig"
URL4="https://api.github.com/repos/MoAlyousef/zfltk"
URL5="https://api.github.com/repos/Aransentin/ZWL"


# Define the final output file
OUTPUT_FILE="./gui.json"

# Download the content from each URL, format it, and save it to the final file
{
  echo "["  # Start with a [
  wget -q -O - $URL1  # Get content from URL1
  echo ","  # Add a comma separator
  wget -q -O - $URL2  # Get content from URL2
  echo ","
  wget -q -O - $URL3
  echo ","
  wget -q -O - $URL4
  echo ","
  wget -q -O - $URL5
  echo "]"  # End with a ]
} > $OUTPUT_FILE

echo "Combined content saved to $OUTPUT_FILE"
