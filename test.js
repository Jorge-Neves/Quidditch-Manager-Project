let teamArray = [
  {
    name: "Harry Potter",
    gender: "male",
    house: "Gryffindor",
    darkArts: 4,
    defenseAgainstTheDarkArts: 10,
    transfiguration: 3,
    alchemy: 3,
    health: true,
    choosen: true,
    isAStudent: true,
    isAHouse: false,
  },
  {
    name: "Hermione Granger",
    gender: "female",
    house: "Gryffindor",
    darkArts: 10,
    defenseAgainstTheDarkArts: 10,
    transfiguration: 10,
    alchemy: 10,
    health: true,
    choosen: true,
    isAStudent: true,
    isAHouse: false,
  },
  {
    name: "Ronald Weasley",
    gender: "male",
    house: "Gryffindor",
    darkArts: 3,
    defenseAgainstTheDarkArts: 6,
    transfiguration: 3,
    alchemy: 3,
    health: true,
    choosen: true,
    isAStudent: true,
    isAHouse: false,
  },
];

function studentsAvgDarkArts() {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.darkArts);

  let avg1 = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg1;
}

console.log(`dark arts average value ${studentsAvgDarkArts()}`);

function studentsAvgDefenseArts() {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.defenseAgainstTheDarkArts);

  let avg2 = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg2;
}

console.log(
  `Defende against the dark arts average value ${studentsAvgDefenseArts()}`
);

function studentsAvgTransfiguration() {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.transfiguration);

  let avg3 = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg3;
}
console.log(`Transfiguration average value ${studentsAvgTransfiguration()}`);

function studentsAvgAlchemy() {
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.alchemy);

  let avg4 = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg4;
}

console.log(`alchemy average value ${studentsAvgAlchemy()}`);

function highestStat() {
  let dark = studentsAvgDarkArts();
  let defense = studentsAvgDefenseArts();
  let trans = studentsAvgTransfiguration();
  let alch = studentsAvgAlchemy();
  let high = 0;

  high = Math.max(dark, defense, trans, alch);

  if (dark > defense && dark > trans && dark > alch) {
    return "darkArts";
  } else if (defense > dark && defense > trans && defense > alch) {
    return "defense";
  } else if (trans > dark && trans > defense && trans > alch) {
    return "transfiguration";
  } else {
    return "alchemy";
  }
}

console.log(highestStat());
