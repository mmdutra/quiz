// GUARDANDO O NUMERO DA PERGUNTA ATUAL
var pergunta_atual = 1; 

class Quiz {

    lugares   = new Array();

    constructor() {
        this.nome = "";
        this.campo_pergunta = document.getElementById("conteudo-perguntas");
        this.menu_pergunta = document.getElementById("idperguntas");
        this.opcoes_respostas = document.getElementById("conteudo-respostas");
        this.perguntas = new Array();
        this.atribuir_valores();
        this.respUsuario = new Array();
    }

    listar_pergunta_inicial = function(){
        let cont = 0; 
        var idperguntas = " ";
        var respostas = " ";
        this.perguntas.forEach(function (e){
            cont++;
            idperguntas += "<a id='pergunta" + cont + "' class='idpergunta'>"  + cont + "</a>";
        });
        console.log(idperguntas);
        this.menu_pergunta.innerHTML = idperguntas;
        this.campo_pergunta.innerHTML = "<h1>" + this.perguntas[0].descricao + "</h1>";
        this.perguntas[0].respostas.forEach(function(resp){
            respostas += "<a onclick='javascript:registrar_resposta(this)' class='resposta'>" + resp + "</a>";
        });
        document.getElementById("pergunta1").classList.add("active");
        this.opcoes_respostas.innerHTML = respostas;
    }



    // INSERINDO AS PERGUNTAS DO QUIZ 
    atribuir_valores = function(){
        this.perguntas[0] = {
            'descricao': 'Qual das palavras abaixo te resume melhor?',
            'respostas': [
                'Tranquilidade',
                'Agitação',
                'Aventura',
            ]
        }
    
        this.perguntas[1] = {
            'descricao': 'Como você prefere viajar?',
            'respostas': [
                'Sozinho',
                'Com amigos',
                'Com a família',
                'Qualquer companhia serve!'
            ]
        }
    
        this.perguntas[2] = {
            'descricao': 'O que você aprecia mais?',
            'respostas': [
                'Belas paisagens naturais',
                'Arquitetura moderna',
                'Templos ou castelos',
            ]
        }

        this.perguntas[3] = {
            'descricao': 'O que você procura em uma viagem?',
            'respostas': [
                'Visitar locais que ficaram marcados na história,visitar museus, descobrir construções e monumentos milenares e aprender mais sobre o passado.',
                'Visitar vilas e feiras locais, experimentar a culinária local, estar em contato com as pessoas, seus costumes e tradições.',
                'Visitar paisagens naturais, participar de trilhas, aprender sobre a biodiversidade local.',
            ]
        }

        // INSERINDO OS POSSIVEIS RESULTADOS DO QUIZ
        this.lugares[0] = {
            'nome': 'Cordilheira dos Andes',
            'resultados': [
                'Aventura',
                'Com a família',
                'Belas paisagens naturais',
                'Visitar paisagens naturais, participar de trilhas, aprender sobre a biodiversidade local.'
            ]
        }

        this.lugares[1] = {
            'nome': 'Porto Seguro',
            'resultados': [
                'Agitação',
                'Com amigos',
                'Belas paisagens naturais',
                'Visitar vilas e feiras locais, experimentar a culinária local, estar em contato com as pessoas, seus costumes e tradições.'
            ]
        }

        this.lugares[2] = {
            'nome': 'Londres',
            'resultados': [
                'Tranquilidade',
                'Sozinho',
                'Templos ou castelos',
                'Visitar locais que ficaram marcados na história,visitar museus, descobrir construções e monumentos milenares e aprender mais sobre o passado.'
            ]
        }
    }

    preencher_campos = function(posicao){
        this.campo_pergunta.innerHTML = "<h1>" + this.perguntas[posicao].descricao + "</h1>";
        var resps = " ";
        this.perguntas[posicao].respostas.forEach(function(resp){
            resps += "<a onclick='javascript:registrar_resposta(this)' class='resposta'>" + resp + "</a>";
        });
        if (posicao != 0) document.getElementById("pergunta" + (posicao)).classList.remove("active");
        document.getElementById("pergunta" + (posicao+1)).classList.add("active");
        this.opcoes_respostas.innerHTML = resps;
    }
    
}

function pular_pergunta(){
    if (quiz.perguntas[pergunta_atual] != null){
        // PREENCHE OS CAMPOS COM A PROXIMA PERGUNTA
        quiz.preencher_campos(pergunta_atual);
        pergunta_atual ++;
    }else {
        // FINAL DO JOGO
        catalogar_resultado();
    }
}

// REGISTRA OS VALORES ESCOLHIDOS PELO USUARIO
function registrar_resposta(obj){
    quiz.respUsuario.push(event.srcElement.innerText);
    pular_pergunta();

}

// FUNCAO PARA CALCULO DO RESULTADO
function catalogar_resultado(){
    quiz.menu_pergunta.style.display = 'none';
    quiz.campo_pergunta.style.display = 'none';
    quiz.opcoes_respostas.style.display = 'none';
    document.getElementById("resultado").innerHTML = "<div id='loading-screen'><p>Processando resultado</p><img id='loading-screen' src='image/loading.gif'></div>";
    setTimeout(function(){
        var i = 0;
        var contador = 0, maisProximo = 0, id_mais_proximo = 0;
        quiz.lugares.forEach(function(lugar){
            lugar.resultados.forEach(function(lugar_result){
                quiz.respUsuario.forEach(function(resp){
                    if (lugar_result == resp) {
                        
                        contador ++;
                    }
                });
            });
            if (contador > maisProximo) {
                maisProximo = contador;
                id_mais_proximo = i;
            }
            contador = 0;
            i++; 
        });
        document.getElementById("resultado").innerHTML = " <h1> O melhor local para você viajar é " + quiz.lugares[id_mais_proximo].nome + " </h1> "
    }, 1000);
    document.getElementById("btn-reset").style.display = 'block';
}


function reset_game(){
    pergunta_atual = 1;
    document.getElementById("resultado").innerHTML = "";
    quiz.menu_pergunta.style.display = 'block';
    quiz.campo_pergunta.style.display = 'block';
    quiz.opcoes_respostas.style.display = 'block';
    document.getElementById("btn-reset").style.display = 'none';
    quiz.listar_pergunta_inicial();
}

// EXECUCAO INICIAL
window.onload = function(){
    quiz = new Quiz();
    quiz.listar_pergunta_inicial();
    document.getElementById("btn-reset").style.display = 'none';
}