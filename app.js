const correctAns = ['B', 'A', 'A', 'A'];

const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result')

form.addEventListener('submit', e =>{
    e.preventDefault();
    
    let score = 0;

    const userAns = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    correctAns.forEach((answer, index) => {
        if (answer === userAns[index]) {
            score+=(100/(correctAns.length));
        }
    })
    scrollTo(0,0);
    result.classList.remove('d-none');

    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = `${output}%`;
        if (output === score){
            clearInterval(timer)
        }
        output++;
    }, 20)

})
