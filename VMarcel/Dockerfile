FROM alpine:3.8

RUN apk update && \
	apk add git && \
	apk add --update nodejs nodejs-npm && \
	npm i -g nodemon && \
	mkdir 42

RUN	apk add --update zsh
RUN	wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true



EXPOSE 4000

WORKDIR 42/

CMD /bin/zsh

# docker build -t mars .
# docker run -it --mount type=bind,source="$(pwd)"/,target=/42  -p 4000:4000 mars
# export HOME=/
# export PROMPT="$fg[red]%} ukulele %d> %{$reset_color%}%"
# npm run dev