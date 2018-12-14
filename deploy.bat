npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/yqlwudi2012/yqlwudi2012.github.io.git master
