cd client
npm run build
cd ..
mv client/dist server
cd server
rm -rf public
mv dist public
node index.js
