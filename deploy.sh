# deploy.sh文件
# 确保脚本抛出遇到的错误
set -e

npm run build

# 进入生成的文件夹
cd ./public

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>(REPO就是之前创建的仓库名)
git remote add origin git@github.com:1553690132/blog.git
git branch -M main
git push -f git@github.com:1553690132/blog.git main:gh-pages

cd -

