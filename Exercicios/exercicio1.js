//Mostra dobro
function double(n){
    console.log(n*2)
}
//double(10)

//Mostra Soma
function sumOp(a, b){
    console.log("Soma: ",a+b)
}
//sumOp(10, 4)

//Mostra subtração
function minusOp(a, b){
    console.log("Substração: ",a-b)
}
//minusOp(8, 2)

//Mostra multiplicação
function multiply(a,b){
    console.log("Multiplicação: ",a*b)
}
//multiply(8,9)

//Mostra divisão
function divide(a,b){
    console.log("Divisão: ",a/b)
}
//divide(8,2)

//Mostra maior
function bigger(a,b){
    let n = a > b ? a : b
    console.log("maior: ", n)
}
//bigger(8,19)

//Mostra menor
function smaller(a, b){
    let n = a < b ? a : b
    console.log("Menor: ",n)
}
//smaller(8,2)

//Mostra maior entre 3
function biggerThree(a, b, c){
    let bigN;
    if(a > b && a > c){
        bigN = a
    }else if(b > a && b > c){
        bigN = b
    }else if(c > a && c > b){
        bigN = c
    }
    console.log("Maior: ",bigN)
}
//biggerThree(87, 168, 79)

//Mostra menor entre 3
function smallerThree(a, b, c){
    let smallerN;
    if(a < b && a < c){
        smallerN = a
    }else if(b < a && b < c){
        smallerN = b
    }else if(c < a && c < b){
        smallerN = c
    }
    console.log("Menor: ", smallerN)
}
//smallerThree(98, 8167, 677)

//Mostra par ou impar
function pairEven(a){
    let n = a % 2 === 0 ? "Número par" : "Número ímpar"
    console.log(n)
}
//pairEven(11)

//Mostra média
function mediaThree(a, b, c){
    let res = (a + b + c) / 3
    console.log("Média é: ", res)
}
//mediaThree(8, 8, 8)

//Mostra quadrado de n
function toSquare(n){
    console.log("Quadrado: ", n * n)
}
//toSquare(10)

//Mostra raíz quadrada de n
function squadeN(n){

}

//Mostra perímetro de circulo
function periCirc(r){
    let pi = 3.14
    let res = 2 * pi * r
    console.log("Perimetro: ",res)
}
//periCirc(9)

//Mostra Area de Tri
function triangle(base, height){
    let res = (base * height) / 2
    console.log("Area é: ",res)
}
//triangle(18, 56)

//Mostra area do retângulo
function rectangle(base, height){
    let res = base * height
}
//rectangle(20, 10)

//Mostra ao cubo
function toCube(n){
    res = n * n * n
    console.log(res)
}
//toCube(5)

//Mostra volume esfera
function volEsfera(r){
    let rSquare = r * r * r
    let pi = Math.PI
    let res = (4/3 * pi) * rSquare
    console.log(res)
}
//volEsfera(10)

//Mostra celsius para Fahrenheit
function toFahrenheit(c){
    let res = (c * 1.8) + 32
    console.log("Fahrenheit: ", res)
}
//toFahrenheit(32)

//Mostra Km em Milha
function convertKm(k){
    let res = k / 1.6093
    console.log(res)
}
//convertKm(1)

//Produto com 10% desconto
function productDiscount(n){
    const discount = 0.1
    let res
    if(n){
        const calc = n * discount
        res = n - calc
    }

    console.log("Produto descontado: ",res)
}
//productDiscount(99)

//Produto com 15% acrescimo
function increasePrice(n){
    const inflation = 0.15
    let res
    if(n){
        const calc = n * inflation
        res = n + calc
    }

    console.log("Produto inflacionado: ", res)
}
//increasePrice(100)
