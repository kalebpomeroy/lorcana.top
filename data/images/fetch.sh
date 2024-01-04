curl https://api.lorcana-api.com/cards/all | jq '.[] | "curl -o \(.Set_Num)_\(.Card_Num).png \(.Image)"' -r | xargs -I % sh -c '%'
