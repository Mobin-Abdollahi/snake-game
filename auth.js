function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("یوزرنیم و پسورد را وارد کنید");
    return;
  }

  let users = JSON.parse(localStorage.getItem("snake_users")) || {};

  // اگر کاربر وجود نداشت → ثبت‌نام
  if (!users[username]) {
    users[username] = {
      password: password,
      bestScore: 0
    };
  } else {
    // اگر وجود داشت → بررسی پسورد
    if (users[username].password !== password) {
      alert("پسورد اشتباه است");
      return;
    }
  }

  // ذخیره اطلاعات
  localStorage.setItem("snake_users", JSON.stringify(users));

  // ست کردن کاربر فعال
  localStorage.setItem("currentUser", username);

  // رفتن به بازی
  window.location.href = "index.html";
}
