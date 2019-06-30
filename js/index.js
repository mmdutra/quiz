const lugares   = new Array();


// lugares[0] = {
//     'nome': 'Cordilheira dos Andes',
//     ''
// }

var pergunta_atual = 1; 

localStorage.setItem("pergunta_atual", pergunta_atual);

class Quiz {
    constructor() {
        this.nome = "";
        this.perguntas = new Array();
        this.atribuir_valores();
    }

    listar_pergunta_inicial = function(){
        let cont = 0; 
        var campo_pergunta = document.getElementById("conteudo-perguntas");
        var menu_pergunta = document.getElementById("idperguntas");
        var opcoes_respostas = document.getElementById("conteudo-respostas");
        var idperguntas = " ";
        var respostas = " ";
        this.perguntas.forEach(function (e){
            cont++;
            idperguntas += "<a id='pergunta" + cont + "' class='idpergunta'>"  + cont + "</a>";
        });
        menu_pergunta.innerHTML = idperguntas;
        campo_pergunta.innerHTML = "<h1>" + this.perguntas[0].descricao + "</h1>";
        this.perguntas[0].respostas.forEach(function(resp){
            respostas += "<a onclick='javascript:pular_pergunta()' class='resposta'>" + resp + "</a>";
        });
        document.getElementById("pergunta1").classList.add("active");
        opcoes_respostas.innerHTML = respostas;
    }

    pular_pergunta = function (){
            // this.preencher_campos(localStorage.getItem('perginta_atual') + 1);

    }

    atribuir_valores = function(){
        this.perguntas[0] = {
            'descricao': 'Dos seguintes ambientes quais você mais se identifica?',
            'respostas': [
                'Praia?',
                'Neve?',
                'Deserto?',
            ]
        }
    
        this.perguntas[1] = {
            'descricao': 'Gosta de que tipo de companhia?',
            'respostas': [
                'Nenhuma?',
                'Família?',
                'Amigos?',
            ]
        }
    
        this.perguntas[2] = {
            'descricao': 'No céu tem pão?',
            'respostas': [
                'Sim?',
                'Não?',
                'Sei lá?',
            ]
        }
    }

    preencher_campos = function(posicao){
        var campo_pergunta = document.getElementById("conteudo-perguntas");
        var respostas = " ";
        campo_pergunta.innerHTML = "<h1>" + this.perguntas[posicao].descricao + "</h1>";
        this.perguntas[posicao].respostas.forEach(function(resp){
            respostas += "<a class='resposta'>" + resp + "</a>";
        });
        document.getElementById("pergunta" + (posicao)).classList.remove("active");
        document.getElementById("pergunta" + (posicao+1)).classList.add("active");
    }
    
}

window.onload = function(){
    quiz = new Quiz();
    quiz.listar_pergunta_inicial();
}


function pular_pergunta(){
    console.log("teste");
    if (quiz.perguntas[parseInt(localStorage.getItem('pergunta_atual'))] != null){
        quiz.preencher_campos(parseInt(localStorage.getItem('pergunta_atual')));
    }else {
        alert('Acabou o jogo!');
    }
    localStorage.setItem('pergunta_atual', parseInt(localStorage.getItem('pergunta_atual')) + 1);
}