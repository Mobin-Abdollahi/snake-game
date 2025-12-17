function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("یوزرنیم و پسورد را وارد کنید");
    return;
  }

  let users = JSON.parse(localStorage.getItem("snake_users")) || {};

  if (!users[username]) {
    users[username] = {
      password: password,
      bestScore: 0
    };
  } else {
    if (users[username].password !== password) {
      alert("پسورد اشتباه است");
      return;
    }
  }
  localStorage.setItem("snake_users", JSON.stringify(users));
  localStorage.setItem("currentUser", username);
  window.location.href = "index.html";
}
