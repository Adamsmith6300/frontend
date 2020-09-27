
#!/bin/bash

npm run build
npm run export

aws-vault exec adam-lema --no-session -- aws s3 sync out s3://lema-website/