const tabla = Array.from(document.getElementById("gameGrid").children)
let currentplr = "X"
let canplace = true
let turn = 0
tabla.forEach((cell)=>{
    cell.addEventListener("click", (e) =>{
        e.preventDefault()
        if(cell.innerHTML === "" && canplace === true){
            
            if (currentplr == "X"){
                cell.innerHTML = currentplr
                cell.style.color = "red"
                currentplr = "O"
                
                document.getElementById("turnindicator").textContent = currentplr
                document.getElementById("turnindicator").style.color = "lightblue"
            }
            else{
                cell.innerHTML = currentplr
                cell.style.color = "lightblue"
                currentplr = "X"
                document.getElementById("turnindicator").textContent = currentplr
                document.getElementById("turnindicator").style.color = "red"
            }
            turn++
            winch()
        } 
    })
})




function reset(){
    tabla.forEach((cell)=>{
       
           cell.innerHTML = ""

        })
        currentplr = "X"
        document.getElementById("turnindicator").style.color = "red"
        document.getElementById("turnindicator").textContent = currentplr
        document.getElementById("asd").textContent = "'s turn"
        canplace = true
        turn = 0
}



function winch(){
const mapState = tabla.map((cell) => cell.innerHTML)
if(mapState[0] == "X" && mapState[1] == "X" && mapState[2]  == "X"){
    gameWon("X");
}
if(mapState[3] == "X" && mapState[4] == "X" && mapState[5]  == "X"){
    gameWon("X");
}
if(mapState[6] == "X" && mapState[7] == "X" && mapState[8]  == "X"){
    gameWon("X");
}
if(mapState[0] == "X" && mapState[3] == "X" && mapState[6]  == "X"){
    gameWon("X");
}
if(mapState[1] == "X" && mapState[4] == "X" && mapState[7]  == "X"){
    gameWon("X");
}
if(mapState[2] == "X" && mapState[5] == "X" && mapState[8]  == "X"){
    gameWon("X");
}
if(mapState[0] == "X" && mapState[4] == "X" && mapState[8]  == "X"){
    gameWon("X");
}
if(mapState[2] == "X" && mapState[4] == "X" && mapState[6]  == "X"){
    gameWon("X");
}
if(mapState[0] == "O" && mapState[1] == "O" && mapState[2]  == "O"){
    gameWon("O");
}
if(mapState[3] == "O" && mapState[4] == "O" && mapState[5]  == "O"){
    gameWon("O");
}
if(mapState[6] == "O" && mapState[7] == "O" && mapState[8]  == "O"){
    gameWon("O");
}
if(mapState[0] == "O" && mapState[3] == "O" && mapState[6]  == "O"){
    gameWon("O");
}
if(mapState[1] == "O" && mapState[4] == "O" && mapState[7]  == "O"){
    gameWon("O");
}
if(mapState[2] == "O" && mapState[5] == "O" && mapState[8]  == "O"){
    gameWon("O");
}
if(mapState[0] == "O" && mapState[4] == "O" && mapState[8]  == "O"){
    gameWon("O");
}
if(mapState[2] == "O" && mapState[4] == "O" && mapState[6]  == "O"){
    gameWon("O");
}
console.log(turn)
if(turn == 9){
    document.getElementById("turnindicator").textContent = ""
    document.getElementById("asd").textContent = "Tie"
}
}
function gameWon(winner){
    canplace = false
            if (winner == "X"){
                document.getElementById("turnindicator").style.color = "red"
            }
            else{     
                document.getElementById("turnindicator").style.color = "lightblue"
            }
    document.getElementById("turnindicator").textContent = winner
    document.getElementById("asd").textContent = "won the game"
}