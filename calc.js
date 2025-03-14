// calc.js

const rows = document.querySelectorAll(".row");

rows.forEach(row => {
    row.addEventListener('mousedown', (event) => {
        event.target.setAttribute("style", `
            background-color: lightgray;
            border: 2px solid black;
            box-shadow: 0px 0px 0px 0px;
            `);
});

    row.addEventListener("mouseup", (event) => {
        event.target.setAttribute("style", `
            background-color: #f0f0f0;
            border: 1px solid black;
            box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
            `);
});
});
