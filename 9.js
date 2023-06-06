function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults(){
  try{
    const winner1 = await luckyDraw('Tina');
    console.log(winner1)
    const winner2 = await luckyDraw('Jorge');
    console.log(winner2)
    const winner3 = await luckyDraw('Julien');
    console.log(winner3)
  }
  catch (error) {
    console.log(error);
  };
}

getResults();