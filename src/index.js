const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE:3,
    PODER: 3,
    PONTOS:0,
  }
  
  
const player2 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE:4,
    PODER: 3,
    PONTOS:0,
  }
  
  
async function rollDice(){
    return Math.floor(Math.random() * 6) +1;
  }
  
  
async function rollDiceBlock(){
    let random = Math.random()
    let result
    
    switch(true) {
      case random < 0.33:
        result = "RETA"
        break;
      case random < 0.66:
        result = "CURVA"
        break;
      default:
        result = "CONFRONTO"
        break;
    }
    return result
  }
  
  
async function rollResult(characterName,block,diceResult,attribute){
    console.log(`${characterName} 🎲 rolou um dato de ${block} somando seu total de ${diceResult} + ${attribute} = ${attribute + diceResult}`)  
 }
  
  
async function playRaceEngine(character1,character2){
    for (let rounds = 1; rounds <= 5; rounds++){
      console.log(`🏁 Round ${rounds} iniciando... 🏁`)
      // SORTEAR UM BLOCO DE Corrida
      let block = await rollDiceBlock();
      console.log(`Bloco: ${block}`);
    
    // ROLAR DADOS PARA CADA PLAYER
      let diceResult1 = await rollDice();
      let diceResult2 = await rollDice();
    
    // TOTAL DE HABILIDADE/TESTE
      let totalTesteSkills1 = 0;
      let totalTesteSkills2 = 0;
    
      if(block === "RETA"){
        totalTesteSkills1 = diceResult1 + character1.VELOCIDADE;
        totalTesteSkills2 = diceResult2 + character2.VELOCIDADE;
      
        await rollResult(
          character1.NOME,
          "VELOCIDADE",
          diceResult1,
          character1.VELOCIDADE
          );
        
        await rollResult(
          character2.NOME,
          "VELOCIDADE",
          diceResult2,
          character2.VELOCIDADE
          );
      }
      
      if(block === "CURVA"){
        totalTesteSkills1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTesteSkills2 = diceResult2 + character2.MANOBRABILIDADE;
      
        await rollResult(
          character1.NOME,
          "MANOBRABILIDADE",
          diceResult1,
          character1.MANOBRABILIDADE
          );
        
        await rollResult(
          character2.NOME,
          "MANOBRABILIDADE",
          diceResult2,
          character2.MANOBRABILIDADE
          );
      }
      
      if(block === "CONFRONTO"){
        let powerResults1 = diceResult1 + character1.PODER;
        let powerResults2 = diceResult2 + character2.PODER;
        
        console.log(`${character1.NOME} confrontou com o ${character2.NOME}!🥊`)
        
        await rollResult(
          character1.NOME,
          "PODER",
          diceResult1,
          character1.PODER
          );
        
        await rollResult(
          character2.NOME,
          "PODER",
          diceResult2,
          character2.PODER
          );
        
        if(powerResults1 > powerResults2 && character2.PONTOS > 0){
          console.log(`${character1.NOME} venceu o confronto ganhando 1 ponto🥊! ${character2.NOME} perdeu 1 ponto 🐢!`)
          character2.PONTOS--; 
        }
        
        if(powerResults2 > powerResults1 && character1.PONTOS > 0){
          console.log(`${character2.NOME} venceu o confronto ganhando 1 ponto🥊! ${character1.NOME} perdeu 1 ponto 🐢!`)
          character1.PONTOS--; 
        }
      
        console.log(
          powerResults1 === powerResults2 ? "🥊 Confronto empatado! Nenhum ponto perdido!" : "")
  
      }
      
      
    // VERIFICANDOO VENCEDOR
      if(totalTesteSkills1 > totalTesteSkills2){
        console.log(`${character1.NOME} marcou 1 ponto!`)
        character1.PONTOS++;
      }else if (totalTesteSkills2 > totalTesteSkills1){
        console.log(`${character2.NOME} marcou 1 ponto!`)
        character2.PONTOS++;
      }
      
      console.log("---------------------------------------------------------------------")
      
    }
    
  }
  
  
async function declareWinner(character1,character2){
    console.log("Resultado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);
    
    if(character1.PONTOS > character2.PONTOS)
      console.log(`\n${character1.NOME} venceu a corrida com o total de ${character1.PONTOS} ponto(s)👑`)
     else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n${character2.NOME} venceu a corrida com o total de ${character2.PONTOS} ponto(s)👑`)
      else
        console.log("\nA corrida terminou empate !")
      
  
  } 
  
  
  (async function main(){
    console.log(`🏁 Corrida entre ${player1.NOME} e ${player2.NOME} iniciando...\n`)
    
    
    await playRaceEngine(player1,player2);
    await declareWinner(player1,player2);
  })();