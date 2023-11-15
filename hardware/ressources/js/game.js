const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const btn = document.querySelector('#next');
if(document.querySelector('#mode')){
    let input = document.querySelector('#mode');
    let mode = input.value;
    let next = document.querySelector('.next');
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Comment exprime-t-on la capacité d\'un disque dur ?',
        choice1: 'En Mo',
        choice2: 'En Y',
        choice3: 'En Ko',
        choice4: 'En Go',
        answer: 4,
    },
    {
        question: 'Que désigne le mot anglais "hardware" utilisé en informatique ?',
        choice1: 'L\'utilisation de l\'ordinateur comme outil de formation',
        choice2: 'L\'ensemble des parties matérielles de l\'ordinateur',
        choice3: 'La difficulté de programmer un ordinateur',
        choice4: 'L\'unité centrale de l\'ordinateur',
        answer: 2,
    },
    {
        question: 'Devinette :  Je suis petit et carré. J\'ai des picots dorés. Je permet d\'éxécuter plusieurs processus en même temps. Qui suis-je ?',
        choice1: 'Barette de RAM',
        choice2: 'Processeur',
        choice3: 'Disque Dur',
        choice4: 'Carte Graphique',
        answer: 2,
    },
    {
        question: 'Quel matériel permet le stockage des données en grande capacité ?',
        choice1: 'Le Disque Dur',
        choice2: 'La carte mère',
        choice3: 'La mémoire vive',
        choice4: 'Le processeur',
        answer: 1,
    },
    {
        question: 'Devinette : Je suis un petit composant permettant au BIOS d\'être toujours à l\'heure. Ma valeur de mesure doit toujours être au dessus de 2.80. Qui suis-je ?',
        choice1: 'Barette de Ram',
        choice2: 'Ventirad',
        choice3: 'Pile',
        choice4: 'Condensateur',
        answer: 3,
    },
    {
        question: 'Devinette : Je sers à connecter l\'unité centrale à un écran. Mes embouts sont identiques et sont de couleur bleu. Qui suis-je ?',
        choice1: 'Câble RJ-45',
        choice2: 'Câble VGA',
        choice3: 'Câble HDMI',
        choice4: 'Câble SATA',
        answer: 2,
    },
    {
        question: 'Devinette : Je constitue la mémoire vive de l\'ordinateur. Je permet d\'avoir plusieurs applications actives en même temps. Qui suis-je ?',
        choice1: 'SSD',
        choice2: 'Processeur',
        choice3: 'Carte Graphique',
        choice4: 'Barette de RAM',
        answer: 4,
    },
    {
        question: 'Que signifie UC ?',
        choice1: 'Unité Centrale',
        choice2: 'Universal Card',
        choice3: 'Université Centrale',
        choice4: 'Ultra Connecté',
        answer: 1,
    },
    {
        question: 'Complétez le nom de ce composant : Carte-...',
        choice1: '...Tante',
        choice2: '...Soeur',
        choice3: '...Mère',
        choice4: '...Frère',
        answer: 3,
    },
    {
        question: 'Quel est le périphérique qui permet de selectionner et de pointer les élements affichés sur l\'écran ?',
        choice1: 'Clavier',
        choice2: 'Casque',
        choice3: 'Souris',
        choice4: 'Micro',
        answer: 3,
    },
    {
        question: 'Que signifie le o dans l\'abréviation "Go" ?',
        choice1: 'Octave',
        choice2: 'Oversize',
        choice3: 'Octogone',
        choice4: 'Octet',
        answer: 4,
    },
    {
        question: 'Qu\'est-ce qu\'un octet ?',
        choice1: '1 bit',
        choice2: '8 bits',
        choice3: '16 bits',
        choice4: 'Hobbit',
        answer: 2,
    },
    {
        question: 'Que veut dire PC ?',
        choice1: 'Pain au Chocolat',
        choice2: 'Portable Computer',
        choice3: 'Private Computer',
        choice4: 'Personnal Computer',
        answer: 4,
    },
    {
        question: 'Qu\'est-ce qu\'un MOSFET ?',
        choice1: 'Un transistor',
        choice2: 'Une résistance',
        choice3: 'Un rappeur célèbre',
        choice4: 'Un condensateur',
        answer: 1,
    },{
        question: 'Que signifie PSU ?',
        choice1: 'Powerfull Service United',
        choice2: 'Parti Socialiste Unifié',
        choice3: 'Power Supply Unit',
        choice4: 'Paris Séville Ukraine',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} sur ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true


}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        if(document.querySelector('#mode')){
            document.querySelector('.next').style.display = "block"; 
        }else{
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }
        
    })

    
    
})

    
if(document.querySelector('#mode')){
    if(mode.value === 'anim'){
    btn.addEventListener('click', e => {
        const choice = document.querySelector('.correct') || document.querySelector('.incorrect')

        choice.classList.remove('correct')
        choice.classList.remove('incorrect')
        document.querySelector('.next').style.display = 'none'
        getNewQuestion()
        
    });
}
}
    incrementScore = num => {
    score+=num
    scoreText.innerText = score
}



startGame()