const $ = (selector) => { return document.querySelector(selector) }
const $all  = (selectorAll) => { return document.querySelectorAll(selectorAll) }

/* Manipulaçao do LocalStorage */
const getAlunos = () => { return JSON.parse(window.localStorage.getItem("alunos")) }
const setAlunos = (alunos) => { window.localStorage.setItem("alunos",JSON.stringify(alunos)) }
const pushAluno = (aluno) => {
    let alunos = getAlunos();
    alunos.push(aluno);
    setAlunos(alunos);
}
const spliceAluno = (indice) => {
    let alunos = getAlunos();
    alunos.splice(indice,1)
    setAlunos(alunos)
}

/* Adicionar, remover, e popular tabela */
const preencherAluno = ({nome,matricula,nota1,nota2,nota3}) => {
    let aluno = new Aluno();
    aluno.nome = nome;
    aluno.matricula = matricula;
    aluno.nota1 = nota1;
    aluno.nota2 = nota2;
    aluno.nota3 = nota3;
    return aluno;
}

const gerarTabelaAlunos = () => {
    let alunos = getAlunos();    
    if(alunos == undefined) {
        setAlunos([new Aluno("Caio","29905109",10,8,9)])
        alunos = getAlunos();
    }
    
    if(alunos.length === 0)
        return tb.innerHTML = `<tr><td colspan="7" align="center">Nenhum aluno cadastrado</td></tr>`
    
    let html=""
    for(let i=0;i<alunos.length;i++) {
        let a = preencherAluno(alunos[i])
        html += `<tr>
            <td>${a.nome}</td>
            <td>${a.matricula}</td>
            <td>${a.nota1}</td>
            <td>${a.nota2}</td>
            <td>${a.nota3}</td>
            <td><b>${a.calculaMedia()}</b></td>
            <td class="del" onclick="delAluno(${i});"> X </td>
        </tr>`
    }
    $("#tbody").innerHTML = html;
}
gerarTabelaAlunos();

let btnCadastrar = $("#btn-cadastrar");
btnCadastrar.onclick = () => {
    let nome = $("input#nome").value;
    let mat = $("input#mat").value;
    let vn1 = parseInt($("input#n1").value)
    let vn2 = parseInt($("input#n2").value)
    let vn3 = parseInt($("input#n3").value)

    if(nome === '' || mat === '' || vn1 == NaN 
        || vn2 == NaN || vn3 == NaN)
        return displayErrFormulario();

    // Não adicionar com valores acima de 10, ou abaixo de 0
    let n1 = vn1 <= 10 ? ( vn1 >= 0 ? vn1 : 0 ) : 10
    let n2 = vn2 <= 10 ? ( vn2 >= 0 ? vn2 : 0 ) : 10
    let n3 = vn3 <= 10 ? ( vn3 >= 0 ? vn3 : 0 ) : 10
    
    pushAluno(new Aluno(nome,mat,n1,n2,n3))
    gerarTabelaAlunos();
}

const delAluno = (indice) => {
    spliceAluno(indice)
    gerarTabelaAlunos();
}

const displayErrFormulario = () => {
    let err = $("#err-msg")
    err.innerHTML = "Informe valores válidos!"
    setTimeout(()=> {
        err.innerHTML = ''
    },3000)
}