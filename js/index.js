const lugares   = new Array();


// INSERINDO OS POSSIVEIS RESULTADOS DO QUIZ
lugares[0] = {
    'nome': 'Cordilheira dos Andes',
    'resultados': [
        'Neve',
        'Amigos',
        'Sim'
    ]
}

lugares[1] = {
    'nome': 'Rio de Janeiro',
    'resultados': [
        'Praia',
        'Família',
        'Não'
    ]
}

// GUARDANDO O NUMERO DA PERGUNTA ATUAL
var pergunta_atual = 1; 

class Quiz {
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
            'descricao': 'Dos seguintes ambientes quais você mais se identifica?',
            'respostas': [
                'Praia',
                'Neve',
                'Deserto',
            ]
        }
    
        this.perguntas[1] = {
            'descricao': 'Gosta de que tipo de companhia?',
            'respostas': [
                'Nenhuma',
                'Família',
                'Amigos',
            ]
        }
    
        this.perguntas[2] = {
            'descricao': 'No céu tem pão?',
            'respostas': [
                'Sim',
                'Não',
                'Sei lá',
            ]
        }
    }

    preencher_campos = function(posicao){
        this.campo_pergunta.innerHTML = "<h1>" + this.perguntas[posicao].descricao + "</h1>";
        var resps = " ";
        this.perguntas[posicao].respostas.forEach(function(resp){
            resps += "<a onclick='javascript:registrar_resposta(this)' class='resposta'>" + resp + "</a>";
        });
        document.getElementById("pergunta" + (posicao)).classList.remove("active");
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
        pergunta_atual = 0;
    }
}

// REGISTRA OS VALORES ESCOLHIDOS PELO USUARIO
function registrar_resposta(obj){
    quiz.respUsuario.push(event.srcElement.innerText);
    pular_pergunta();

}

// FUNCAO PARA CALCULO DO RESULTADO
function catalogar_resultado(){
    document.getElementById("pergunta").innerHTML = "<div id='loading-screen'><p>Processando resultado</p><img id='loading-screen' src='image/loading.gif'></div>";
    setTimeout(function(){
        var i = 0;
        var contador = 0, maisProximo = 0, id_mais_proximo = 0;
        lugares.forEach(function(lugar){
            lugar.resultados.forEach(function(lugar_result){
                quiz.respUsuario.forEach(function(resp){
                    if (lugar_result == resp) contador++;
                });
            });
            if (contador > maisProximo) {
                maisProximo = contador;
                id_mais_proximo = i;
            }
            contador = 0;
            i++; 
        });
        document.getElementById("pergunta").innerHTML = " <h1> O melhor local para você viajar é " + lugares[id_mais_proximo].nome + " </h1> "
    }, 200);
}

// EXECUCAO INICIAL
window.onload = function(){
    quiz = new Quiz();
    quiz.listar_pergunta_inicial();
}