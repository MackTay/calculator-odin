// calc.js

const btn = document.querySelectorAll("button");

btn.addEventListener("mousedown", (event) => {
    event.target.style.backgroundColor = "blue";
});

btn.addEventListener("mouseup", function() {
    this.style.backgroundColor = "#f0f0f0";
});