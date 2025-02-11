let size = 30; 
let gameBoard = document.querySelector("#gameBoard")

// build the net 
for(let i=0; i<size*size; i++){
    let cell = document.createElement("div")
    cell.classList.add("cell")
    gameBoard.appendChild(cell)
}
// create the snake value
let snake = [{x: 9, y: 9}]
// create the food value
let food = {x: Math.floor(Math.random() * size) , y: Math.floor(Math.random() * size)}
// create the direction value
let direction = {x: 1, y: 0}
// create the score vlaue
let score = 0
// create direction 
document.addEventListener("keydown" , createDirection)
function createDirection(event){
    if(event.keyCode === 37 && direction.x === 0){ // لو ضغطت علي الزرار الشمال و الثعبان كان بيتحرك راسي 
        direction = {x: -1 , y: 0} // left 
    }else if(event.keyCode === 38 && direction.y === 0){ // لو ضغطت علي الزرار الأعلي و الثعبان كان بيتحرك افقي 
        direction = {x: 0 , y: -1} // up
    }else if(event.keyCode === 39 && direction.x === 0){ // لو ضغطت علي الزرار اليمين و الثعبان كان بيتحرك راسي 
        direction = {x: 1 , y: 0} // right 
    }else if(event.keyCode === 40 && direction.y === 0){ // لو ضغطت علي الزرار الاسفل و الثعبان كان بيتحرك افقي 
        direction = {x: 0 , y: 1} // down
    }
}
// update the game 
function game(){
    // draw the snake head
    let head = {x: snake[0].x + direction.x , y: snake[0].y + direction.y}
    // verification game boundaries
    if(head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || collision(head)){
        alert("Game Over Score: " + score)
        clearInterval(gameloop)
        return
    }
    // add the head on the snake
    snake.unshift(head)
    // verification if the snake eat the food 
    if(head.x === food.x && head.y === food.y){
        score++
        createFood()
    }else{
        snake.pop()
    }
    // update the face
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("snake" , "food"))
    // draw the snake 
    snake.forEach(segment => {
        let index = segment.y * size + segment.x
        document.querySelectorAll('.cell')[index].classList.add("snake")
    })
    // draw the food
    let indexFood = food.y * size + food.x
    document.querySelectorAll(".cell")[indexFood].classList.add("food")
}
// create the new food
function createFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
            document.querySelectorAll('.cell')[newFood.y * size + newFood.x].style.backgroundColor === "blue"); // تأكد أن الطعام لا يظهر على الثعبان
    food = newFood;
}
// if the snake collision for yourself
function collision(head){
    for(let i=0; i< snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
        return true
        }
    }
    let index = head.y * size + head.x;
    if (document.querySelectorAll('.cell')[index].style.backgroundColor === "blue") {
        return true; // Collision with an obstacle
    }
    return false
}
// increase the speed
let gameloop;
let speed1 = document.querySelector(".s1")
let speed2 = document.querySelector(".s2")
let speed3 = document.querySelector(".s3")
let speed4 = document.querySelector(".s4")

speed1.addEventListener("click" , function(){
    if(gameloop){
        clearInterval(gameloop)
    }
    gameloop = setInterval(game , 400)
})
speed2.addEventListener("click" , function(){
    if(gameloop){
        clearInterval(gameloop)
    }
    gameloop = setInterval(game , 200)
})
speed3.addEventListener("click" , function(){
    if(gameloop){
        clearInterval(gameloop)
    }
    gameloop = setInterval(game , 100)
})
speed4.addEventListener("click" , function(){
    if(gameloop){
        clearInterval(gameloop)
    }
    gameloop = setInterval(game , 50)
})
// increase the size of net
let obstacles1 = document.querySelector(".z1")
let obstacles2 = document.querySelector(".z2")
let obstacles3 = document.querySelector(".z3")
let obstacles4 = document.querySelector(".z4")

obstacles1.addEventListener("click", function() {
    let cellIndex = Math.floor(Math.random() * size * size);
    let cell = document.querySelectorAll('.cell')[cellIndex];
    
    cell.style.backgroundColor = "blue"
});
obstacles2.addEventListener("click", function() {
    let cellIndex = Math.floor(Math.random() * size * size);
    let cell = document.querySelectorAll('.cell')[cellIndex];
    
    cell.style.backgroundColor = "blue"
    cell.nextSibling.style.backgroundColor = "blue"
});
obstacles3.addEventListener("click", function() {
    let cellIndex = Math.floor(Math.random() * size * size);
    let cell = document.querySelectorAll('.cell')[cellIndex];
    
    cell.style.backgroundColor = "blue"
    cell.nextSibling.style.backgroundColor = "blue"
    cell.nextSibling.nextSibling.style.backgroundColor = "blue"
});
obstacles4.addEventListener("click", function() {
    let cellIndex = Math.floor(Math.random() * size * size);
    let cell = document.querySelectorAll('.cell')[cellIndex];
    
    cell.style.backgroundColor = "blue"
    cell.nextSibling.style.backgroundColor = "blue"
    cell.nextSibling.nextSibling.style.backgroundColor = "blue"
    cell.nextSibling.nextSibling.nextSibling.style.backgroundColor = "blue"
});
console.log(gameBoard.children.length)
