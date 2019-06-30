const lugares   = new Array();

var pergunta_atual = 0; 

localStorage.setItem("pergunta_atual", pergunta_atual);

class Quiz {
    constructor() {
        this.nome = "";
        this.perguntas = new Array();
        this.atribuir_valores();
    }

    listar_perguntas = function(){
        let cont = 0; 
        var campo_pergunta = document.getElementById("conteudo-perguntas");
        var menu_pergunta = document.getElementById("idperguntas");
        var opcoes_respostas = document.getElementById("idperguntas");
        var idperguntas = " ";
        this.perguntas.forEach(function (e){
            cont++;
            idperguntas += "<a class='idpergunta active'>"  + cont + "</a>";
            e.respostas.forEach(function(resp){
                
            });
        });
        menu_pergunta.innerHTML = idperguntas;
        campo_pergunta.innerHTML = "<h1>" + this.perguntas[0].descricao + "</h1>";
    }

    pular_pergunta = function (){
        localStorage.setItem('pergunta_atual', localStorage.getItem('perginta_atual') + 1);
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
            'descricao': 'Dos seguintes ambientes quais você mais se identifica?',
            'respostas': [
                'Praia?',
                'Neve?',
                'Deserto?',
            ]
        }
    }
}

window.onload = function(){
    quiz = new Quiz();
    quiz.listar_perguntas();
}
