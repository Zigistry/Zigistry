brew install zig
curl -o ./a.json https://example.com/data
curl -o ./b.json https://example.com/data
curl -o ./c.json https://example.com/data
zig run ./scripts/main.zig > ./database/main.json
rm -rf ./a.json
rm -rf ./b.json
rm -rf ./c.json