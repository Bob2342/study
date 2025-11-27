/* --------------------------
   LOCAL STORAGE HELPERS
---------------------------*/

function save(id) {
    const value = document.getElementById(id).value;
    localStorage.setItem(id, value);
}

function load(id) {
    const el = document.getElementById(id);
    if (localStorage.getItem(id)) {
        el.value = localStorage.getItem(id);
    }
}

/* CHECKLISTS */
function toggleCheck(id) {
    const box = document.getElementById(id);
    localStorage.setItem(id, box.checked);
}

function loadCheck(id) {
    const box = document.getElementById(id);
    const saved = localStorage.getItem(id);
    if (saved === "true") box.checked = true;
}

/* FLASHCARDS */
function addFlashcard(subject) {
    const q = document.getElementById(subject + "-q").value;
    const a = document.getElementById(subject + "-a").value;

    if (!q || !a) return alert("Enter question + answer");

    const list = document.getElementById(subject + "-flashcards");
    const item = document.createElement("li");
    item.textContent = `Q: ${q} — A: ${a}`;
    list.appendChild(item);

    /* Save */
    let arr = JSON.parse(localStorage.getItem(subject + "-flashcards") || "[]");
    arr.push({ q, a });
    localStorage.setItem(subject + "-flashcards", JSON.stringify(arr));

    document.getElementById(subject + "-q").value = "";
    document.getElementById(subject + "-a").value = "";
}

function loadFlashcards(subject) {
    let arr = JSON.parse(localStorage.getItem(subject + "-flashcards") || "[]");
    const list = document.getElementById(subject + "-flashcards");

    arr.forEach(card => {
        const li = document.createElement("li");
        li.textContent = `Q: ${card.q} — A: ${card.a}`;
        list.appendChild(li);
    })
}

/* ENGLISH ESSAY CHECKER */
function sendEssay() {
    const essay = document.getElementById("english-essay").value;
    if (!essay.trim()) return alert("Enter your essay!");

    const prompt = encodeURIComponent("Is this good for Nat 5 English?\n\n" + essay);
    window.open("https://chat.openai.com/?q=" + prompt, "_blank");
}
