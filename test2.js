const Student = require("./models/Student.model");
require("./db");

  async function studentsAvg(grade) {
    //   let choosenTeam = teamArray
    //     .filter((student) => student.choosen === true)
    try {
      const team = await Student.find({choosen: true});
      const teamStats = team.map((obj) => obj[grade]);

      let avg = teamStats.reduce((a, b) => a + b) / teamStats.length;

      //console.log(avg)

      return avg;
    } catch (e) {
      console.log(
        "An error ocurred when calculating the stat dark arts average"
      );
    }
  }

 

//   console.log(`dark arts average value ${studentsAvgDarkArts()}`);

//   async function studentsAvgDefenseArts() {
//     //   let choosenTeam = teamArray
//     //     .filter((student) => student.choosen === true)
//     try {
//       const team = await Student.find({ choosen: true });
//       const teamStats = team.map((obj) => obj.defenseAgainstTheDarkArts);

//       let avg2 = teamStats.reduce((a, b) => a + b) / teamStats.length;

//       return avg2;
//       console.log(
//         `Defende against the dark arts average value ${studentsAvgDefenseArts()}`
//       );
//     } catch (e) {
//       console.log(
//         "An error ocurred when calculating the stat defense agaisnt dark arts average"
//       );
//     }
//   }

//   async function studentsAvgTransfiguration() {
//     //   let choosenTeam = teamArray
//     //     .filter((student) => student.choosen === true)
//     try {
//       const team = await Student.find({ choosen: true });
//       const teamStats = team.map((obj) => obj.transfiguration);

//       let avg3 = teamStats.reduce((a, b) => a + b) / teamStats.length;

//       return avg3;
//       console.log(
//         `Transfiguration average value ${studentsAvgTransfiguration()}`
//       );
//     } catch (e) {
//       console.log(
//         "An error ocurred when calculating the stat transfiguration average"
//       );
//     }
//   }

//   async function studentsAvgAlchemy() {
//     //   let choosenTeam = teamArray
//     //     .filter((student) => student.choosen === true)
//     try {
//       const team = await Student.find({ choosen: true });
//       const teamStats = team.map((obj) => obj.alchemy);

//       let avg4 = teamStats.reduce((a, b) => a + b) / teamStats.length;

//       return avg4;
//       console.log(`alchemy average value ${studentsAvgAlchemy()}`);
//     } catch (e) {
//       console.log("An error ocurred when calculating the stat alchemy average");
//     }
//   }

async function highestStat() {
    let dark = await studentsAvg("darkArts");
    let defense = await studentsAvg("defenseAgainstTheDarkArts");
    let trans = await studentsAvg("transfiguration");
    let alch = await studentsAvg("alchemy");

   // console.log("DARK: ", dark)


//   let high = Math.max(dark, defense, trans, alch);

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


async function winLose(){
 const statusresult = await highestStat();

 if(statusresult === "darkArts"){
     console.log("Dark magic worked test")
 }

 if(statusresult === "defense"){
    console.log("Defense worked test")
}
if(statusresult === "transfiguration"){
    console.log("morphing magic worked test")
}
if(statusresult === "alchemy"){
    console.log("potions worked test")
}

}
