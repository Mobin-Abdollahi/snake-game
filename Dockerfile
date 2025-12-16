# استفاده از Nginx سبک
FROM nginx:alpine

# حذف کانفیگ پیش‌فرض Nginx
RUN rm /etc/nginx/conf.d/default.conf

# کپی فایل‌های پروژه داخل مسیر وب‌سرور
COPY . /usr/share/nginx/html

# کپی کانفیگ سفارشی Nginx
COPY nginx.conf /etc/nginx/conf.d

# پورت 80
EXPOSE 80

# اجرای nginx
CMD ["nginx", "-g", "daemon off;"]
