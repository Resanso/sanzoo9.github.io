function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

const paragraph = document.getElementById("typing-paragraph");
const text = paragraph.textContent;
const length = text.length;
let index = 0;

const typingInterval = setInterval(() => {
  if (index < length) {
    paragraph.textContent = text.slice(0, index) + " ▏";
    index++;
  } else {
    clearInterval(typingInterval);
  }
}, 100);
