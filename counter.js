const KEY = `blabsdaskdafs`;
const NAMESPACE = "battleshadyminmusikk";
const COUNT_URL = `https://api.countapi.xyz`;

const counter = document.getElementById("visit-count");

const getCount = async () => {
    const response = await fetch(`${COUNT_URL}/get/${NAMESPACE}/${KEY}`);
    const data = await response.json();
    setValue(data.value);
};

const incrementCount = async () => {
    const response = await fetch(`${COUNT_URL}/hit/${NAMESPACE}/${KEY}`);
    const data = await response.json();
    setValue(data.value);
};

const setValue = (num) => {
    document.getElementById("visit-count").innerText = `Visitors: ${num}`;
};

if (localStorage.getItem("hasVisited") == null) {
    incrementCount()
        .then(() => {
            localStorage.setItem("hasVisited", "true");
        })
        .catch((err) => console.log(err));
} else {
    getCount()
        .catch((err) => console.log(err));
}
