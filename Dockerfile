# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_WEB3FORMS_KEY=PASTE_YOUR_KEY_HERE
ENV VITE_WEB3FORMS_KEY=$VITE_WEB3FORMS_KEY
RUN npm run build

# ---- serve ----
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
