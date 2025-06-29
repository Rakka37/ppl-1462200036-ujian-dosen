const form = document.getElementById("formRegistrasi");
const errorDisplay = document.getElementById("error");

//Ambil data email yang sudah pernah dipakai dari localStorage
let usedEmails = JSON.parse(localStorage.getItem("usedEmails")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const konfirmasi = document.getElementById("konfirmasi").value;

  errorDisplay.textContent = "";
  errorDisplay.style.color = "red";

  if (!nama || !email || !password || !konfirmasi) {
    errorDisplay.textContent = "Semua field wajib diisi.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDisplay.textContent = "Format email salah.";
    return;
  }

  if (password.length < 8) {
    errorDisplay.textContent = "Password minimal 8 karakter.";
    return;
  }

  if (password !== konfirmasi) {
    errorDisplay.textContent = "Password dan konfirmasi tidak cocok.";
    return;
  }

  //email sudah digunakan?
  if (usedEmails.includes(email.toLowerCase())) {
    errorDisplay.textContent = "Email sudah digunakan, silakan pakai email lain.";
    return;
  }

  //Simpan email ke localStorage (berhasil)
  usedEmails.push(email.toLowerCase());
  localStorage.setItem("usedEmails", JSON.stringify(usedEmails));

  errorDisplay.style.color = "green";
  errorDisplay.textContent = "Registrasi berhasil!";
});
