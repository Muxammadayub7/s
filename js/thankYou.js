async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) return;

  const formDataObj = JSON.parse(formDataRaw);
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzsVRM973h3nfGLC8nxYcndmYo2HqncOyMClyU_0a7ScpE3E1JdXJ2jWfSRqxJSryOg/exec";

  const formData = new FormData();
  // DIQQAT: Sheets'dagi ustun nomlari bilan bir xil bo'lishi shart!
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat);

  try {
    // Google Script uchun 'no-cors' rejimi shart!
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors", // Bu bo'lmasa xato beradi
    });

    // 'no-cors' rejimida biz response.ok ni tekshira olmaymiz (u har doim 0 qaytadi)
    // Shuning uchun so'rov ketganidan keyin localStorage'ni tozalaymiz
    console.log("Ma'lumot yuborildi!");
    localStorage.removeItem("formData");

  } catch (error) {
    console.error("Xatolik:", error);
    if(document.getElementById("errorMessage")) {
        document.getElementById("errorMessage").style.display = "block";
    }
  }
}

window.onload = sendFormData;