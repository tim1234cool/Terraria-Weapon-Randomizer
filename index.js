let currentStage = 1;
let blackList = JSON.parse(localStorage.getItem("blackList")) || [];

const getRandomButton = document.getElementById("getRandomWeapon");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const weaponDisplay = document.getElementById("weaponDisplay");
const stageDisplay = document.getElementById("stageDisplay");
const clearBlackListButton = document.getElementById("clearBlackListButton");
const weaponImage = document.getElementById("weaponImage");

const backgrounds = [
    "./images/backgrounds/timulac_castle.png",
    "./images/backgrounds/tim1234cool_jungle_bubble.png",
    "./images/backgrounds/tim1234cool_old_main.png",
    "./images/backgrounds/beastular_mushroom.png",
    "./images/backgrounds/beastular_solar_pyramid.png",
    "./images/backgrounds/beastular_tree.png",
    "./images/backgrounds/tim1234cool_jungle_bubble.png",
    "./images/backgrounds/tim1234cool_old_main.png",
    "./images/backgrounds/timulac_observatory.png",
    "./images/backgrounds/timulac_floating_island.png"
];

const textFiles = {
    1: "./weapons/prehardmode/Slime.txt",
    2: "./weapons/prehardmode/Eye.txt",
    3: "./weapons/prehardmode/Evil.txt",
    4: "./weapons/prehardmode/Deer.txt",
    5: "./weapons/prehardmode/Bee.txt",
    6: "./weapons/prehardmode/Skeletron.txt",
    7: "./weapons/prehardmode/Wall.txt",
    8: "./weapons/hardmode/QueenSlime.txt",
    9: "./weapons/hardmode/Mech.txt",
    10: "./weapons/hardmode/MultiMech.txt",
    11: "./weapons/hardmode/Plantera.txt",
    12: "./weapons/hardmode/Duke.txt",
    13: "./weapons/hardmode/Empress.txt",
    14: "./weapons/hardmode/Cultist.txt",
    15: "./weapons/hardmode/MoonLord.txt"
};

const stageNames = {
    1: "King Slime",
    2: "Eye of Cthulhu",
    3: "Evil Boss",
    4: "Deerclops",
    5: "Queen Bee",
    6: "Skeletron",
    7: "Wall of Flesh",
    8: "Queen Slime",
    9: "Mech Boss",
    10: "All Mech Bosses",
    11: "Plantera",
    12: "Duke Fishron",
    13: "Empress of Light",
    14: "Lunatic Cultist",
    15: "Moon Lord"
};

nextButton.addEventListener("click", function() {
    if (currentStage < Object.keys(textFiles).length) {
        currentStage++;
        stageDisplay.textContent =
            stageNames[currentStage] + "(" + currentStage + "/15)";
    }
});

previousButton.addEventListener("click", function() {
    if (currentStage > 1) {
        currentStage--;
        stageDisplay.textContent =
            stageNames[currentStage] + "(" + currentStage + "/15)";
    }
});

async function getRandomWeapon() {
    const file = textFiles[currentStage];

    const response = await fetch(file);
    const text = await response.text();

    const weapons = text
        .split("\n")
        .map(weapon => weapon.trim())
        .filter(weapon => weapon !== "");

    // Remove weapons that have already been selected
    const availableWeapons = weapons.filter(
        weapon => !blackList.includes(weapon)
    );

    // If all weapons have been selected, reset the blacklist
    if (availableWeapons.length === 0) {
        blackList = [];

        // After resetting, all weapons are available again
        const randomIndex = Math.floor(Math.random() * weapons.length);
        const weapon = weapons[randomIndex];

        blackList.push(weapon);
        localStorage.setItem("blackList", JSON.stringify(blackList));

        return weapon;
    }

    const randomIndex = Math.floor(Math.random() * availableWeapons.length);
    const weapon = availableWeapons[randomIndex];

    blackList.push(weapon);
    localStorage.setItem("blackList", JSON.stringify(blackList));

    return weapon;
}

getRandomButton.addEventListener("click", async function() {
    const weapon = await getRandomWeapon();

    weaponDisplay.textContent = weapon;

    weaponImage.src = getWeaponImage(weapon);
    weaponImage.alt = weapon;
    weaponImage.style.display = "block";

    console.log("blacklisted " + weapon);
});

clearBlackListButton.addEventListener("click", function() {
    blackList = [];

    localStorage.removeItem("blackList");

    console.log("Blacklist cleared");

    weaponDisplay.textContent = "";
    weaponImage.style.display = "none";
});

function getWeaponImage(weapon) {
    return "./images/" + weapon.replaceAll(" ", "_") + ".webp";
}

const randomBackground =
    backgrounds[Math.floor(Math.random() * backgrounds.length)];

document.body.style.backgroundImage = `url("${randomBackground}")`;