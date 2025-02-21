

function show_message(str, sub) {
    setTimeout(() => {
        document.getElementById('mainmsg').innerHTML = str
        document.getElementById('message').innerHTML = sub
        document.getElementById('prediction').style.display = 'flex'
        document.getElementById('message-box').style.display = 'flex'
        document.getElementById('prediction').style.animation = 'an4 0.6s ease-in-out 0s 1'
        document.getElementById('message-box').style.animation = 'an3 0.6s ease-in-out 0s 1'
    }, 1)

}


function restart_button() {
    document.getElementById('message-box').style.animation = ''
    document.getElementById('prediction').style.animation = ''
    // reset()
    document.getElementById('prediction').style.animation = 'an6 0.6s ease-in-out 0s 1 '
    document.getElementById('message-box').style.animation = 'an5 0.6s ease-in-out 0s 1 '
    setTimeout(() => {
        document.getElementById('prediction').style.display = 'none'
        document.getElementById('message-box').style.display = 'none'
        document.getElementById('prediction').style.animation = ''
        document.getElementById('message-box').style.animation = ''
    }, 600)
}


function mm_button() {
    player = ''
    document.getElementById('home-page').style.display = 'none'
    document.getElementById('predictdata').style.display = 'flex'
    document.getElementById('predictdata').style.animation = 'an7 0.6s ease-in-out 0s 1'
    // reset()
    
    document.getElementById('home-page').style.display = 'flex'
    document.getElementById('predictdata').style.display = 'none'
    document.getElementById('prediction').style.animation = 'an6 0.6s ease-in-out 0s 1 '
    document.getElementById('message-box').style.animation = 'an5 0.6s ease-in-out 0s 1 '
    setTimeout(() => {
        document.getElementById('prediction').style.display = 'none'
        document.getElementById('message-box').style.display = 'none'
        document.getElementById('prediction').style.animation = ''
        document.getElementById('message-box').style.animation = ''
    }, 600)
}