function studentsStatsaverage() {
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
  let choosenTeam = teamArray
    .filter((student) => student.choosen === true)
    .map((obj) => obj.darkArts);

  let avg = choosenTeam.reduce((a, b) => a + b) / choosenTeam.length;

  return avg;
}

console.log(studentsStatsaverage());
