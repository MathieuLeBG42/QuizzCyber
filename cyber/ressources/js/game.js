const question = document.querySelector('#question');
const audio = document.querySelector('#wav');
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
        question: 'Qu\'elle est la méthode préférables pour sauvegarder c\'est données ?',
        choice1: 'Une clef USB',
        choice2: 'La Méthode 3.2.1',
        choice3: 'La Méthode 1.2.3',
        choice4: 'Ne pas le faire',
        answer: 2,
    },
    {
        question: 'Que faire une fois que l\'on a fini de sauvegarder ses données ? ',
        choice1: 'Mettre le support dans un coffre blindé',
        choice2: 'Rien, j\'ai finis',
        choice3: 'Détruire le support rapidement',
        choice4: 'Déconnecter ou rendre hors-ligne le support de sauvegarde',
        answer: 4,
    },
    {
        question: 'Est-ce que le code pin suffit à protéger mon téléphone ?',
        choice1: 'Non',
        choice2: 'Oui',
        choice3: '1234',
        choice4: 'Ne pas répondre',
        answer: 1,
    },
    {
        question: 'Le PlayStore Android est-il sans risques ? ',
        choice1: 'Oui, je ne risque rien',
        choice2: 'Je préfère télécharger illégalement',
        choice3: 'Il comporte des failles de sécurité et n\'est pas fiable à 100%',
        choice4: 'J\'ai un iPhone',
        answer: 3,
    },
    {
        question: 'Pourquoi est-il important de maintenir à jour son système d\'exploitation et ses applications sur un ordinateur ?',
        choice1: 'Pour protéger mon ordinateur et diminuer les possibles failles',
        choice2: 'Pour que les opérateurs de Microsoft ne viennent pas toquer à ma porte',
        choice3: 'Sinon mon ordinateur va s\'auto-détruire',
        choice4: 'Il ne faut jamais faire de mises à jours',
        answer: 1,
    },
    {
        question: 'Comment vérifier et installer les mises à jour logicielles sur un téléphone Android ?',
        choice1: 'Je dois acheter un nouveau téléphone',
        choice2: 'Dans les paramètres, section "À propos" puis "MAJ"',
        choice3: 'Dans le PlayStore',
        choice4: 'Je dois appeler la mascotte d\'Android pour lui demander de mettre à jour',
        answer: 2,
    },
    {
        question: 'Quelle est la longueur conseillée pour un mot de passe sécurisé',
        choice1: 'Un code PIN à 4 chiffres',
        choice2: '8 caractères minimum',
        choice3: '26 caractères minimum',
        choice4: '12 caractères minimum',
        answer: 4,
    },
    {
        question: 'Faut-il éteindre un ordinateur pour le protéger d\'une cyber attaque ?',
        choice1: 'Non, il faut le laisser allumer pour garder des preuves',
        choice2: 'Oui, il faut éteindre l\'ordinateur pour empêcher le virus de se propager',
        choice3: 'Non, j\'installe un anti-virus et je me bats jusqu\'à la fin',
        choice4: 'Oui, puis je cours me cacher le plus vite possible',
        answer: 1,
    },
    {
        question: 'Que devrais-je utiliser pour un mot de passe sécurisé ?',
        choice1: 'Des chiffres seulement',
        choice2: 'Je devrais utiliser des minuscules, des majuscules, des chiffres, des caractères spéciaux',
        choice3: 'Une phrase très longue et impossible à retenir',
        choice4: 'Des chiffres et des lettres',
        answer: 2,
    },
    {
        question: 'La déstabilisation est un procédé de cyber-attaque qui n\'est pas puni par la loi ?',
        choice1: 'Oui, elle est punie par la loi',
        choice2: 'Perdre l\'équilibre n\'est pas puni par la loi',
        choice3: 'Tant que je ne tombe pas par terre, Non',
        choice4: 'Non, je dois me défendre seul face à la menace',
        answer: 1,
    },
    {
        question: 'Comment pouvez-vous identifier un courriel frauduleux ?',
        choice1: 'J\'appelle le service de ma boîte mail pour être sûr',
        choice2: 'Le pirate laisse toujours une signature pour prévenir ses victimes',
        choice3: 'Ce n\'est pas grave, un simple mail ne peut pas me nuire',
        choice4: 'Je vérifie d\'abord l\'adresse puis le contenu du mail',
        answer: 1,
    },
    {
        question: 'Vous recevez un mail de : www.impots.gov.fr. Cliquez-vous sur le lien ?',
        choice1: 'Non, je ne souhaite pas payer mes impots',
        choice2: 'Oui, aucun risque',
        choice3: 'Non, je risque de me faire arnaquer',
        choice4: 'Je mets le mail en favoris',
        answer: 3,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

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