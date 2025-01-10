console.log("1st")
let sing_in_btn = document.getElementById('sign-in-btn')
sing_in_btn.addEventListener('click', ()=>{
    document.getElementById('login-page').style.display = 'none'
    document.getElementById('register-page').style.display = 'flex'
})

let sign_up_btn = document.getElementById('sign-up-btn')
sign_up_btn.addEventListener('click', ()=> {
    document.getElementById('register-page').style.display = 'none'
    document.getElementById('login-page').style.display = 'flex'
})

function adddata() {
    document.getElementById('home-page').style.display = 'none'
    document.getElementById('adddata').style.display = 'flex'
}

function back() {
    document.getElementById('adddata').style.display = 'none'
    document.getElementById('home-page').style.display = 'flex'
}

function predictdata() {
    document.getElementById('home-page').style.display = 'none'
    document.getElementById('predictdata').style.display = 'flex'
}

function backP() {
    document.getElementById('predictdata').style.display = 'none'
    document.getElementById('home-page').style.display = 'flex'
}

function setErrorMsg(str, val = 1, col = 'red') {
    if(val === 1) {
        document.getElementById('err').style.color = col
        document.getElementById('err').innerHTML = str
    }
    else {
        document.getElementById(`err${val}`).style.color = col
        document.getElementById(`err${val}`).innerHTML = str
    }
}

let login_btn = document.getElementById('login-btn')

// let url = 'http://127.0.0.1:5000/'
// let url = 'http://192.168.214.36:5000/'

let url = 'https://web11-nine.vercel.app/'
async function login() {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    let req_body = {
        'username': username,
        'password': password
    }
    document.getElementById('login-btn').innerHTML = '<div style="width: 6px; height: 6px;" id="loading"></div>'
    document.getElementById('loading').style.animation = 'an9 0.5s ease-in-out 0s infinite'

    let response = await fetch(url+'login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(req_body)
    })

    let response_obj = await response.json();
    if(response_obj['success'] == true) {
        document.getElementById('loading').style.animation = ''
        document.getElementById('login-btn').innerHTML = 'Log in'
        document.getElementById('login-page').style.display = 'none'
        document.getElementById('home-page').style.display = 'flex'
    }
    else {
        document.getElementById('loading').style.animation = ''
        document.getElementById('login-btn').innerHTML = 'Log in'
        setErrorMsg(response_obj['message'])
    }
}

async function register() {
    let username = document.getElementById('nusername').value
    let password = document.getElementById('npassword').value
    let cassword = document.getElementById('cpassword').value

    document.getElementById('register-btn').innerHTML = '<div style="width: 6px; height: 6px;" id="loading"></div>'
    document.getElementById('loading').style.animation = 'an9 0.5s ease-in-out 0s infinite'

    if(password != cassword) {
        setErrorMsg('Passwords DO NOT match', 2)
        document.getElementById('loading').style.animation = ''
        document.getElementById('register-btn').innerHTML = 'Register'
    }
    else {
        let req_body = {
            'username': username,
            'password': password
        }

        let response = await fetch(url+'signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(req_body)
        })

        let response_obj = await response.json();
        console.log(response_obj)
        if(response_obj['success'] == true) {
            console.log('succ')
            document.getElementById('loading').style.animation = ''
            document.getElementById('register-btn').innerHTML = 'Register'
            
            document.getElementById('register-page').style.display = 'none'
            document.getElementById('login-page').style.display = 'flex'
        }
        else {
            document.getElementById('loading').style.animation = ''
            document.getElementById('register-btn').innerHTML = 'Register'
            setErrorMsg(response_obj['message'], 2)
        }
    }
}